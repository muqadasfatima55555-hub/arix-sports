import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const currentCategory =
    product.categories?.[0]

  if (!currentCategory?.id) {
    return null
  }

  const { response } = await listProducts({
    countryCode,

    queryParams: {
      region_id: region.id,
      category_id: [currentCategory.id],
      is_giftcard: false,
      limit: 8,
    },
  })

  const relatedProducts =
    response.products.filter(
      (item) => item.id !== product.id
    )

  if (!relatedProducts.length) {
    return null
  }

  return (
    <section className="w-full">
   {/* ==========================================
    HEADING
========================================== */}

<div className="mb-12 text-center">

  <p className="mb-3 text-sm font-bold uppercase tracking-[4px] text-[#1683ff]">
    You May Also Like
  </p>

  <h2 className="text-4xl font-extrabold uppercase tracking-[2px] text-[#07101f] md:text-5xl">
    Related Products
  </h2>

  <div className="mx-auto mt-5 h-[3px] w-14 bg-[#1683ff]" />

  <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
    More products from the same collection.
  </p>

</div>

      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {relatedProducts
          .slice(0, 4)
          .map((relatedProduct) => (
            <li
              key={relatedProduct.id}
              className="min-w-0"
            >
              <Product
                region={region}
                product={relatedProduct}
              />
            </li>
          ))}
      </ul>
    </section>
  )
}