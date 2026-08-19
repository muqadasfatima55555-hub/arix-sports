import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <main className="bg-white">
      <div
        className="mx-auto max-w-[1500px] px-6 py-7 lg:px-10"
        data-testid="product-container"
      >
        {/* BACK TO HOME */}
        <LocalizedClientLink
          href="/"
          className="mb-6 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[3px] text-[#07101f] transition-colors hover:text-[#1683ff]"
        >
          <span className="text-lg">←</span>
          Back to Home
        </LocalizedClientLink>

        {/* MAIN PRODUCT AREA */}
        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-6
            lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]
          "
        >
          {/* ================================
              PRODUCT IMAGE
          ================================= */}
          <div className="w-full">
         <div
  className="
    relative
    mx-auto
    h-[640px]
    w-full
    max-w-[780px]
    overflow-hidden
    rounded-3xl
    bg-[#f5f6f8]
    p-5
"
>
              <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                <ImageGallery images={images} />
              </div>
            </div>
          </div>

          {/* ================================
              PRODUCT DETAILS
          ================================= */}
          <div
            className="
              flex
              w-full
              flex-col
              lg:max-w-[620px]
            "
          >
            <ProductInfo product={product} />

            <div className="mt-3">
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper
                  id={product.id}
                  region={region}
                />
              </Suspense>
            </div>
          </div>
        </div>

        {/* ================================
            RELATED PRODUCTS
        ================================= */}
        <section
          className="mt-16 border-t border-gray-200 pt-12"
          data-testid="related-products-container"
        >
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts
              product={product}
              countryCode={countryCode}
            />
          </Suspense>
        </section>
      </div>
    </main>
  )
}

export default ProductTemplate