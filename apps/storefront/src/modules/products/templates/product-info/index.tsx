import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const category = product.categories?.[0]

  return (
    <div id="product-info">

      <div className="flex flex-col gap-y-4">

        {/* CATEGORY */}

        {category && (
          <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className="w-fit text-sm font-medium uppercase tracking-[2px] text-[#1683ff] transition-colors hover:text-[#07101f]"
          >
            {category.name}
          </LocalizedClientLink>
        )}


        {/* TITLE */}

        <Heading
          level="h1"
          className="max-w-[620px] text-3xl font-extrabold leading-[1.08] tracking-tight text-[#07101f] md:text-4xl lg:text-[48px]"
          data-testid="product-title"
        >
          {product.title}
        </Heading>


        {/* DESCRIPTION */}

        {product.description && (
          <Text
            className="max-w-[600px] text-base leading-7 text-gray-500 md:text-[17px]"
            data-testid="product-description"
          >
            {product.description}
          </Text>
        )}

      </div>

    </div>
  )
}

export default ProductInfo