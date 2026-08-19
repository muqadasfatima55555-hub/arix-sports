import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import WishlistButton from "./wishlist-button"
export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div
        data-testid="product-wrapper"
        className="transition-all duration-300 group-hover:-translate-y-2"
      >
        {/* Product Image */}

        <div className="relative overflow-hidden rounded-xl bg-[#F7F7F7]">

          {/* NEW Badge */}

          <span className="absolute left-4 top-4 z-20 rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-[2px] text-white">
            NEW
          </span>

          {/* Wishlist */}

        <WishlistButton
  product={{
    id: product.id,
    title: product.title,
    handle: product.handle,
    thumbnail: product.thumbnail,
  }}
/>
          {/* Product Image */}

          <div className="aspect-square overflow-hidden">

            <div className="h-full w-full transition-transform duration-500 group-hover:scale-110">

              <Thumbnail
                thumbnail={product.thumbnail}
                images={product.images}
                size="full"
                isFeatured={isFeatured}
              />

            </div>

          </div>

          {/* Add to Cart */}

          <div className="absolute bottom-4 left-1/2 w-[86%] -translate-x-1/2 translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

            <button className="w-full rounded-lg bg-[#08111F] py-3 text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-[#13233d]">
              Add To Cart
            </button>

          </div>

        </div>

        {/* Product Details */}

        <div className="mt-5">

          {/* Rating */}

          <div className="mb-2 flex items-center gap-2">

            <div className="flex text-[#F5B301] text-sm">
              ★★★★★
            </div>

            <span className="text-xs text-gray-500">
              (128)
            </span>

          </div>

          {/* Product Name */}

          <Text
            className="line-clamp-2 text-[16px] font-semibold uppercase tracking-wide text-black"
            data-testid="product-title"
          >
            {product.title}
          </Text>

          {/* Category */}

          <p className="mt-1 text-[11px] uppercase tracking-[3px] text-gray-500">
            Performance Wear
          </p>

          {/* Color Options */}

          <div className="mt-3 flex items-center gap-2">

            <span className="h-3 w-3 rounded-full border border-gray-300 bg-black"></span>

            <span className="h-3 w-3 rounded-full border border-gray-300 bg-gray-400"></span>

            <span className="h-3 w-3 rounded-full border border-gray-300 bg-[#0B1220]"></span>

          </div>

          {/* Price */}

          <div className="mt-4 flex items-center justify-between">

            <div>
              {cheapestPrice && (
                <PreviewPrice price={cheapestPrice} />
              )}
            </div>

            <span className="text-xs font-medium text-green-600">
              In Stock
            </span>

          </div>

        </div>

      </div>
    </LocalizedClientLink>
  )
}