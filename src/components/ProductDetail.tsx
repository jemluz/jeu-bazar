"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ShoppingCart,
  User,
  Tag,
  Share2,
  Copy,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/domains/product/product.utils"
import { useWhatsApp } from "@/hooks/useWhatsApp"
import type { Product } from "@/domains/product/product.types"
import { AvailabilityBadge } from "./AvailabilityBadge"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { openWhatsApp } = useWhatsApp()
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [isCopied, setIsCopied] = useState(false)

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

  function openShareDialog() {
    const url = `${window.location.origin}/product/${product.id}`
    setShareUrl(url)
    setIsCopied(false)
    setIsShareDialogOpen(true)
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
    <div className="mx-auto max-w-5xl px-6 py-8">
      {/* Back link */}
      <Button variant="ghost" className="mb-6 -ml-2" asChild>
        <Link href="/vitrine">
          <ArrowLeft className="h-4 w-4" />
          Voltar à vitrine
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
          <Image
            src={currentPhoto}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
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

        {/* Details */}
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <AvailabilityBadge isAvailable={product.isAvailable} />
            <h2 className="text-3xl font-bold text-foreground">
              {product.name}
            </h2>

            <p className="text-4xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>

            <Card>
              <CardContent className="py-4 space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">
                    Fornecedor:
                  </span>
                  <span>{product.supplier}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">
                    Situação:
                  </span>
                  <span>
                    {product.isAvailable
                      ? "Disponível para compra"
                      : "Item já vendido"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full"
              onClick={handleBuy}
              disabled={!product.isAvailable}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.isAvailable
                ? "Reservar pelo WhatsApp"
                : "Produto Indisponível"}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={openShareDialog}
            >
              <Share2 className="h-5 w-5" />
              Compartilhar produto
            </Button>
          </div>
        </div>
      </div>

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
    </div>
  )
}
