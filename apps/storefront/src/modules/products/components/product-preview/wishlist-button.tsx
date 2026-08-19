"use client"

import { useEffect, useState } from "react"

type WishlistProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string | null
}

export default function WishlistButton({
  product,
}: {
  product: WishlistProduct
}) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("arix-wishlist")

    if (!saved) return

    try {
      const wishlist = JSON.parse(saved)

      const exists = wishlist.some(
        (item: WishlistProduct) => item.id === product.id
      )

      setIsWishlisted(exists)
    } catch {
      setIsWishlisted(false)
    }
  }, [product.id])

  const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const saved = localStorage.getItem("arix-wishlist")

    let wishlist: WishlistProduct[] = []

    if (saved) {
      try {
        wishlist = JSON.parse(saved)
      } catch {
        wishlist = []
      }
    }

    const exists = wishlist.some(
      (item) => item.id === product.id
    )

    let updatedWishlist: WishlistProduct[]

    if (exists) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      )

      setIsWishlisted(false)
    } else {
      updatedWishlist = [
        ...wishlist,
        {
          id: product.id,
          title: product.title,
          handle: product.handle,
          thumbnail: product.thumbnail,
        },
      ]

      setIsWishlisted(true)
    }

    localStorage.setItem(
      "arix-wishlist",
      JSON.stringify(updatedWishlist)
    )

    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 ${
        isWishlisted
          ? "text-red-500"
          : "text-black hover:bg-red-500 hover:text-white"
      }`}
      aria-label={
        isWishlisted
          ? `Remove ${product.title} from wishlist`
          : `Add ${product.title} to wishlist`
      }
    >
      {isWishlisted ? "♥" : "♡"}
    </button>
  )
}