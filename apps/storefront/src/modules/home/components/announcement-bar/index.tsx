"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"

const AnnouncementBar = () => {
  const pathname = usePathname()

  // Home page check
  const isHomePage =
    pathname === "/" ||
    pathname?.match(/^\/[a-z]{2}$/)

  return (
    <div className="w-full bg-[#07101f] text-white">

      <div className="relative mx-auto flex h-[42px] items-center justify-between px-6">

        {/* =========================
            LEFT — BACK TO HOME
        ========================= */}

        <div className="flex min-w-[220px] items-center">

          {!isHomePage && (
            <LocalizedClientLink
              href="/"
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-[1.5px] text-white/75 transition-colors duration-300 hover:text-white"
            >
              <span className="text-base leading-none">
                ←
              </span>

              Back to Home
            </LocalizedClientLink>
          )}

        </div>


        {/* =========================
            CENTER — ARIX
        ========================= */}

        <LocalizedClientLink
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <span className="text-sm font-semibold uppercase tracking-[10px] text-white">
            ARIX
          </span>
        </LocalizedClientLink>


        {/* =========================
            RIGHT
        ========================= */}

        <div className="ml-auto hidden items-center gap-5 text-xs font-medium text-white/75 md:flex">

          <LocalizedClientLink
            href="/download-app"
            className="transition-colors duration-300 hover:text-[#4da3ff]"
          >
            Download App
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/track-order"
            className="transition-colors duration-300 hover:text-[#4da3ff]"
          >
            Track Order
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/help"
            className="transition-colors duration-300 hover:text-[#4da3ff]"
          >
            Help
          </LocalizedClientLink>

        </div>

      </div>

    </div>
  )
}

export default AnnouncementBar