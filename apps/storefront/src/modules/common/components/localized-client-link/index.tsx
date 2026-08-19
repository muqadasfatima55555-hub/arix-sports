"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: unknown
}) => {
  const params = useParams()

  const countryCode = params?.countryCode as string | undefined

  /*
   * If countryCode exists:
   * / + countryCode + href
   *
   * Example:
   * /pk + /
   * = /pk/
   *
   * If countryCode doesn't exist:
   * use href directly.
   */

  const localizedHref = countryCode
    ? `/${countryCode}${href === "/" ? "" : href}`
    : href

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink