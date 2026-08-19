import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import { HttpTypes } from "@medusajs/types"
import Search from "@modules/common/components/search"
type NavbarProps = {
  product_categories?: HttpTypes.StoreProductCategory[]
}

const Navbar = ({
  product_categories = [],
}: NavbarProps) => {
  // =========================================================
  // MAIN CATEGORIES
  // =========================================================

  const menCategory = product_categories.find(
    (category) =>
      category.handle === "men" ||
      category.name?.toLowerCase() === "men"
  )

  const womenCategory = product_categories.find(
    (category) =>
      category.handle === "women" ||
      category.name?.toLowerCase() === "women"
  )

  const accessoriesCategory = product_categories.find(
    (category) =>
      category.handle === "accessories" ||
      category.name?.toLowerCase() === "accessories"
  )

  const sportsGearCategory = product_categories.find(
    (category) =>
      category.handle === "sports-gear" ||
      category.handle === "performance-gear" ||
      category.name?.toLowerCase() === "sports gear" ||
      category.name?.toLowerCase() === "performance gear"
  )

  // =========================================================
  // SUB CATEGORIES
  // =========================================================

  const menChildren = menCategory?.category_children || []

  const womenChildren = womenCategory?.category_children || []

  const accessoriesChildren =
    accessoriesCategory?.category_children || []

  const sportsGearChildren =
    sportsGearCategory?.category_children || []

  // =========================================================
  // CATEGORY LINKS
  // =========================================================

  const menHref = menCategory
    ? `/categories/${menCategory.handle}`
    : "/categories/men"

  const womenHref = womenCategory
    ? `/categories/${womenCategory.handle}`
    : "/categories/women"

  const accessoriesHref = accessoriesCategory
    ? `/categories/${accessoriesCategory.handle}`
    : "/categories/accessories"

  const sportsGearHref = sportsGearCategory
    ? `/categories/${sportsGearCategory.handle}`
    : "/categories/sports-gear"

  return (
    <header className="relative z-50 w-full bg-[#07101f] text-white">
      <div className="mx-auto flex h-[120px] max-w-[1800px] items-center justify-between px-8">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <LocalizedClientLink
          href="/"
          className="flex shrink-0 items-center"
        >
          <img
            src="/logo-white.png"
            alt="Arix Sports"
            className="h-20 w-auto"
          />
        </LocalizedClientLink>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="hidden items-center gap-8 text-[13px] font-medium uppercase tracking-[2px] text-white lg:flex">

          {/* ===================================================
              MEN
          =================================================== */}

          <div className="group relative">
            <LocalizedClientLink
              href={menHref}
              className="flex items-center gap-1 py-5 transition-all duration-300 hover:text-blue-400"
            >
              Men

              {menChildren.length > 0 && (
                <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">
                  ↓
                </span>
              )}
            </LocalizedClientLink>

            {menChildren.length > 0 && (
              <div className="absolute left-1/2 top-full z-[100] hidden w-[260px] -translate-x-1/2 pt-2 group-hover:block">
                <div className="rounded-lg border border-white/10 bg-[#101827] p-6 shadow-2xl">

                  <p className="mb-5 text-[11px] font-medium uppercase tracking-[4px] text-gray-400">
                    Shop Men
                  </p>

                  <div className="flex flex-col gap-4">
                    {menChildren.map((category) => (
                      <LocalizedClientLink
                        key={category.id}
                        href={`/categories/${category.handle}`}
                        className="text-sm normal-case tracking-normal text-gray-200 transition-colors duration-200 hover:text-blue-400"
                      >
                        {category.name}
                      </LocalizedClientLink>
                    ))}
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* ===================================================
              WOMEN
          =================================================== */}

          <div className="group relative">
            <LocalizedClientLink
              href={womenHref}
              className="flex items-center gap-1 py-5 transition-all duration-300 hover:text-blue-400"
            >
              Women

              {womenChildren.length > 0 && (
                <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">
                  ↓
                </span>
              )}
            </LocalizedClientLink>

            {womenChildren.length > 0 && (
              <div className="absolute left-1/2 top-full z-[100] hidden w-[260px] -translate-x-1/2 pt-2 group-hover:block">
                <div className="rounded-lg border border-white/10 bg-[#101827] p-6 shadow-2xl">

                  <p className="mb-5 text-[11px] font-medium uppercase tracking-[4px] text-gray-400">
                    Shop Women
                  </p>

                  <div className="flex flex-col gap-4">
                    {womenChildren.map((category) => (
                      <LocalizedClientLink
                        key={category.id}
                        href={`/categories/${category.handle}`}
                        className="text-sm normal-case tracking-normal text-gray-200 transition-colors duration-200 hover:text-blue-400"
                      >
                        {category.name}
                      </LocalizedClientLink>
                    ))}
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* ===================================================
              ACCESSORIES
          =================================================== */}

          <div className="group relative">
            <LocalizedClientLink
              href={accessoriesHref}
              className="flex items-center gap-1 py-5 transition-all duration-300 hover:text-blue-400"
            >
              Accessories

              {accessoriesChildren.length > 0 && (
                <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">
                  ↓
                </span>
              )}
            </LocalizedClientLink>

            {accessoriesChildren.length > 0 && (
              <div className="absolute left-1/2 top-full z-[100] hidden w-[280px] -translate-x-1/2 pt-2 group-hover:block">
                <div className="rounded-lg border border-white/10 bg-[#101827] p-6 shadow-2xl">

                  <p className="mb-5 text-[11px] font-medium uppercase tracking-[4px] text-gray-400">
                    Accessories
                  </p>

                  <div className="flex flex-col gap-4">
                    {accessoriesChildren.map((category) => (
                      <LocalizedClientLink
                        key={category.id}
                        href={`/categories/${category.handle}`}
                        className="text-sm normal-case tracking-normal text-gray-200 transition-colors duration-200 hover:text-blue-400"
                      >
                        {category.name}
                      </LocalizedClientLink>
                    ))}
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* ===================================================
              SPORTS GEAR
          =================================================== */}

          <div className="group relative">
            <LocalizedClientLink
              href={sportsGearHref}
              className="flex items-center gap-1 py-5 transition-all duration-300 hover:text-blue-400"
            >
              Sports Gear

              {sportsGearChildren.length > 0 && (
                <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">
                  ↓
                </span>
              )}
            </LocalizedClientLink>

            {sportsGearChildren.length > 0 && (
              <div className="absolute left-1/2 top-full z-[100] hidden w-[280px] -translate-x-1/2 pt-2 group-hover:block">
                <div className="rounded-lg border border-white/10 bg-[#101827] p-6 shadow-2xl">

                  <p className="mb-5 text-[11px] font-medium uppercase tracking-[4px] text-gray-400">
                    Sports Gear
                  </p>

                  <div className="flex flex-col gap-4">
                    {sportsGearChildren.map((category) => (
                      <LocalizedClientLink
                        key={category.id}
                        href={`/categories/${category.handle}`}
                        className="text-sm normal-case tracking-normal text-gray-200 transition-colors duration-200 hover:text-blue-400"
                      >
                        {category.name}
                      </LocalizedClientLink>
                    ))}
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* ===================================================
              NEW ARRIVALS
          =================================================== */}

          <LocalizedClientLink
            href="/collections/new-arrivals"
            className="transition-all duration-300 hover:text-blue-400"
          >
            New Arrivals
          </LocalizedClientLink>

          {/* ===================================================
              COLLECTIONS
          =================================================== */}

          <LocalizedClientLink
            href="/collections"
            className="transition-all duration-300 hover:text-blue-400"
          >
            Collections
          </LocalizedClientLink>

        </nav>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-5 text-white">

          {/* SEARCH */}

<Search />

          {/* ACCOUNT */}

          <LocalizedClientLink
            href="/account"
            className="transition-all duration-300 hover:scale-110 hover:text-blue-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <circle
                cx="12"
                cy="8"
                r="4"
              />

              <path d="M4 20c2-4 14-4 16 0" />
            </svg>
          </LocalizedClientLink>

          {/* WISHLIST */}

   {/* WISHLIST */}

<LocalizedClientLink
  href="/wishlist"
  aria-label="Wishlist"
  className="transition-all duration-300 hover:scale-110 hover:text-blue-400"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M12 21s-7-4.5-9-9a5 5 0 018-5l1 1 1-1a5 5 0 018 5c-2 4.5-9 9-9 9z" />
  </svg>
</LocalizedClientLink>

          {/* CART */}

          <div className="transition-all duration-300 hover:scale-110 hover:text-blue-400">
            <CartButton />
          </div>

        </div>

      </div>
    </header>
  )
}

export default Navbar