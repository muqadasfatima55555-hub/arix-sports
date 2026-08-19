import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"

export default async function SubcategoriesPage() {
  const categories = await listCategories()

  /* =========================================================
     GET ALL SUBCATEGORIES
  ========================================================= */

  const allSubcategories: HttpTypes.StoreProductCategory[] = []

  categories?.forEach((mainCategory) => {
    const children = mainCategory.category_children || []

    children.forEach((child) => {
      allSubcategories.push(child)
    })
  })

  /* =========================================================
     REMOVE DUPLICATES BY NAME

     Example:

     Men
       └── T-Shirts

     Women
       └── T-Shirts

     Only ONE T-Shirts card will appear.
  ========================================================= */

  const uniqueSubcategories = Array.from(
    new Map(
      allSubcategories.map((category) => [
        category.name?.trim().toLowerCase(),
        category,
      ])
    ).values()
  )

  /* =========================================================
     CATEGORY IMAGES
  ========================================================= */

  const categoryImages: Record<string, string> = {
    "t-shirts": "/categories/t-shirts.jpg",
    "t shirt": "/categories/t-shirts.jpg",
    tshirts: "/categories/t-shirts.jpg",

    shorts: "/categories/shorts.jpg",

    joggers: "/categories/joggers.jpg",

    leggings: "/categories/leggings.jpg",

    shoes: "/categories/shoes.jpg",

    jackets: "/categories/jackets.jpg",

    hoodies: "/categories/hoodies.jpg",

    sweatshirts: "/categories/sweatshirts.jpg",

    sweatpants: "/categories/sweatpants.jpg",

    pants: "/categories/pants.jpg",

    tracksuits: "/categories/tracksuits.jpg",
    tracksuit: "/categories/tracksuits.jpg",

    gloves: "/categories/gloves.jpg",

    wallets: "/categories/wallets.jpg",

    handbags: "/categories/handbags.jpg",

    backbag: "/categories/backbag.jpg",
    backpack: "/categories/backbag.jpg",
    backpacks: "/categories/backbag.jpg",

    footballs: "/categories/footballs.jpg",

    "boxing gloves": "/categories/boxing-gloves.jpg",

    training: "/categories/training.jpg",

    "waist belts": "/categories/waist-belts.jpg",
    "waist belt": "/categories/waist-belts.jpg",
  }

  return (
    <main className="min-h-screen bg-white">

      <section className="bg-white py-16">

        <div className="content-container">

          {/* =================================================
              TOP HEADING
          ================================================= */}

          <div className="mb-12 text-center">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[5px] text-[#1683ff]">
              ARIX SPORTS
            </p>

            <h1 className="text-4xl font-bold uppercase tracking-[3px] text-[#07101f] md:text-5xl">
              All Categories
            </h1>

            <div className="mx-auto mt-5 h-[3px] w-12 bg-[#1683ff]" />

          </div>


          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="flex">

            {/* =================================================
                LEFT VERTICAL HEADING + DIVIDER
            ================================================= */}

            <div
              className="
                flex
                w-16
                shrink-0
                items-center
                justify-center
                border-r-[3px]
                border-gray-400
                mr-5
              "
            >

              <span
                className="
                  whitespace-nowrap
                  text-[13px]
                  font-bold
                  uppercase
                  tracking-[4px]
                  text-[#07101f]
                "
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Shop By Category
              </span>

            </div>


            {/* =================================================
                CATEGORIES
            ================================================= */}

            <div className="min-w-0 flex-1">

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >

                {uniqueSubcategories.map((category) => {

                  const categoryName =
                    category.name?.trim() || ""

                  const imageKey =
                    categoryName.toLowerCase()

                  const image =
                    categoryImages[imageKey] ||
                    "/categories/default.jpg"

                  return (

                    <LocalizedClientLink
                      key={category.id}

                      /*
                       * IMPORTANT:
                       *
                       * This connects directly to the
                       * existing category page.
                       *
                       * Example:
                       *
                       * T-Shirts
                       *      ↓
                       * /categories/t-shirts
                       */

                      href={`/categories/${category.handle}`}

                      className="group block"
                    >

                      {/* =================================================
                          CATEGORY CARD
                      ================================================= */}

                      <div
                        className="
                          relative
                          overflow-hidden
                          rounded-xl
                          bg-[#F7F7F7]
                        "
                      >

                        {/* =================================================
                            IMAGE

                            Same square ratio as ProductPreview
                        ================================================= */}

                        <div className="aspect-square overflow-hidden">

                          <img
                            src={image}
                            alt={categoryName}
                            className="
                              h-full
                              w-full
                              object-cover
                              transition-transform
                              duration-500
                              group-hover:scale-110
                            "
                          />

                        </div>


                        {/* =================================================
                            OVERLAY
                        ================================================= */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-black/35
                            transition-all
                            duration-500
                            group-hover:bg-black/20
                          "
                        />


                        {/* =================================================
                            CATEGORY NAME
                        ================================================= */}

                        <div
                          className="
                            absolute
                            bottom-6
                            left-1/2
                            -translate-x-1/2
                          "
                        >

                          <p
                            className="
                              whitespace-nowrap
                              text-sm
                              font-bold
                              uppercase
                              tracking-[5px]
                              text-white
                            "
                          >
                            {categoryName}
                          </p>

                        </div>

                      </div>

                    </LocalizedClientLink>
                  )
                })}

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}