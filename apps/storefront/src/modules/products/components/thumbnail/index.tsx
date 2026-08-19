import { Container, clx } from "@modules/common/components/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: { url?: string }[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <Container
      className={clx(
        "relative overflow-hidden rounded-lg bg-[#f8f8f8]",
        className,
        {
          // Premium square images
          "aspect-[4/5]": size === "full",
          "aspect-square": size === "square",
          "aspect-square": size === "large",
          "aspect-square": size === "medium",
          "aspect-square": size === "small",

          "w-[180px]": size === "small",
          "w-[300px]": size === "medium",
          "w-[420px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
}: {
  image?: string
}) => {
  return image ? (
    <Image
      src={image}
      alt="Product"
      fill
      quality={100}
      draggable={false}
      className="
        object-cover
        object-center
        transition-transform
        duration-500
        ease-out
        group-hover:scale-105
      "
      sizes="(max-width:768px)100vw, (max-width:1200px)50vw,25vw"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center bg-[#f5f5f5]">
      <PlaceholderImage size={24} />
    </div>
  )
}

export default Thumbnail