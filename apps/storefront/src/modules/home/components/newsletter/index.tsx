import React from "react"

export default function Newsletter() {
  return (
    <section className="bg-[#08111F] border-t border-white/10">
      <div className="content-container py-12">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}

          <div>

            <p className="uppercase tracking-[3px] text-xs text-gray-400">
              Stay Ahead. Join Arix.
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white">
              Stay Ahead.
            </h2>

            <p className="mt-4 text-gray-400 leading-7 max-w-md">
              Get updates on new arrivals, exclusive offers and
              performance tips.
            </p>

          </div>

          {/* Right */}

          <form className="flex overflow-hidden rounded-md border border-[#22314d]">

            <input
              type="email"
              placeholder="Enter your email"
              className="
                flex-1
                bg-[#101827]
                px-5
                py-4
                text-white
                placeholder:text-gray-500
                outline-none
              "
            />

            <button
              type="submit"
              className="
                bg-[#1565F9]
                px-10
                text-sm
                font-semibold
                uppercase
                tracking-[2px]
                text-white
                transition
                hover:bg-[#0F56D9]
              "
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>
    </section>
  )
}