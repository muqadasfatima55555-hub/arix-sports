import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type CategoryShowcaseProps = {
  product_categories?: HttpTypes.StoreProductCategory[]
}

// =========================================================
// CATEGORY IMAGES
// =========================================================

const categoryImages: Record<string, string> = {
  "t-shirts": "/categories/t-shirts.jpg",
  tshirts: "/categories/t-shirts.jpg",

  shorts: "/categories/shorts.jpg",

  joggers: "/categories/joggers.jpg",

  leggings: "/categories/leggings.jpg",

  shoes: "/categories/shoes.jpg",

  jackets: "/categories/jackets.jpg",

  hoodies: "/categories/hoodies.jpg",

  "track-suits": "/categories/training.jpg",
  tracksuits: "/categories/training.jpg",

  training: "/categories/training.jpg",

  accessories: "/categories/accessories.jpg",
}

// =========================================================
// GET IMAGE FOR CATEGORY
// =========================================================

const getCategoryImage = (
  category: HttpTypes.StoreProductCategory
) => {
  const handle = category.handle?.toLowerCase()

  const name = category.name
    ?.toLowerCase()
    .trim()
    .replace(/\s+/g, "-")

  return (
    categoryImages[handle] ||
    categoryImages[name] ||
    "/categories/accessories.jpg"
  )
}

// =========================================================
// COMPONENT
// =========================================================

export default function CategoryShowcase({
  product_categories = [],
}: CategoryShowcaseProps) {

  // =======================================================
  // COLLECT ALL SUBCATEGORIES
  // =======================================================

  const allSubcategories: HttpTypes.StoreProductCategory[] = []

  const collectChildren = (
    categories: HttpTypes.StoreProductCategory[]
  ) => {
    categories.forEach((category) => {

      const children = category.category_children || []

      children.forEach((child) => {

        allSubcategories.push(child)

        if (child.category_children?.length) {
          collectChildren(child.category_children)
        }

      })
    })
  }

  collectChildren(product_categories)

  // =======================================================
  // REMOVE DUPLICATES
  //
  // Example:
  //
  // Men → T-Shirts
  // Women → T-Shirts
  //
  // Homepage → only ONE T-Shirts
  // =======================================================

  const uniqueSubcategories = Array.from(
    new Map(
      allSubcategories.map((category) => [
        category.handle?.toLowerCase(),
        category,
      ])
    ).values()
  )

  // =======================================================
  // FIRST 5 SUBCATEGORIES
  // =======================================================

  const featuredCategories = uniqueSubcategories.slice(0, 5)

  return (
    <section className="bg-white py-16">
      <div className="content-container">

        <div className="flex">

          {/* =================================================
              LEFT VERTICAL TEXT
          ================================================= */}

          <div className="hidden w-16 shrink-0 items-center justify-center border-r border-gray-200 mr-4 lg:flex">

            <span
              className="uppercase text-[11px] tracking-[4px] text-gray-500 font-medium"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Shop By Category
            </span>

          </div>


          {/* =================================================
              CATEGORY CARDS
          ================================================= */}

          <div
            className={`grid flex-1 grid-cols-2 gap-3 md:grid-cols-3 ${
              uniqueSubcategories.length > 5
                ? "lg:grid-cols-6"
                : "lg:grid-cols-5"
            }`}
          >

            {/* =================================================
                FIRST 5
            ================================================= */}

            {featuredCategories.map((category) => (

              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                className="group"
              >

                <div className="relative overflow-hidden">

                  <img
                    src={getCategoryImage(category)}
                    alt={category.name}
                    className="h-[250px] w-full object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-black/35 transition-all duration-500 group-hover:bg-black/20" />

                  {/* Category Name */}

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">

                    <p className="text-xs font-bold uppercase tracking-[5px] text-white">
                      {category.name}
                    </p>

                  </div>

                </div>

              </LocalizedClientLink>

            ))}


            {/* =================================================
                VIEW ALL
            ================================================= */}

            {uniqueSubcategories.length > 5 && (

              <LocalizedClientLink
                href="/subcategories"
                className="group"
              >

                <div className="relative flex h-[250px] w-full items-center justify-center overflow-hidden bg-[#07101f]">

                  {/* Hover Background */}

                  <div className="absolute inset-0 bg-[#0d1b31] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 text-center">

                    <p className="text-[11px] font-medium uppercase tracking-[4px] text-gray-400">
                      Explore
                    </p>

                    <p className="mt-3 text-sm font-bold uppercase tracking-[4px] text-white">
                      View All
                    </p>

                    <div className="mx-auto mt-5 h-px w-10 bg-white transition-all duration-300 group-hover:w-16" />

                  </div>

                </div>

              </LocalizedClientLink>

            )}

          </div>

        </div>

      </div>
    </section>
  )
}