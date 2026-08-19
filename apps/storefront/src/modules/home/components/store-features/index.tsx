import React from "react"
import {
  ArchiveBox,
  ArrowPath,
  Sparkles,
  CreditCard,
} from "@medusajs/icons"

const features = [
  {
    icon: <ArchiveBox className="w-8 h-8 text-black" />,
    title: "FREE DELIVERY",
    description: "On orders over €100",
  },
  {
    icon: <ArrowPath className="w-8 h-8 text-black" />,
    title: "EASY RETURNS",
    description: "30 days return policy",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-black" />,
    title: "PREMIUM QUALITY",
    description: "Tested for performance",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-black" />,
    title: "SECURE CHECKOUT",
    description: "100% safe & secure",
  },
]

const StoreFeatures = () => {
  return (
    <div className="py-12 bg-white border-t border-b border-gray-200">
      <div className="content-container mx-auto px-6 sm:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-x-4 p-5 border border-gray-200 rounded-md bg-gray-50"
          >
            <div>{feature.icon}</div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-black">
                {feature.title}
              </p>

              <p className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StoreFeatures