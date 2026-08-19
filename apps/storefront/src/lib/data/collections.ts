"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const retrieveCollection = async (
  id: string
): Promise<HttpTypes.StoreCollection | null> => {
  if (!id) {
    return null
  }

  const next = {
    ...(await getCacheOptions("collections")),
  }

  try {
    const { collection } = await sdk.client.fetch<{
      collection: HttpTypes.StoreCollection
    }>(`/store/collections/${id}`, {
      next,
      cache: "no-store",
    })

    return collection || null
  } catch (error) {
    console.error("Error retrieving collection:", error)
    return null
  }
}

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{
  collections: HttpTypes.StoreCollection[]
  count: number
}> => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  const params = {
    limit: "100",
    offset: "0",
    ...queryParams,
  }

  try {
    const response = await sdk.client.fetch<{
      collections: HttpTypes.StoreCollection[]
      count: number
    }>("/store/collections", {
      query: params,
      next,
      cache: "no-store",
    })

    return {
      collections: response.collections || [],
      count: response.count || 0,
    }
  } catch (error) {
    console.error("Error listing collections:", error)

    return {
      collections: [],
      count: 0,
    }
  }
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection | null> => {
  if (!handle) {
    return null
  }

  const next = {
    ...(await getCacheOptions("collections")),
  }

  try {
    const response =
      await sdk.client.fetch<HttpTypes.StoreCollectionListResponse>(
        "/store/collections",
        {
          query: {
            handle,
            fields: "*products",
            limit: "1",
          },
          next,
          cache: "no-store",
        }
      )

    return response.collections?.[0] || null
  } catch (error) {
    console.error(
      `Error getting collection with handle "${handle}":`,
      error
    )

    return null
  }
}