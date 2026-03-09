"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ShoppingCart,
  Eye,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AvailabilityBadge } from "@/components/AvailabilityBadge"
import { formatPrice } from "@/domains/product/product.utils"
import { useWhatsApp } from "@/hooks/useWhatsApp"
import { Supplier, type Product } from "@/domains/product/product.types"

const supplierStyles: Record<Supplier, string> = {
  [Supplier.LENI]: "bg-orange-50 text-orange-500",
  [Supplier.JEU]: "bg-pink-50 text-pink-500",
  [Supplier.MIRIAM]: "bg-purple-50 text-purple-500",
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { openWhatsApp } = useWhatsApp()
  const photos = useMemo(
    () => (Array.isArray(product.urlPhoto) ? product.urlPhoto : [product.urlPhoto]),
    [product.urlPhoto]
  )
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const hasPhotoSlide = photos.length > 1

  const currentPhoto = photos[activePhotoIndex] ?? "/product-photos/placeholder.svg"

  function handleBuy() {
    const productUrl = `${window.location.origin}/product/${product.id}`
    openWhatsApp(product.name, productUrl)
  }

  function goToPreviousPhoto() {
    setActivePhotoIndex((currentIndex) =>
      currentIndex === 0 ? photos.length - 1 : currentIndex - 1
    )
  }

  function goToNextPhoto() {
    setActivePhotoIndex((currentIndex) =>
      currentIndex === photos.length - 1 ? 0 : currentIndex + 1
    )
  }

  return (
    <Card className="flex flex-col overflow-hidden shadow-none">
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        <Image
          src={currentPhoto}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {hasPhotoSlide ? (
          <>
            <button
              type="button"
              onClick={goToPreviousPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/60"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={goToNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/60"
              aria-label="Próxima foto"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
              {photos.map((photo, index) => (
                <button
                  key={`${product.id}-${photo}-${index}`}
                  type="button"
                  onClick={() => setActivePhotoIndex(index)}
                  className={`h-2 w-2 rounded-full transition ${
                    index === activePhotoIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Ir para foto ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <CardHeader className="pb-2">
        <div className="top-2">
          <AvailabilityBadge isAvailable={product.isAvailable} />
        </div>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          Fornecedor:{" "}
          <span
            className={`rounded-lg px-2 py-0.5 text-xs font-medium ${supplierStyles[product.supplier]}`}
          >
            {product.supplier}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col gap-2">
        <Button
          className="w-full hover:bg-pink-600 cursor-pointer"
          onClick={handleBuy}
          disabled={!product.isAvailable}
        >
          <ShoppingCart className="h-4 w-4" />
          Reservar
        </Button>
        <Button variant="outline" className="w-full hover:text-pink-500 cursor-pointer hover:bg-transparent hover:border-pink-500" asChild>
          <Link href={`/product/${product.id}`}>
            <Eye className="h-4 w-4" />
            Ver detalhes
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
