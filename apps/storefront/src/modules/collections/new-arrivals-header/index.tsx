"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const NewArrivalsHeader = () => {
  return (
    <header className="flex h-[40px] w-full items-center justify-center bg-white">
      <LocalizedClientLink
        href="/"
        className="flex items-center justify-center"
      >
        <p className="text-medium font-semibold uppercase tracking-[10px] text-[#07101f]">
          ----- ARIX -----
        </p>
      </LocalizedClientLink>
    </header>
  )
}

export default NewArrivalsHeader