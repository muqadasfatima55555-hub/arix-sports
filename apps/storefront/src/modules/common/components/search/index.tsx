"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const query = search.trim()

    if (!query) return

    router.push(`/search?q=${encodeURIComponent(query)}`)
    setIsOpen(false)
  }

  return (
    <div className="relative">

      {/* Search Button */}

      <button
        type="button"
        aria-label="Search"
        onClick={() => setIsOpen((prev) => !prev)}
        className="transition-all duration-300 hover:scale-110 hover:text-blue-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <circle
            cx="11"
            cy="11"
            r="7"
          />

          <path d="M20 20L17 17" />
        </svg>
      </button>

      {/* Search Box */}

      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-full
            z-[200]
            mt-5
            w-[320px]
            rounded-xl
            border
            border-white/10
            bg-[#101827]
            p-4
            shadow-2xl
          "
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2"
          >

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="
                min-w-0
                flex-1
                rounded-lg
                border
                border-white/10
                bg-white/10
                px-4
                py-3
                text-sm
                text-white
                outline-none
                placeholder:text-gray-400
                focus:border-blue-400
              "
            />

            <button
              type="submit"
              className="
                rounded-lg
                bg-[#1683ff]
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-blue-500
              "
            >
              Search
            </button>

          </form>
        </div>
      )}

    </div>
  )
}