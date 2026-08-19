import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="bg-[#0B1220] overflow-hidden">
      <div className="content-container grid lg:grid-cols-2 items-center min-h-[560px] gap-10">

        {/* Left Side */}

        <div className="text-white py-12 lg:py-0">

          <p className="mb-5 text-xs font-semibold uppercase tracking-[6px] text-gray-400">
            Fashion That Moves With You
          </p>

          <h1 className="text-5xl lg:text-7xl font-black uppercase leading-[0.92] tracking-tight">
            Engineered
            <br />
            For
            <br />
            Champions.
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-8 text-gray-300">
            Premium sportswear designed for athletes who demand
            performance, comfort and timeless style.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <LocalizedClientLink
              href="/store"
              className="rounded-md bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-[#0B1220] transition hover:bg-gray-200"
            >
              Shop Now
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/collections/new-arrivals"
              className="rounded-md border border-white px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-white hover:text-[#0B1220]"
            >
              Explore New
            </LocalizedClientLink>

          </div>

        </div>

        {/* Right Side */}
<div className="relative flex justify-end -mr-8 lg:-mr-16">

  <img
    src="/hero-banner.jpg"
    alt="Arix Athlete"
    className="
      h-[620px]
      w-[960px]
      object-cover
      object-right
    "
  />

</div>

      </div>
    </section>
  )
}

export default Hero