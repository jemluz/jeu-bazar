import { notFound } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { productData } from "@/domains/product/product.data"
import { ProductDetail } from "@/components/ProductDetail"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = productData.find((p) => p.id === Number(id))

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bazar da Jeu</h1>
            <p className="text-sm text-muted-foreground">
              Produtos selecionados com carinho 💕
            </p>
          </div>
        </div>
      </header>

      <ProductDetail product={product} />
    </main>
  )
}
