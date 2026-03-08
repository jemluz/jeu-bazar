"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ShoppingCart,
  Eye,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatPrice } from "@/domains/product/product.utils"
import { useWhatsApp } from "@/hooks/useWhatsApp"
import type { Product } from "@/domains/product/product.types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { openWhatsApp } = useWhatsApp()

  function handleBuy() {
    const productUrl = `${window.location.origin}/product/${product.id}`
    openWhatsApp(product.name, productUrl)
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        <Image
          src={product.urlPhoto}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2">
          {product.isAvailable ? (
            <Badge variant="success" className="gap-1">
              <CheckCircle className="h-3 w-3" />
              Disponível
            </Badge>
          ) : (
            <Badge variant="sold" className="gap-1">
              <XCircle className="h-3 w-3" />
              Vendido
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <User className="h-3.5 w-3.5" />
          <span>{product.supplier}</span>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={handleBuy}
          disabled={!product.isAvailable}
        >
          <ShoppingCart className="h-4 w-4" />
          Comprar
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/product/${product.id}`}>
            <Eye className="h-4 w-4" />
            Ver detalhes
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
