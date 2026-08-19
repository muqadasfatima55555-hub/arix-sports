import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRegion } from "@lib/data/regions"
import { getCollectionByHandle } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"

import NewArrivalsHeader from "@modules/collections/new-arrivals-header"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CollectionPageProps = {
  params: Promise<{
    countryCode: string
    handle: string
  }>
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params

  if (handle === "new-arrivals") {
    return {
      title: "New Arrivals | Arix Sports",
      description:
        "Discover the latest sportswear, accessories and performance styles from Arix Sports.",
    }
  }

  return {
    title: "Collection | Arix Sports",
    description: "Explore Arix Sports collections.",
  }
}

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { countryCode, handle } = await params

  // ==========================================
  // GET REGION
  // ==========================================

  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  // ==========================================
  // ONLY NEW ARRIVALS PAGE
  // ==========================================

  if (handle !== "new-arrivals") {
    notFound()
  }

  // ==========================================
  // GET NEW ARRIVALS COLLECTION
  // ==========================================

  const collection = await getCollectionByHandle("new-arrivals")

  if (!collection) {
    notFound()
  }

  // ==========================================
  // GET NEW ARRIVALS PRODUCTS ONLY
  // ==========================================

  const { response } = await listProducts({
    queryParams: {
      collection_id: [collection.id],
      limit: 9,
      offset: 0,
      is_giftcard: false,
    },
    countryCode,
  })

  const products = response?.products || []

  return (
    <main className="w-full bg-white">

      {/* ==========================================
          NEW ARRIVALS HEADER
      ========================================== */}

      <NewArrivalsHeader />

      {/* ==========================================
          NEW ARRIVALS BANNER
      ========================================== */}

      <section
        className="relative flex min-h-[500px] items-center overflow-hidden bg-[#050b14] bg-cover bg-center"
        style={{
          backgroundImage: "url('/new-arrivals-banner.jpg')",
        }}
      >

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-[#050b14]/55" />

        {/* Banner Content */}

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-8 py-24">

          <div className="max-w-[600px]">

            <p className="mb-4 text-sm font-medium uppercase tracking-[6px] text-[#4da3ff]">
              ARIX SPORTS
            </p>

            <h1 className="text-4xl font-bold uppercase tracking-[3px] text-white md:text-5xl lg:text-7xl">
              NEW ARRIVALS
            </h1>

            <p className="mt-7 max-w-[600px] text-lg leading-8 text-gray-200">
              Discover the latest performance styles engineered
              for movement, comfort and everyday performance.
            </p>

            <LocalizedClientLink
              href="/store"
              className="mt-9 inline-flex border border-white px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-white hover:text-[#050b14]"
            >
              Shop New Arrivals
            </LocalizedClientLink>

          </div>

        </div>

      </section>

      {/* ==========================================
          NEW ARRIVALS PRODUCTS
      ========================================== */}

      <section className="bg-white px-4 py-14 md:px-8 lg:px-12">

        <div className="mx-auto max-w-[1050px]">

          {/* Heading */}

          <div className="mb-8 text-center">

            <p className="mb-2 text-xs font-medium uppercase tracking-[6px] text-[#4da3ff]">
              LATEST DROP
            </p>

            <h2 className="text-3xl font-bold uppercase tracking-[2px] text-[#07101f] md:text-4xl">
              NEW ARRIVALS
            </h2>

            <div className="mx-auto mt-4 h-[2px] w-10 bg-[#1683ff]" />

          </div>

          {/* ==========================================
              PRODUCTS
          ========================================== */}

          {products.length > 0 ? (

            <div className="grid grid-cols-3 gap-x-3 gap-y-6">

              {products.map((product) => (

                <div
                  key={product.id}
                  className="group w-full overflow-hidden rounded-lg bg-[#f5f5f5]"
                >

                  <ProductPreview
                    product={product}
                    region={region}
                  />

                </div>

              ))}

            </div>

          ) : (

            <div className="py-16 text-center">

              <p className="text-sm text-gray-500">
                No new arrivals available.
              </p>

            </div>

          )}

          {/* ==========================================
              VIEW ALL
          ========================================== */}

          {products.length > 0 && (

            <div className="mt-10 flex justify-center">

              <LocalizedClientLink
                href="/collections/new-arrivals"
                className="border border-[#07101f] px-8 py-3 text-xs font-semibold uppercase tracking-[2px] text-[#07101f] transition-all duration-300 hover:bg-[#07101f] hover:text-white"
              >
                View All New Arrivals
              </LocalizedClientLink>

            </div>

          )}

        </div>

      </section>

    </main>
  )
}