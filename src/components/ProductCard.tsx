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
  Share2,
  Copy,
  Check,
  X,
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
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [isCopied, setIsCopied] = useState(false)
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

  function openShareDialog() {
    const url = `${window.location.origin}/product/${product.id}`
    setShareUrl(url)
    setIsCopied(false)
    setIsShareDialogOpen(true)
  }

  async function handleCopyShareLink() {
    if (!shareUrl) {
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setIsCopied(true)
      return
    } catch {
      const fallbackInput = document.createElement("input")
      fallbackInput.value = shareUrl
      document.body.appendChild(fallbackInput)
      fallbackInput.select()
      document.execCommand("copy")
      document.body.removeChild(fallbackInput)
      setIsCopied(true)
    }
  }

  return (
    <>
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
          <Button
            variant="outline"
            className="w-full cursor-pointer hover:bg-transparent"
            onClick={openShareDialog}
          >
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
        </CardFooter>
      </Card>

      {isShareDialogOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsShareDialogOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`share-dialog-title-${product.id}`}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-lg border border-border bg-background p-4 shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 id={`share-dialog-title-${product.id}`} className="text-base font-semibold text-foreground">
                Compartilhar produto
              </h3>
              <button
                type="button"
                aria-label="Fechar compartilhamento"
                onClick={() => setIsShareDialogOpen(false)}
                className="rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <label className="mb-2 block text-sm font-medium text-foreground" htmlFor={`share-link-${product.id}`}>
              Link do produto
            </label>
            <input
              id={`share-link-${product.id}`}
              type="text"
              readOnly
              value={shareUrl}
              className="mb-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none"
            />

            <Button onClick={handleCopyShareLink} className="w-full">
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {isCopied ? "Link copiado" : "Copiar link"}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  )
}
