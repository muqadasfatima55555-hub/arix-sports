import { Metadata } from "next"

import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"

import Navbar from "@modules/home/components/navbar"
import Hero from "@modules/home/components/hero"
import CategoryShowcase from "@modules/home/components/category-showcase"
import NewArrivals from "@modules/home/components/new-arrivals"
import EditorialBanner from "@modules/home/components/editorial-banner"
import BestSellers from "@modules/home/components/best-sellers"
import CollectionBanner from "@modules/home/components/collection-banner"
import StoreFeatures from "@modules/home/components/store-features"
import Newsletter from "@modules/home/components/newsletter"
import Footer from "@modules/home/components/footer"

export const metadata: Metadata = {
  title: "Arix Sports - Engineered for Champions",
  description: "Performance sportswear built for the modern athlete.",
}

type HomeProps = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function Home({ params }: HomeProps) {
  const { countryCode } = await params

  // ==========================================
  // GET REGION
  // ==========================================

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // ==========================================
  // GET PRODUCT CATEGORIES
  // ==========================================

  const productCategories = await listCategories()

  // ==========================================
  // GET COLLECTIONS
  // ==========================================

  const { collections } = await listCollections({
    fields: "id,handle,title",
  })

  // ==========================================
  // FIND NEW ARRIVALS COLLECTION
  // ==========================================

  const newArrivalsCollection = collections?.find(
    (collection) => collection.handle === "new-arrivals"
  )

  // ==========================================
  // FIND BEST SELLERS COLLECTION
  // ==========================================

  const bestSellersCollection = collections?.find(
    (collection) => collection.handle === "best-sellers"
  )

  // ==========================================
  // GET NEW ARRIVALS PRODUCTS
  // ==========================================

  const { response: newArrivalsResponse } = await listProducts({
    queryParams: {
      limit: 4,
      offset: 0,
      is_giftcard: false,

      ...(newArrivalsCollection?.id
        ? {
            collection_id: [newArrivalsCollection.id],
          }
        : {}),
    },
    countryCode,
  })

  // ==========================================
  // GET BEST SELLERS PRODUCTS
  // ==========================================

  const { response: bestSellersResponse } = await listProducts({
    queryParams: {
      limit: 10,
      offset: 0,
      is_giftcard: false,

      ...(bestSellersCollection?.id
        ? {
            collection_id: [bestSellersCollection.id],
          }
        : {}),
    },
    countryCode,
  })

  // ==========================================
  // PRODUCTS
  // ==========================================

  const newArrivals = newArrivalsResponse?.products || []

  const bestSellers = bestSellersResponse?.products || []

  // ==========================================
  // HOME PAGE
  // ==========================================

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

     <Navbar product_categories={productCategories || []} />

      {/* =========================
          HERO
      ========================= */}

      <Hero />

      {/* =========================
          CATEGORY SHOWCASE
      ========================= */}

      <CategoryShowcase
        product_categories={productCategories || []}
      />

      {/* =========================
          NEW ARRIVALS
      ========================= */}

      <NewArrivals
        products={newArrivals}
        region={region}
      />

      {/* =========================
          EDITORIAL BANNER
      ========================= */}

      <EditorialBanner />

      {/* =========================
          BEST SELLERS
      ========================= */}

      <BestSellers
        products={bestSellers}
        region={region}
      />

      {/* =========================
          COLLECTION BANNER
      ========================= */}

      <CollectionBanner />

      {/* =========================
          STORE FEATURES
      ========================= */}

      <StoreFeatures />

      {/* =========================
          NEWSLETTER
      ========================= */}

      <Newsletter />

      {/* =========================
          FOOTER
      ========================= */}

      <Footer />
    </>
  )
}