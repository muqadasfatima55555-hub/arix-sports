import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

/* =========================================================
   CATEGORY FIELDS
========================================================= */

const categoryFields =
  "*category_children," +
  "*category_children.category_children," +
  "*category_children.category_children.category_children," +
  "*products," +
  "*parent_category," +
  "*parent_category.parent_category," +
  "*parent_category.parent_category.parent_category"


/* =========================================================
   LIST CATEGORIES
========================================================= */

export const listCategories = async (
  query?: Record<string, unknown>
) => {
  const next = {
    ...(await getCacheOptions("categories")),
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{
      product_categories: HttpTypes.StoreProductCategory[]
    }>("/store/product-categories", {
      query: {
        limit,

        // Only get top-level categories
        parent_category_id: null,

        // Include complete child category tree
        include_descendants_tree: true,

        // Include parent category information
        fields: categoryFields,

        ...query,
      },

      next,
      cache: "no-store",
    })
    .then(({ product_categories }) => product_categories)
}


/* =========================================================
   GET CATEGORY BY HANDLE
========================================================= */

export const getCategoryByHandle = async (
  categoryHandle: string[]
) => {
  const handle = categoryHandle.join("/")

  const next = {
    ...(await getCacheOptions("categories")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      "/store/product-categories",
      {
        query: {
          handle,

          // Include all descendants
          include_descendants_tree: true,

          // Include parent + parent hierarchy
          fields: categoryFields,
        },

        next,
        cache: "no-store",
      }
    )
    .then(({ product_categories }) => {
      return product_categories[0]
    })
}