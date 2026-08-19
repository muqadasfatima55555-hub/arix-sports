import { HttpTypes } from "@medusajs/types"

import BestSellersSlider from "./best-sellers-slider"

export default function BestSellers({
  products,
  region,
}: {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}) {
  if (!products?.length) return null

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16">

      <div className="mx-auto max-w-[1400px]">

        {/* =========================
            HEADING
        ========================= */}

        <div className="mb-12 flex items-end justify-between">

          <div>

            <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-500">
              Premium Collection
            </p>

            <h2 className="mt-2 text-5xl font-extrabold uppercase tracking-tight text-[#111]">
              Best Sellers
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Discover our most-loved performance essentials,
              crafted for athletes who demand comfort,
              durability and premium quality.
            </p>

          </div>

        </div>


        {/* =========================
            PRODUCT SLIDER
        ========================= */}

        <BestSellersSlider
          products={products}
          region={region}
        />

      </div>

    </section>
  )
}