import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CollectionBanner() {
  return (
    <section className="content-container pb-20">

      <div className="relative overflow-hidden rounded-lg h-[420px]">

        <img
          src="/promo-banner-2.jpg"
          alt="Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center">

          <div className="pl-12 lg:pl-20 text-white">

            <p className="uppercase tracking-[5px] text-xs text-gray-300 mb-5">
              NEW COLLECTION
            </p>

            <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
              SUMMER
              <br />
              PERFORMANCE
              <br />
              COLLECTION
            </h2>

            <LocalizedClientLink
              href="/collections"
              className="inline-block mt-10 bg-[#0A67E6] px-8 py-4 uppercase tracking-[3px] text-xs font-semibold hover:bg-blue-700 transition"
            >
              Explore Collection
            </LocalizedClientLink>

          </div>

        </div>

      </div>

    </section>
  )
}