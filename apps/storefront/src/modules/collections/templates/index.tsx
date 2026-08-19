import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

type CollectionTemplateProps = {
  countryCode: string
  region: HttpTypes.StoreRegion
}

export default async function CollectionsTemplate({
  countryCode,
  region,
}: CollectionTemplateProps) {
  // ==========================================
  // FEATURED PRODUCTS
  // ==========================================

  let products: HttpTypes.StoreProduct[] = []

  try {
    const { response } = await listProducts({
      queryParams: {
        limit: 8,
        offset: 0,
        is_giftcard: false,
      },
      countryCode,
    })

    products = response?.products || []
  } catch (error) {
    console.error("Failed to load collection products:", error)
  }

  // ==========================================
  // PREMIUM COLLECTIONS
  // ==========================================

  const premiumCollections = [
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
      image: "/category-performance-gear.jpg",
      href: "/categories/performance-gear",
    },
  ]

  return (
    <main className="w-full bg-white">

      {/* ==========================================
          HERO
      ========================================== */}

      <section
        className="relative flex min-h-[520px] items-center overflow-hidden bg-[#050b14] bg-cover bg-center"
        style={{
          backgroundImage: "url('/new-arrivals-banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#050b14]/60" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10 lg:px-16">
          <div className="max-w-[650px]">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[6px] text-[#4da3ff]">
              ARIX SPORTS
            </p>

            <h1 className="text-4xl font-bold uppercase tracking-[3px] text-white md:text-6xl lg:text-7xl">
              Premium Collections
            </h1>

            <p className="mt-6 max-w-[600px] text-base leading-8 text-gray-200 md:text-lg">
              Explore premium sportswear, accessories and performance
              essentials designed for movement, comfort and style.
            </p>

            <LocalizedClientLink
              href="/store"
              className="mt-8 inline-flex border border-white px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-white hover:text-[#050b14]"
            >
              Shop All Products
            </LocalizedClientLink>

          </div>
        </div>
      </section>

      {/* ==========================================
          PREMIUM COLLECTIONS
      ========================================== */}

      <section className="bg-white px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1250px]">

          <div className="mb-12 text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[6px] text-[#1683ff]">
              ARIX SPORTS
            </p>

            <h2 className="text-4xl font-bold uppercase tracking-[2px] text-[#07101f] md:text-5xl">
              Premium Collections
            </h2>

            <p className="mx-auto mt-4 max-w-[650px] text-sm leading-7 text-gray-500">
              Discover our carefully selected collections built for
              performance, comfort and everyday style.
            </p>

            <div className="mx-auto mt-6 h-[3px] w-12 bg-[#1683ff]" />

          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">

            {premiumCollections.map((item) => (
              <LocalizedClientLink
                key={item.title}
                href={item.href}
                className="group relative block h-[360px] overflow-hidden rounded-2xl bg-[#07101f]"
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 transition-all duration-500 group-hover:bg-black/55" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[4px] text-[#4da3ff]">
                    Premium Collection
                  </p>

                  <h3 className="text-3xl font-bold uppercase tracking-[2px] text-white md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-200">
                    {item.subtitle}
                  </p>

                  <div className="mt-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[2px] text-white">
                    <span>
                      Explore Collection
                    </span>

                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
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

      <section className="bg-[#f7f8fa] px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1250px]">

          <div className="mb-12 text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[6px] text-[#1683ff]">
              MOST LOVED
            </p>

            <h2 className="text-4xl font-bold uppercase tracking-[2px] text-[#07101f] md:text-5xl">
              Best Sellers
            </h2>

            <p className="mx-auto mt-4 max-w-[600px] text-sm leading-7 text-gray-500">
              Discover the products our customers love the most.
            </p>

            <div className="mx-auto mt-6 h-[3px] w-12 bg-[#1683ff]" />

          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">

              {products.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
                No products available.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  )
}