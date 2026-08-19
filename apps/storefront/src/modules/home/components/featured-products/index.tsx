import { HttpTypes } from "@medusajs/types"
import ProductRail from "./product-rail"

export default function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  if (!collections?.length) return null

  return (
    <>
      {collections.map((collection) => (
        <ProductRail
          key={collection.id}
          collection={collection}
          region={region}
        />
      ))}
    </>
  )
}