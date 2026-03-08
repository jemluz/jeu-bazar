"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  XCircle,
  User,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/domains/product/product.utils"
import { useWhatsApp } from "@/hooks/useWhatsApp"
import type { Product } from "@/domains/product/product.types"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { openWhatsApp } = useWhatsApp()

  function handleBuy() {
    const productUrl = `${window.location.origin}/product/${product.id}`
    openWhatsApp(product.name, productUrl)
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
            src={product.urlPhoto}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute top-4 left-4">
            {product.isAvailable ? (
              <Badge variant="success" className="gap-1 text-sm px-3 py-1">
                <CheckCircle className="h-4 w-4" />
                Disponível
              </Badge>
            ) : (
              <Badge variant="sold" className="gap-1 text-sm px-3 py-1">
                <XCircle className="h-4 w-4" />
                Vendido
              </Badge>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
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

          <Button
            size="lg"
            className="w-full"
            onClick={handleBuy}
            disabled={!product.isAvailable}
          >
            <ShoppingCart className="h-5 w-5" />
            {product.isAvailable
              ? "Comprar pelo WhatsApp"
              : "Produto Indisponível"}
          </Button>
        </div>
      </div>
    </div>
  )
}
