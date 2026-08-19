import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import InteractiveLink from "@modules/common/components/interactive-link"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
      limit: 4,
    },
  })

  if (!products?.length) {
    return null
  }

  return (
    <section className="content-container py-20">

      <div className="flex items-end justify-between mb-12">

        <div>

          <span className="uppercase tracking-[5px] text-[11px] text-gray-500">
            Premium Collection
          </span>

          <h2 className="text-4xl font-bold mt-2 tracking-tight">
            {collection.title}
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl">
            Designed for athletes who demand comfort,
            durability and premium performance.
          </p>

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

    border
    border-white/10

    px-8

    text-[13px]
    font-semibold
    uppercase
    tracking-[3px]

    text-[#E5E7EB]

    shadow-[0_4px_12px_rgba(0,0,0,.45),inset_0_1px_1px_rgba(255,255,255,.12)]

    transition-all
    duration-300

    hover:scale-[1.03]
    hover:text-white
    hover:border-white/20
    hover:shadow-[0_8px_18px_rgba(0,0,0,.55),inset_0_1px_2px_rgba(255,255,255,.18)]
  "
>
  View All
</InteractiveLink>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">

        {products.map((product) => (
          <ProductPreview
            key={product.id}
            product={product}
            region={region}
            isFeatured
          />
        ))}

      </div>

      <div className="md:hidden flex justify-center mt-10">

        <InteractiveLink
          href={`/collections/${collection.handle}`}
          className="uppercase tracking-[3px] text-xs font-semibold"
        >
          View All →
        </InteractiveLink>

      </div>

    </section>
  )
}