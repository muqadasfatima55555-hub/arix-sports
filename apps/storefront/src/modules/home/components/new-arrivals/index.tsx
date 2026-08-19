import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import InteractiveLink from "@modules/common/components/interactive-link"

export default function NewArrivals({
  products,
  region,
}: {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}) {
  if (!products?.length) return null

  return (
    <section className="content-container py-24">

      {/* Header */}
      <div className="flex items-center justify-between mb-12">

        <div>
          <span className="uppercase tracking-[4px] text-xs text-gray-500 font-medium">
            Latest Collection
          </span>

          <h2 className="mt-2 text-5xl font-extrabold tracking-tight uppercase text-[#111]">
            New Arrivals
          </h2>
        </div>

<InteractiveLink
  href="/collections/new-arrivals"
  className="
    hidden md:inline-flex
    items-center
    justify-center
    min-w-[190px]
    h-14
    rounded-full

    bg-gradient-to-b
    from-[#1B2537]
    via-[#101827]
    to-[#060C15]

    border border-white/10

    px-8

    !text-white
    hover:!text-white
    visited:!text-white
    active:!text-white

    text-[13px]
    font-semibold
    uppercase
    tracking-[3px]

    shadow-[0_4px_12px_rgba(0,0,0,.45),inset_0_1px_1px_rgba(255,255,255,.12)]

    transition-all
    duration-300
    hover:scale-[1.03]
  "
>
  View All
</InteractiveLink>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">

        {products.map((product) => (
          <ProductPreview
            key={product.id}
            product={product}
            region={region}
            isFeatured
          />
        ))}

      </div>

      {/* Mobile Button */}
      <div className="mt-12 flex justify-center md:hidden">

 <InteractiveLink
  href="/collections/new-arrivals"
  className="
    hidden md:inline-flex
    items-center
    justify-center
    min-w-[190px]
    h-14
    rounded-full

    bg-gradient-to-b
    from-[#1B2537]
    via-[#101827]
    to-[#060C15]

    border border-white/10

    px-8

    !text-white
    hover:!text-white
    visited:!text-white
    active:!text-white

    text-[13px]
    font-semibold
    uppercase
    tracking-[3px]

    shadow-[0_4px_12px_rgba(0,0,0,.45),inset_0_1px_1px_rgba(255,255,255,.12)]

    transition-all
    duration-300
    hover:scale-[1.03]
  "
>
  View All
</InteractiveLink>
      </div>

    </section>
  )
}