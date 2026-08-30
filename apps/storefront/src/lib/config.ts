import { getLocaleHeader } from "@lib/util/get-locale-header"
import Medusa from "@medusajs/js-sdk"

let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

const originalFetch = sdk.client.fetch.bind(sdk.client)

sdk.client.fetch = async <T>(
  input: any,
  init?: any
): Promise<T> => {
  const headers = new Headers(init?.headers)

  try {
    const localeHeader = await getLocaleHeader()

    if (localeHeader["x-medusa-locale"]) {
      headers.set(
        "x-medusa-locale",
        localeHeader["x-medusa-locale"]
      )
    }
  } catch {}

  return originalFetch(input, {
    ...init,
    headers,
  })
}