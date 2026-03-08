"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ShoppingCart,
  Eye,
  User,
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

  function handleBuy() {
    const productUrl = `${window.location.origin}/product/${product.id}`
    openWhatsApp(product.name, productUrl)
  }

  return (
    <Card className="flex flex-col overflow-hidden shadow-none">
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        <Image
          src={product.urlPhoto}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
