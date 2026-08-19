import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { OptionValueIds } from "@lib/util/product-option-filters"

type CategoryTemplateProps = {
  category: HttpTypes.StoreProductCategory
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}

export default function CategoryTemplate({
  category,
  categories,
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: CategoryTemplateProps) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) {
    notFound()
  }

  // =========================================================
  // FIND MAIN / PARENT CATEGORY
  // =========================================================

  let mainCategory = category

  while (mainCategory.parent_category) {
    mainCategory = mainCategory.parent_category
  }

  // =========================================================
  // FIND MAIN CATEGORIES
  // =========================================================

  const menCategory = categories.find(
    (item) =>
      item.handle === "men" ||
      item.name?.toLowerCase() === "men"
  )

  const womenCategory = categories.find(
    (item) =>
      item.handle === "women" ||
      item.name?.toLowerCase() === "women"
  )

  const accessoriesCategory = categories.find(
    (item) =>
      item.handle === "accessories" ||
      item.name?.toLowerCase() === "accessories"
  )

  const sportsGearCategory = categories.find(
    (item) =>
      item.handle === "sports-gear" ||
      item.handle === "performance-gear" ||
      item.name?.toLowerCase() === "sports gear" ||
      item.name?.toLowerCase() === "performance gear"
  )

  // =========================================================
  // SUBCATEGORIES
  // =========================================================

  const menChildren = menCategory?.category_children || []

  const womenChildren = womenCategory?.category_children || []

  const accessoriesChildren =
    accessoriesCategory?.category_children || []

  const sportsGearChildren =
    sportsGearCategory?.category_children || []

  // =========================================================
  // BANNER IMAGES
  //
  // MAIN CATEGORIES
  // =========================================================

  const bannerImages: Record<string, string> = {
    // Main categories
    men: "/category-men.jpg",
    women: "/category-women.jpg",
    accessories: "/category-accessories.jpg",
    "sports-gear": "/category-sports-gear.jpg",
    "performance-gear": "/category-sports-gear.jpg",

    // -------------------------------------------------------
    // MEN SUBCATEGORIES
    // -------------------------------------------------------

    tracksuits: "/category-tracksuits.jpg",
    shorts: "/category-shorts.jpg",
    shoes: "/category-shoes.jpg",
    jackets: "/category-jackets.jpg",
    "t-shirts": "/category-t-shirts.jpg",
    hoodies: "/category-hoodies.jpg",
    sweatshirts: "/category-sweatshirts.jpg",
    pants: "/category-pants.jpg",

    // -------------------------------------------------------
    // WOMEN SUBCATEGORIES
    // -------------------------------------------------------

    leggings: "/category-leggings.jpg",

    // -------------------------------------------------------
    // ACCESSORIES SUBCATEGORIES
    // -------------------------------------------------------

    backbag: "/category-backbag.jpg",
    backpacks: "/category-backbag.jpg",
    wallets: "/category-wallets.jpg",
    handbags: "/category-handbags.jpg",
    gloves: "/category-gloves.jpg",

    // -------------------------------------------------------
    // SPORTS GEAR SUBCATEGORIES
    // -------------------------------------------------------

    footballs: "/category-footballs.jpg",
    "boxing-gloves": "/category-boxing-gloves.jpg",
  }

  // =========================================================
  // MAIN CATEGORY FALLBACK IMAGES
  // =========================================================

  const mainCategoryBannerImages: Record<string, string> = {
    men: "/category-men.jpg",
    women: "/category-women.jpg",
    accessories: "/category-accessories.jpg",
    "sports-gear": "/category-sports-gear.jpg",
    "performance-gear": "/category-sports-gear.jpg",
  }

  // =========================================================
  // BANNER IMAGE LOGIC
  //
  // IMPORTANT:
  //
  // 1. First check CURRENT category image
  // 2. If not available, use MAIN category image
  //
  // Example:
  //
  // Boxing Gloves
  //       ↓
  // category.handle = boxing-gloves
  //       ↓
  // category-boxing-gloves.jpg
  //
  // If image doesn't exist:
  //       ↓
  // Sports Gear image
  // =========================================================

  const bannerImage =
    bannerImages[category.handle] ||
    mainCategoryBannerImages[mainCategory.handle] ||
    "/category-default.jpg"

  // =========================================================
  // ACTIVE MAIN CATEGORY
  // =========================================================

  const isMen =
    mainCategory.handle === "men"

  const isWomen =
    mainCategory.handle === "women"

  const isAccessories =
    mainCategory.handle === "accessories"

  const isSportsGear =
    mainCategory.handle === "sports-gear" ||
    mainCategory.handle === "performance-gear"

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen bg-white">

      <div className="mx-auto flex h-[calc(100vh-120px)] max-w-[1600px] gap-10 px-6 py-8 lg:px-10">

        {/* ===================================================
            LEFT SIDEBAR
        =================================================== */}

        <aside className="hidden w-[250px] shrink-0 overflow-y-auto rounded-xl bg-[#f5f6f8] p-7 lg:block">

          <div>

            {/* SHOP */}

            <p className="mb-10 text-base font-bold uppercase tracking-[4px] text-[#07101f] underline underline-offset-8">
              Shop
            </p>


            {/* =================================================
                MEN
            ================================================= */}

            <div className="mb-10">

              <LocalizedClientLink
                href={`/categories/${
                  menCategory?.handle || "men"
                }`}
                className={`block text-base font-semibold uppercase tracking-[2px] transition-colors ${
                  isMen
                    ? "text-[#1683ff]"
                    : "text-[#07101f] hover:text-[#1683ff]"
                }`}
              >
                Men
              </LocalizedClientLink>

              <div className="mt-5 flex flex-col gap-5 border-l border-gray-200 pl-4">

                {menChildren.map((child) => (
                  <LocalizedClientLink
                    key={child.id}
                    href={`/categories/${child.handle}`}
                    className={`text-sm transition-colors ${
                      child.id === category.id
                        ? "font-semibold text-[#1683ff]"
                        : "text-gray-500 hover:text-[#07101f]"
                    }`}
                  >
                    {child.name}
                  </LocalizedClientLink>
                ))}

              </div>

            </div>


            {/* =================================================
                WOMEN
            ================================================= */}

            <div className="mb-10">

              <LocalizedClientLink
                href={`/categories/${
                  womenCategory?.handle || "women"
                }`}
                className={`block text-base font-semibold uppercase tracking-[2px] transition-colors ${
                  isWomen
                    ? "text-[#1683ff]"
                    : "text-[#07101f] hover:text-[#1683ff]"
                }`}
              >
                Women
              </LocalizedClientLink>

              <div className="mt-5 flex flex-col gap-5 border-l border-gray-200 pl-4">

                {womenChildren.map((child) => (
                  <LocalizedClientLink
                    key={child.id}
                    href={`/categories/${child.handle}`}
                    className={`text-sm transition-colors ${
                      child.id === category.id
                        ? "font-semibold text-[#1683ff]"
                        : "text-gray-500 hover:text-[#07101f]"
                    }`}
                  >
                    {child.name}
                  </LocalizedClientLink>
                ))}

              </div>

            </div>


            {/* =================================================
                ACCESSORIES
            ================================================= */}

            <div className="mb-10">

              <LocalizedClientLink
                href={`/categories/${
                  accessoriesCategory?.handle ||
                  "accessories"
                }`}
                className={`block text-base font-semibold uppercase tracking-[2px] transition-colors ${
                  isAccessories
                    ? "text-[#1683ff]"
                    : "text-[#07101f] hover:text-[#1683ff]"
                }`}
              >
                Accessories
              </LocalizedClientLink>

              <div className="mt-5 flex flex-col gap-5 border-l border-gray-200 pl-4">

                {accessoriesChildren.map((child) => (
                  <LocalizedClientLink
                    key={child.id}
                    href={`/categories/${child.handle}`}
                    className={`text-sm transition-colors ${
                      child.id === category.id
                        ? "font-semibold text-[#1683ff]"
                        : "text-gray-500 hover:text-[#07101f]"
                    }`}
                  >
                    {child.name}
                  </LocalizedClientLink>
                ))}

              </div>

            </div>


            {/* =================================================
                SPORTS GEAR
            ================================================= */}

            <div className="mb-10">

              <LocalizedClientLink
                href={`/categories/${
                  sportsGearCategory?.handle ||
                  "sports-gear"
                }`}
                className={`block text-base font-semibold uppercase tracking-[2px] transition-colors ${
                  isSportsGear
                    ? "text-[#1683ff]"
                    : "text-[#07101f] hover:text-[#1683ff]"
                }`}
              >
                Sports Gear
              </LocalizedClientLink>

              <div className="mt-5 flex flex-col gap-5 border-l border-gray-200 pl-4">

                {sportsGearChildren.map((child) => (
                  <LocalizedClientLink
                    key={child.id}
                    href={`/categories/${child.handle}`}
                    className={`text-sm transition-colors ${
                      child.id === category.id
                        ? "font-semibold text-[#1683ff]"
                        : "text-gray-500 hover:text-[#07101f]"
                    }`}
                  >
                    {child.name}
                  </LocalizedClientLink>
                ))}

              </div>

            </div>

          </div>

        </aside>


        {/* ===================================================
            RIGHT CONTENT
        =================================================== */}

        <div className="min-w-0 flex-1 overflow-y-auto">

          {/* =================================================
              BACK TO HOME
          ================================================= */}

          <div className="mb-2">

            <LocalizedClientLink
              href="/"
              className="inline-flex items-center gap-1 text-black transition-colors hover:text-[#1683ff]"
            >
              <span className="text-4xl font-bold leading-none">
                ←
              </span>
            </LocalizedClientLink>

          </div>


          {/* =================================================
              CATEGORY BANNER

              NOW EACH CATEGORY CAN HAVE ITS OWN IMAGE

              Boxing Gloves
              → category-boxing-gloves.jpg

              Footballs
              → category-footballs.jpg

              Shoes
              → category-shoes.jpg

              If image is missing:
              → Main category image
          ================================================= */}

          <section
            className="relative mt-2 flex min-h-[430px] items-center overflow-hidden rounded-2xl bg-[#07101f] bg-cover bg-center"
            style={{
              backgroundImage: `url('${bannerImage}')`,
            }}
          >

            {/* Overlay */}

            <div className="absolute inset-0 bg-black/45" />

            {/* Banner Content */}

            <div className="relative z-10 px-8 py-20 md:px-14">

              <p className="mb-4 text-sm font-medium uppercase tracking-[6px] text-[#4da3ff]">
                ARIX SPORTS
              </p>

              <h1 className="text-5xl font-bold uppercase tracking-[3px] text-white md:text-7xl">
                {category.name}
              </h1>

              <p className="mt-5 max-w-[550px] text-base leading-7 text-gray-200">
                Engineered for movement, performance and everyday comfort.
              </p>

            </div>

          </section>


          {/* =================================================
              CATEGORY HEADING
          ================================================= */}

          <section className="pt-14">

            <div className="mb-12 text-center">

              <p className="mb-4 text-base font-bold uppercase tracking-[5px] text-[#1683ff] underline underline-offset-8">
                Shop {mainCategory.name}
              </p>

              <h2 className="mt-6 text-4xl font-bold uppercase tracking-[2px] text-[#07101f] md:text-5xl">
                {category.name}
              </h2>

              <div className="mx-auto mt-5 h-[3px] w-12 bg-[#1683ff]" />

              {category.description && (
                <p className="mx-auto mt-5 max-w-[650px] text-sm leading-7 text-gray-500">
                  {category.description}
                </p>
              )}

            </div>


            {/* =================================================
                PRODUCTS
            ================================================= */}

            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={
                    category.products?.length ?? 8
                  }
                />
              }
            >

              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
                optionValueIds={optionValueIds}
              />

            </Suspense>

          </section>

        </div>

      </div>

    </main>
  )
}