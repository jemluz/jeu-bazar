import { notFound } from "next/navigation"
import { productData } from "@/domains/product/product.data"
import { ProductDetail } from "@/components/ProductDetail"
import { PaymentWarning } from "@/components/PaymentWarning"
import { SoldWarning } from "@/components/SoldWarning"

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
      <PaymentWarning />

      {!product.isAvailable && <SoldWarning />}

      <ProductDetail product={product} />
    </main>
  )
}
