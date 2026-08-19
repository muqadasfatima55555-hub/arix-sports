"use client"

import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

/*
 * ==========================================
 * VARIANT OPTIONS → KEYMAP
 * ==========================================
 */

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce(
    (acc: Record<string, string>, varopt) => {
      if (varopt.option_id) {
        acc[varopt.option_id] = varopt.value
      }

      return acc
    },
    {}
  )
}

/*
 * ==========================================
 * PRODUCT ACTIONS
 * ==========================================
 */

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const countryCode = useParams().countryCode as string

  const actionsRef = useRef<HTMLDivElement>(null)

  const [options, setOptions] = useState<
    Record<string, string | undefined>
  >({})

  const [isAdding, setIsAdding] = useState(false)

  const [quantity, setQuantity] = useState(1)

  const [isWishlisted, setIsWishlisted] = useState(false)

  /*
   * ==========================================
   * PRESELECT SINGLE VARIANT
   * ==========================================
   */

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(
        product.variants[0].options
      )

      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  /*
   * ==========================================
   * SELECTED VARIANT
   * ==========================================
   */

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((variant) => {
      const variantOptions = optionsAsKeymap(
        variant.options
      )

      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  /*
   * ==========================================
   * SET OPTION
   * ==========================================
   */

  const setOptionValue = (
    optionId: string,
    value: string
  ) => {
    setOptions((previous) => ({
      ...previous,
      [optionId]: value,
    }))
  }

  /*
   * ==========================================
   * VALID VARIANT
   * ==========================================
   */

  const isValidVariant = useMemo(() => {
    return product.variants?.some((variant) => {
      const variantOptions = optionsAsKeymap(
        variant.options
      )

      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  /*
   * ==========================================
   * UPDATE URL
   * ==========================================
   */

  useEffect(() => {
    const params = new URLSearchParams(
      searchParams.toString()
    )

    const value = isValidVariant
      ? selectedVariant?.id
      : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(
      pathname +
        (params.toString()
          ? `?${params.toString()}`
          : "")
    )
  }, [
    selectedVariant,
    isValidVariant,
    pathname,
    router,
    searchParams,
  ])

  /*
   * ==========================================
   * STOCK
   * ==========================================
   */

  const inStock = useMemo(() => {
    if (
      selectedVariant &&
      !selectedVariant.manage_inventory
    ) {
      return true
    }

    if (selectedVariant?.allow_backorder) {
      return true
    }

    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant.inventory_quantity || 0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  /*
   * ==========================================
   * QUANTITY
   * ==========================================
   */

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    )
  }

  const increaseQuantity = () => {
    setQuantity((current) => current + 1)
  }

  /*
   * ==========================================
   * ADD TO CART
   * ==========================================
   */

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) {
      return null
    }

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity,
        countryCode,
      })
    } finally {
      setIsAdding(false)
    }
  }

  /*
   * ==========================================
   * WISHLIST
   * ==========================================
   */

  const handleWishlist = () => {
    setIsWishlisted((current) => !current)
  }

  return (
    <div
      ref={actionsRef}
      className="flex flex-col gap-y-4"
    >
      {/* ==========================================
          RATING
      ========================================== */}

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-[1px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-yellow-400"
              aria-hidden="true"
            >
              <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.56l-5.91 3.1 1.13-6.57-4.77-4.65 6.6-.96L12 2.5z" />
            </svg>
          ))}
        </div>

        <span className="ml-1 text-sm font-semibold text-[#07101f]">
          5.0
        </span>

        <span className="text-sm text-gray-400">
          Customer Reviews
        </span>
      </div>

      {/* ==========================================
          PRODUCT OPTIONS
      ========================================== */}

      {(product.variants?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-y-3">
          {(product.options || []).map((option) => (
            <div key={option.id}>
              <OptionSelect
                option={option}
                current={options[option.id]}
                updateOption={setOptionValue}
                title={option.title ?? ""}
                data-testid="product-options"
                disabled={
                  !!disabled || isAdding
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* ==========================================
          PRICE
      ========================================== */}

      <div className="rounded-xl bg-[#f5f7fa] px-5 py-3">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[3px] text-gray-400">
          Price
        </p>

        <ProductPrice
          product={product}
          variant={selectedVariant}
        />
      </div>

      {/* ==========================================
          STOCK
      ========================================== */}

      <div className="flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            inStock
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />

        <span
          className={`text-sm font-medium ${
            inStock
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {inStock
            ? "In Stock"
            : "Currently Out of Stock"}
        </span>
      </div>

      {/* ==========================================
          QUANTITY + WISHLIST
      ========================================== */}

      <div className="flex items-end gap-3">
        {/* QUANTITY */}

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#07101f]">
            Quantity
          </span>

          <div className="flex h-12 items-center overflow-hidden rounded-lg border border-gray-200 bg-white">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={
                quantity <= 1 || isAdding
              }
              className="
                flex
                h-full
                w-12
                items-center
                justify-center
                text-xl
                text-[#07101f]
                transition
                hover:bg-gray-100
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              −
            </button>

            <span className="flex h-full w-12 items-center justify-center border-x border-gray-200 text-sm font-semibold">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={isAdding}
              className="
                flex
                h-full
                w-12
                items-center
                justify-center
                text-xl
                text-[#07101f]
                transition
                hover:bg-gray-100
                disabled:opacity-40
              "
            >
              +
            </button>
          </div>
        </div>

        {/* WISHLIST */}

        <button
          type="button"
          onClick={handleWishlist}
          disabled={isAdding}
          className={`
            flex
            h-12
            flex-1
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            text-sm
            font-semibold
            uppercase
            tracking-[1.5px]
            transition-all
            duration-300
            ${
              isWishlisted
                ? "border-[#07101f] bg-[#07101f] text-white"
                : "border-gray-200 bg-white text-[#07101f] hover:border-[#07101f]"
            }
          `}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M20.8 8.8c0-3-2.2-5.3-5.1-5.3-1.7 0-3 .8-3.7 2-.7-1.2-2-2-3.7-2-2.9 0-5.1 2.3-5.1 5.3 0 5.1 8.8 10.1 8.8 10.1s8.8-5 8.8-10.1z" />
          </svg>

          {isWishlisted
            ? "Wishlisted"
            : "Add to Wishlist"}
        </button>
      </div>

      {/* ==========================================
          ADD TO CART
      ========================================== */}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={
          !inStock ||
          !selectedVariant ||
          !!disabled ||
          isAdding ||
          !isValidVariant
        }
        className="
          group
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-[#07101f]
          text-sm
          font-bold
          uppercase
          tracking-[2px]
          text-white
          shadow-md
          transition-all
          duration-300
          hover:bg-[#0d1930]
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:bg-gray-300
        "
        data-testid="add-product-button"
      >
        {isAdding ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Adding...
          </>
        ) : !selectedVariant ? (
          "Select Options"
        ) : !inStock || !isValidVariant ? (
          "Out of Stock"
        ) : (
          <>
            Add to Cart

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h13" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </>
        )}
      </button>

      {/* ==========================================
          MOBILE ACTIONS
      ========================================== */}

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={false}
        optionsDisabled={
          !!disabled || isAdding
        }
      />
    </div>
  )
}