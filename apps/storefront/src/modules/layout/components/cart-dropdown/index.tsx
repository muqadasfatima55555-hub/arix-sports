"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

import { Fragment } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          {/* ================= CART BUTTON ================= */}
          <PopoverButton
            className="
              flex
              items-center
              text-white
              outline-none
              transition-all
              duration-300
              hover:text-blue-400
              hover:scale-105
            "
          >
            <span className="text-sm">
              Cart ({totalItems})
            </span>
          </PopoverButton>

          {/* ================= CART DROPDOWN ================= */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <PopoverPanel
              className="
                absolute
                right-0
                top-full
                z-[999]
                mt-4
                w-[380px]
                overflow-hidden
                rounded-lg
                border
                border-gray-200
                bg-white
                text-gray-900
                shadow-2xl
              "
            >
              {/* ================= HEADER ================= */}
              <div className="border-b border-gray-200 px-6 py-5">
                <h3 className="text-lg font-medium text-gray-900">
                  Cart
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"}
                </p>
              </div>

              {/* ================= CART HAS ITEMS ================= */}
              {cartState && cartState.items?.length ? (
                <>
                  {/* Products */}
                  <div className="max-h-[400px] overflow-y-auto px-6">
                    {cartState.items
                      .slice()
                      .sort((a, b) => {
                        return (a.created_at ?? "") >
                          (b.created_at ?? "")
                          ? -1
                          : 1
                      })
                      .map((item) => (
                        <div
                          key={item.id}
                          className="
                            flex
                            gap-4
                            border-b
                            border-gray-100
                            py-5
                          "
                        >
                          {/* Product Image */}
                          <LocalizedClientLink
                            href={`/products/${item.product_handle}`}
                            className="w-20 shrink-0"
                          >
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                            />
                          </LocalizedClientLink>

                          {/* Product Information */}
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                                className="
                                  text-sm
                                  font-medium
                                  text-gray-900
                                  transition-colors
                                  hover:text-blue-500
                                "
                              >
                                {item.title}
                              </LocalizedClientLink>

                              <DeleteButton
                                id={item.id}
                                className="
                                  text-xs
                                  text-gray-500
                                  hover:text-red-500
                                "
                              >
                                Remove
                              </DeleteButton>
                            </div>

                            {/* Variant Options */}
                            <div className="mt-2">
                              <LineItemOptions
                                variant={item.variant}
                                data-testid="product-variant"
                              />
                            </div>

                            {/* Quantity */}
                            <p className="mt-2 text-xs text-gray-500">
                              Quantity: {item.quantity}
                            </p>

                            {/* Price */}
                            <div className="mt-2">
                              <LineItemPrice item={item} />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* ================= SUBTOTAL ================= */}
                  <div className="border-t border-gray-200 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Subtotal
                        <span className="ml-1 text-xs">
                          (excl. taxes)
                        </span>
                      </span>

                      <span className="font-medium text-gray-900">
                        {convertToLocale({
                          amount: subtotal,
                          currency_code:
                            cartState.currency_code,
                        })}
                      </span>
                    </div>

                    {/* Go To Cart */}
                    <LocalizedClientLink
                      href="/cart"
                      className="mt-5 block"
                    >
                      <Button
                        className="w-full"
                        variant="primary"
                      >
                        Go to cart
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </>
              ) : (
                /* ================= EMPTY CART ================= */
                <div className="px-6 py-10 text-center">
                  <div className="mb-4 text-3xl">
                    🛒
                  </div>

                  <h4 className="text-base font-medium text-gray-900">
                    Your cart is empty
                  </h4>

                  <p className="mt-2 text-sm text-gray-500">
                    You haven't added anything to your cart yet.
                  </p>

                  <LocalizedClientLink
                    href="/store"
                    className="mt-6 block"
                  >
                    <Button
                      className="w-full"
                      variant="primary"
                    >
                      Explore Products
                    </Button>
                  </LocalizedClientLink>
                </div>
              )}
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default CartDropdown