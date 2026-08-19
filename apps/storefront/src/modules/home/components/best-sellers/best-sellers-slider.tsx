"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

import ProductPreview from "@modules/products/components/product-preview"
import { HttpTypes } from "@medusajs/types"

type BestSellersSliderProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

export default function BestSellersSlider({
  products,
  region,
}: BestSellersSliderProps) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
      className="!pb-10"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductPreview
            product={product}
            region={region}
            isFeatured
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}