import { notFound } from "next/navigation"
import { productData } from "@/domains/product/product.data"
import { ProductDetail } from "@/components/ProductDetail"
import { PaymentWarning } from "@/components/PaymentWarning"
import { Header } from "@/components/Header"

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
      <Header maxWidthClass="max-w-5xl" />

      <PaymentWarning />
      

      <ProductDetail product={product} />
    </main>
  )
}
