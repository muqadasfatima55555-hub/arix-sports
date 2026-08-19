import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  title: string
  items: {
    title: string
    href: string
  }[]
  image: string
  subtitle: string
}

export default function NavDropdown({
  title,
  items,
  image,
  subtitle,
}: Props) {
  return (
    <div className="relative group">

      <button className="flex items-center gap-1 uppercase text-[13px] tracking-[2px] font-medium text-white hover:text-gray-300 transition">

        {title}

        <svg
          className="w-4 h-4 transition group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>

      </button>

      <div
        className="
        invisible
        opacity-0
        translate-y-3
        group-hover:visible
        group-hover:opacity-100
        group-hover:translate-y-0
        transition-all
        duration-300

        absolute
        left-0
        top-full
        mt-6
        w-[620px]

        rounded-2xl
        bg-[#0B1220]
        shadow-2xl
        border
        border-white/10
        overflow-hidden
        z-50
      "
      >
        <div className="grid grid-cols-2">

          {/* Left */}

          <div className="p-10">

            <h4 className="text-white text-lg font-semibold mb-6">
              Shop by Category
            </h4>

            <div className="space-y-5">

              {items.map((item) => (

                <LocalizedClientLink
                  key={item.title}
                  href={item.href}
                  className="
                    block
                    text-gray-300
                    hover:text-white
                    transition
                    text-sm
                  "
                >
                  {item.title}
                </LocalizedClientLink>

              ))}

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-8 left-8">

              <p className="text-white text-2xl font-bold">
                {subtitle}
              </p>

              <p className="text-gray-200 mt-2">
                Discover Collection
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}