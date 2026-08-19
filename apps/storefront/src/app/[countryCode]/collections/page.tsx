import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRegion } from "@lib/data/regions"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"

import Navbar from "@modules/home/components/navbar"
import ProductPreview from "@modules/products/components/product-preview"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Premium Collections | Arix Sports",
  description:
    "Explore premium men's, women's, accessories and sports gear collections at Arix Sports.",
}

type CollectionsPageProps = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function CollectionsPage({
  params,
}: CollectionsPageProps) {
  const { countryCode } = await params

  // ==========================================
  // GET REGION
  // ==========================================

  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  // ==========================================
  // GET CATEGORIES
  // ==========================================

  const product_categories = await listCategories()

  // ==========================================
  // GET COLLECTIONS
  // ==========================================

  const { collections } = await listCollections({
    fields: "id,handle,title",
  })

  // ==========================================
  // FIND BEST SELLERS
  // ==========================================

  const bestSellersCollection = collections?.find(
    (collection) => collection.handle === "best-sellers"
  )

  // ==========================================
  // FIND NEW ARRIVALS
  // ==========================================

  const newArrivalsCollection = collections?.find(
    (collection) => collection.handle === "new-arrivals"
  )

  // ==========================================
  // GET BEST SELLER PRODUCTS
  // ==========================================

  const { response: bestSellersResponse } = await listProducts({
    countryCode,
    queryParams: {
      limit: 6,
      offset: 0,
      is_giftcard: false,

      ...(bestSellersCollection?.id
        ? {
            collection_id: [bestSellersCollection.id],
          }
        : {}),
    },
  })

  // ==========================================
  // GET NEW ARRIVAL PRODUCTS
  // ==========================================

  const { response: newArrivalsResponse } = await listProducts({
    countryCode,
    queryParams: {
      limit: 6,
      offset: 0,
      is_giftcard: false,

      ...(newArrivalsCollection?.id
        ? {
            collection_id: [newArrivalsCollection.id],
          }
        : {}),
    },
  })

  const bestSellers = bestSellersResponse?.products || []
  const newArrivals = newArrivalsResponse?.products || []

  // ==========================================
  // CATEGORY CARDS
  // ==========================================

  const categories = [
    {
      title: "Men",
      subtitle: "Performance & Style",
      image: "/category-men.jpg",
      href: "/categories/men",
    },
    {
      title: "Women",
      subtitle: "Designed to Perform",
      image: "/category-women.jpg",
      href: "/categories/women",
    },
    {
      title: "Accessories",
      subtitle: "Complete Your Game",
      image: "/category-accessories.jpg",
      href: "/categories/accessories",
    },
    {
      title: "Sports Gear",
      subtitle: "Built for Performance",
      image: "/category-sports-gear.jpg",
      href: "/categories/sports-gear",
    },
  ]

  return (
    <main className="w-full bg-white">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <Navbar
        product_categories={product_categories || []}
      />

      {/* ==========================================
          PREMIUM COLLECTIONS
      ========================================== */}

      <section className="bg-white px-5 py-14 md:px-8 md:py-16 lg:px-12">

        <div className="mx-auto max-w-[1100px]">

          {/* Heading */}

          <div className="mb-9 text-center">

            <p className="mb-2 text-xs font-semibold uppercase tracking-[6px] text-[#1683ff]">
              ARIX SPORTS
            </p>

            <h1 className="text-3xl font-bold uppercase tracking-[2px] text-[#07101f] md:text-4xl">
              Premium Collections
            </h1>

            <p className="mx-auto mt-3 max-w-[600px] text-sm leading-6 text-gray-500">
              Discover our premium collections designed for performance,
              comfort and everyday style.
            </p>

            <div className="mx-auto mt-4 h-[2px] w-10 bg-[#1683ff]" />

          </div>

          {/* ==========================================
              CATEGORY CARDS
          ========================================== */}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-5">

            {categories.map((category) => (
              <LocalizedClientLink
                key={category.title}
                href={category.href}
                className="group relative h-[280px] overflow-hidden rounded-xl bg-[#07101f] md:h-[320px]"
              >

                {/* Image */}

                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-black/40 transition-all duration-500 group-hover:bg-black/55" />

                {/* Content */}

                <div className="absolute inset-x-0 bottom-0 p-6">

                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[4px] text-[#4da3ff]">
                    Premium Collection
                  </p>

                  <h2 className="text-2xl font-bold uppercase tracking-[2px] text-white md:text-3xl">
                    {category.title}
                  </h2>

                  <p className="mt-1 text-xs text-gray-200 md:text-sm">
                    {category.subtitle}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[2px] text-white">
                    Explore Collection
                    <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                </div>

              </LocalizedClientLink>
            ))}

          </div>

        </div>

      </section>

      {/* ==========================================
          BEST SELLERS
      ========================================== */}

      <section className="bg-[#f7f8fa] px-5 py-14 md:px-8 md:py-16 lg:px-12">

        <div className="mx-auto max-w-[1050px]">

          {/* Heading */}

          <div className="mb-8 text-center">

            <p className="mb-2 text-xs font-semibold uppercase tracking-[6px] text-[#1683ff]">
              MOST LOVED
            </p>

            <h2 className="text-3xl font-bold uppercase tracking-[2px] text-[#07101f] md:text-4xl">
              Best Sellers
            </h2>

            <div className="mx-auto mt-4 h-[2px] w-10 bg-[#1683ff]" />

          </div>

          {/* Products */}

          {bestSellers.length > 0 ? (
            <div className="grid grid-cols-3 gap-x-3 gap-y-6">

              {bestSellers.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-lg bg-white"
                >
                  <ProductPreview
                    product={product}
                    region={region}
                  />
                </div>
              ))}

            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-gray-500">
                No best sellers available.
              </p>
            </div>
          )}

          {/* View All */}

          {bestSellers.length > 0 && (
            <div className="mt-8 flex justify-center">
              <LocalizedClientLink
                href="/collections/best-sellers"
                className="border border-[#07101f] px-7 py-3 text-xs font-semibold uppercase tracking-[2px] text-[#07101f] transition-all duration-300 hover:bg-[#07101f] hover:text-white"
              >
                View All Best Sellers
              </LocalizedClientLink>
            </div>
          )}

        </div>

      </section>

      {/* ==========================================
          NEW ARRIVALS
      ========================================== */}

      <section className="bg-white px-5 py-14 md:px-8 md:py-16 lg:px-12">

        <div className="mx-auto max-w-[1050px]">

          {/* Heading */}

          <div className="mb-8 text-center">

            <p className="mb-2 text-xs font-semibold uppercase tracking-[6px] text-[#1683ff]">
              LATEST DROP
            </p>

            <h2 className="text-3xl font-bold uppercase tracking-[2px] text-[#07101f] md:text-4xl">
              New Arrivals
            </h2>

            <div className="mx-auto mt-4 h-[2px] w-10 bg-[#1683ff]" />

          </div>

          {/* Products */}

          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-3 gap-x-3 gap-y-6">

              {newArrivals.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-lg bg-[#f5f5f5]"
                >
                  <ProductPreview
                    product={product}
                    region={region}
                  />
                </div>
              ))}

            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-gray-500">
                No new arrivals available.
              </p>
            </div>
          )}

          {/* View All */}

          {newArrivals.length > 0 && (
            <div className="mt-8 flex justify-center">
              <LocalizedClientLink
                href="/collections/new-arrivals"
                className="border border-[#07101f] px-7 py-3 text-xs font-semibold uppercase tracking-[2px] text-[#07101f] transition-all duration-300 hover:bg-[#07101f] hover:text-white"
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