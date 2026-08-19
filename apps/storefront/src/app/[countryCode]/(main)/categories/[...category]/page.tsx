import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getCategoryByHandle,
  listCategories,
} from "@lib/data/categories"

import { listRegions } from "@lib/data/regions"
import {
  HttpTypes,
  StoreRegion,
} from "@medusajs/types"

import CategoryTemplate from "@modules/categories/templates"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { parseOptionValueIds } from "@lib/util/product-option-filters"

type Props = {
  params: Promise<{
    category: string[]
    countryCode: string
  }>

  searchParams: Promise<
    Record<string, string | string[] | undefined> & {
      sortBy?: SortOptions
      page?: string
      optionValueIds?: string | string[]
    }
  >
}


/* =========================================================
   STATIC PARAMS
========================================================= */

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const regions = await listRegions()

  const countryCodes = regions
    .map((region: StoreRegion) =>
      region.countries
        ?.map((country) => country.iso_2)
        .filter(Boolean)
    )
    .flat()
    .filter(Boolean) as string[]

  const categoryHandles = product_categories
    .map(
      (category: HttpTypes.StoreProductCategory) =>
        category.handle
    )
    .filter(Boolean) as string[]

  return countryCodes
    .map((countryCode) =>
      categoryHandles.map((handle) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()
}


/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const params = await props.params

  const productCategory = await getCategoryByHandle(
    params.category
  )

  if (!productCategory) {
    notFound()
  }

  const title = productCategory.name

  const description =
    productCategory.description ||
    `Shop ${productCategory.name} at Arix Sports.`

  return {
    title: `${title} | Arix Sports`,
    description,

    alternates: {
      canonical: `/categories/${params.category.join("/")}`,
    },
  }
}


/* =========================================================
   CATEGORY PAGE
========================================================= */

export default async function CategoryPage(
  props: Props
) {
  const searchParams = await props.searchParams
  const params = await props.params

  const {
    sortBy,
    page,
  } = searchParams

  const optionValueIds =
    parseOptionValueIds(searchParams)

  /* Current category */
  const productCategory =
    await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  /* ALL categories for sidebar */
  const categories = await listCategories()

  return (
    <CategoryTemplate
      category={productCategory}
      categories={categories || []}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      optionValueIds={optionValueIds}
    />
  )
}