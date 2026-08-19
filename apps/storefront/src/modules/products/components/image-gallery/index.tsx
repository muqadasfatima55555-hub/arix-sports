"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useEffect, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const validImages = images.filter((image) => image.url)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoom, setZoom] = useState(1)

  const currentImage = validImages[currentIndex]

  /*
   * ==========================================
   * NEXT IMAGE
   * ==========================================
   */

  const nextImage = () => {
    if (validImages.length <= 1) return

    setCurrentIndex((current) =>
      current === validImages.length - 1 ? 0 : current + 1
    )

    setZoom(1)
  }

  /*
   * ==========================================
   * PREVIOUS IMAGE
   * ==========================================
   */

  const previousImage = () => {
    if (validImages.length <= 1) return

    setCurrentIndex((current) =>
      current === 0 ? validImages.length - 1 : current - 1
    )

    setZoom(1)
  }

  /*
   * ==========================================
   * SELECT THUMBNAIL
   * ==========================================
   */

  const selectImage = (index: number) => {
    setCurrentIndex(index)
    setZoom(1)
  }

  /*
   * ==========================================
   * ZOOM
   * ==========================================
   */

  const zoomIn = () => {
    setZoom((current) => Math.min(current + 0.25, 2.5))
  }

  const zoomOut = () => {
    setZoom((current) => Math.max(current - 0.25, 1))
  }

  const resetZoom = () => {
    setZoom(1)
  }

  /*
   * ==========================================
   * KEYBOARD CONTROLS
   * ==========================================
   */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextImage()
      }

      if (event.key === "ArrowLeft") {
        previousImage()
      }

      if (event.key === "+") {
        zoomIn()
      }

      if (event.key === "-") {
        zoomOut()
      }

      if (event.key === "0") {
        resetZoom()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [validImages.length])

  if (!validImages.length) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#f5f6f8]">
        <p className="text-sm text-gray-400">
          No product image available
        </p>
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* ==========================================
          MAIN IMAGE
      ========================================== */}

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-white">
        <Image
          key={currentImage.id || currentIndex}
          src={currentImage.url!}
          alt={`Product image ${currentIndex + 1}`}
          fill
          priority={currentIndex === 0}
          sizes="(max-width: 1024px) 100vw, 760px"
          className="object-contain transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoom})`,
          }}
        />

        {/* ==========================================
            PREVIOUS BUTTON
        ========================================== */}

        {validImages.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous product image"
            className="
              absolute
              left-4
              top-1/2
              z-20
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-xl
              text-[#07101f]
              shadow-md
              transition
              hover:scale-105
              hover:bg-[#07101f]
              hover:text-white
            "
          >
            ←
          </button>
        )}

        {/* ==========================================
            NEXT BUTTON
        ========================================== */}

        {validImages.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next product image"
            className="
              absolute
              right-4
              top-1/2
              z-20
              flex
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-xl
              text-[#07101f]
              shadow-md
              transition
              hover:scale-105
              hover:bg-[#07101f]
              hover:text-white
            "
          >
            →
          </button>
        )}

        {/* ==========================================
            ZOOM CONTROLS
        ========================================== */}

        <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= 1}
            aria-label="Zoom out"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-lg
              font-medium
              text-[#07101f]
              shadow-md
              transition
              hover:bg-[#07101f]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            −
          </button>

          <button
            type="button"
            onClick={resetZoom}
            aria-label="Reset zoom"
            className="
              flex
              h-9
              min-w-[52px]
              items-center
              justify-center
              rounded-full
              bg-white
              px-3
              text-xs
              font-semibold
              text-[#07101f]
              shadow-md
              transition
              hover:bg-[#07101f]
              hover:text-white
            "
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= 2.5}
            aria-label="Zoom in"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white
              text-lg
              font-medium
              text-[#07101f]
              shadow-md
              transition
              hover:bg-[#07101f]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            +
          </button>
        </div>

        {/* ==========================================
            IMAGE COUNTER
        ========================================== */}

        {validImages.length > 1 && (
          <div
            className="
              absolute
              bottom-4
              left-1/2
              z-20
              -translate-x-1/2
              rounded-full
              bg-[#07101f]/90
              px-4
              py-1.5
              text-xs
              font-semibold
              tracking-wide
              text-white
            "
          >
            {currentIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* ==========================================
          THUMBNAILS
      ========================================== */}

      {validImages.length > 1 && (
        <div className="mt-4 flex shrink-0 items-center gap-3">
          <div className="flex min-w-0 flex-1 gap-3 overflow-x-auto pb-1">
            {validImages.map((image, index) => (
              <button
                key={image.id || index}
                type="button"
                onClick={() => selectImage(index)}
                aria-label={`View product image ${index + 1}`}
                className={`
                  relative
                  h-[88px]
                  w-[88px]
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  bg-white
                  transition-all
                  duration-200
                  ${
                    currentIndex === index
                      ? "border-2 border-[#07101f] shadow-sm"
                      : "border border-gray-200 hover:border-gray-400"
                  }
                `}
              >
                <Image
                  src={image.url!}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  sizes="88px"
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery