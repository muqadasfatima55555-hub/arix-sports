import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function EditorialBanner() {
  return (
    <section className="content-container py-16">
      <div className="grid overflow-hidden rounded-lg bg-[#0B1220] lg:grid-cols-2">

        {/* Left Image */}

        <div className="h-[430px] overflow-hidden">
          <img
            src="/promo-banner-1.jpg"
            alt="Editorial Banner"
            className="h-full w-full object-cover duration-500 hover:scale-105"
          />
        </div>

        {/* Right Content */}

        <div className="flex flex-col justify-center px-10 py-14 text-white lg:px-16">

          <p className="mb-5 text-xs uppercase tracking-[5px] text-gray-400">
            ARIX SPORTS
          </p>

          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
            BUILT FOR
            <br />
            PERFORMANCE.
            <br />
            DESIGNED FOR U.
          </h2>

          <p className="mt-6 max-w-md leading-7 text-gray-300">
            High-performance sportswear engineered with premium
            materials to keep you comfortable from training to
            competition.
          </p>

          {/* Shop Now → Sports Gear */}

          <LocalizedClientLink
            href="/categories/sports-gear"
            className="mt-10 w-fit border border-white px-8 py-3 text-xs uppercase tracking-[3px] transition hover:bg-white hover:text-black"
          >
            Shop Now
          </LocalizedClientLink>

        </div>

      </div>
    </section>
  )
}