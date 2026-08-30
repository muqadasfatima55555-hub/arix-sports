import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

const DEFAULT_REGION =
  process.env.NEXT_PUBLIC_DEFAULT_REGION || "dk"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: 0,
}

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache

  // Don't crash if environment variables are missing
  if (!BACKEND_URL || !PUBLISHABLE_API_KEY) {
    console.error(
      "Middleware: Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL or NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY"
    )

    return regionMap
  }

  // Use cached regions for 1 hour
  if (
    regionMap.size > 0 &&
    regionMapUpdated > Date.now() - 3600 * 1000
  ) {
    return regionMap
  }

  try {
    const response = await fetch(
      `${BACKEND_URL.replace(/\/$/, "")}/store/regions`,
      {
        method: "GET",
        headers: {
          "x-publishable-api-key": PUBLISHABLE_API_KEY,
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      console.error(
        `Middleware: Medusa returned ${response.status}`
      )

      return regionMap
    }

    const json = await response.json()
    const regions = json?.regions

    if (!Array.isArray(regions) || regions.length === 0) {
      console.error("Middleware: No regions found")
      return regionMap
    }

    regionMap.clear()

    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((country) => {
        if (country.iso_2) {
          regionMap.set(
            country.iso_2.toLowerCase(),
            region
          )
        }
      })
    })

    regionMapCache.regionMapUpdated = Date.now()

    return regionMap
  } catch (error) {
    console.error(
      "Middleware: Failed to fetch regions:",
      error
    )

    return regionMap
  }
}

function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion>
) {
  const urlCountryCode = request.nextUrl.pathname
    .split("/")[1]
    ?.toLowerCase()

  const vercelCountryCode = request.headers
    .get("x-vercel-ip-country")
    ?.toLowerCase()

  // Country code already in URL
  if (
    urlCountryCode &&
    regionMap.has(urlCountryCode)
  ) {
    return urlCountryCode
  }

  // Vercel detected country
  if (
    vercelCountryCode &&
    regionMap.has(vercelCountryCode)
  ) {
    return vercelCountryCode
  }

  // Default region
  if (
    regionMap.has(DEFAULT_REGION.toLowerCase())
  ) {
    return DEFAULT_REGION.toLowerCase()
  }

  // First available region
  const firstRegion = regionMap.keys().next().value

  if (firstRegion) {
    return firstRegion
  }

  // Final fallback
  return DEFAULT_REGION.toLowerCase()
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip static files and API routes
  if (
    pathname.includes(".") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next()
  }

  try {
    const regionMap = await getRegionMap()

    const countryCode = getCountryCode(
      request,
      regionMap
    )

    const country =
      countryCode || DEFAULT_REGION

    const firstPathSegment = pathname
      .split("/")[1]
      ?.toLowerCase()

    // URL already has country code
    if (
      firstPathSegment === country.toLowerCase()
    ) {
      return NextResponse.next()
    }

    // Add country code to URL
    const redirectPath =
      pathname === "/" ? "" : pathname

    const redirectUrl = new URL(
      `/${country}${redirectPath}`,
      request.url
    )

    redirectUrl.search = request.nextUrl.search

    return NextResponse.redirect(
      redirectUrl,
      307
    )
  } catch (error) {
    console.error(
      "Middleware unexpected error:",
      error
    )

    // Final fallback
    const cleanPath = pathname.replace(
      /^\/+/,
      ""
    )

    const fallbackPath =
      pathname === "/"
        ? `/${DEFAULT_REGION}`
        : `/${DEFAULT_REGION}/${cleanPath}`

    return NextResponse.redirect(
      new URL(fallbackPath, request.url),
      307
    )
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}