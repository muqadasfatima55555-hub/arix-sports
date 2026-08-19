"use client"

import { useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type WishlistItem = {
  id: string
  title: string
  handle: string
  thumbnail?: string | null
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("arix-wishlist")

    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch {
        setWishlist([])
      }
    }
  }, [])

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id)

    setWishlist(updated)

    localStorage.setItem(
      "arix-wishlist",
      JSON.stringify(updated)
    )
  }

  return (
    <main className="min-h-screen bg-white">

      <section className="content-container py-16">

        {/* Heading */}

        <div className="mb-12 text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[5px] text-[#1683ff]">
            ARIX SPORTS
          </p>

          <h1 className="text-4xl font-bold uppercase tracking-[3px] text-[#07101f] md:text-5xl">
            My Wishlist
          </h1>

          <div className="mx-auto mt-5 h-[3px] w-12 bg-[#1683ff]" />

        </div>

        {/* Empty Wishlist */}

        {wishlist.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

            <div className="mb-5 text-6xl">
              ♡
            </div>

            <h2 className="text-xl font-semibold uppercase tracking-[2px] text-[#07101f]">
              Your Wishlist Is Empty
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Save your favorite products here.
            </p>

            <LocalizedClientLink
              href="/"
              className="mt-6 rounded-lg bg-[#08111F] px-7 py-3 text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-[#13233d]"
            >
              Continue Shopping
            </LocalizedClientLink>

          </div>
        ) : (

          /* Wishlist Products */

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {wishlist.map((item) => (

              <div
                key={item.id}
                className="group"
              >

                <LocalizedClientLink
                  href={`/products/${item.handle}`}
                  className="block"
                >

                  <div className="relative overflow-hidden rounded-xl bg-[#F7F7F7]">

                    {item.thumbnail ? (
                      <div className="aspect-square overflow-hidden">

                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                      </div>
                    ) : (
                      <div className="flex aspect-square items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                  </div>

                </LocalizedClientLink>

                <div className="mt-4 flex items-start justify-between gap-3">

                  <LocalizedClientLink
                    href={`/products/${item.handle}`}
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-black">
                      {item.title}
                    </h3>
                  </LocalizedClientLink>

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="shrink-0 text-xl text-red-500 transition hover:scale-110"
                    aria-label={`Remove ${item.title} from wishlist`}
                  >
                    ♥
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </main>
  )
}