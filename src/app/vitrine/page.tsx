import { productData } from "@/domains/product/product.data"
import { ProductCard } from "@/components/ProductCard"
import { PaymentWarning } from "@/components/PaymentWarning"
import { Header } from "@/components/Header"

export default function VitrinePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header maxWidthClass="max-w-7xl" />

      <PaymentWarning />

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Vitrine de Produtos
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}
