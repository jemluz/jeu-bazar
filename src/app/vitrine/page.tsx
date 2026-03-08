import { ShoppingBag } from "lucide-react"
import { productData } from "@/domains/product/product.data"
import { ProductCard } from "@/components/ProductCard"

export default function VitrinePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bazar da Jeu</h1>
            <p className="text-sm text-muted-foreground">
              Tudo é diferente quanto muda, e eu estou de mudança... <strong>Corra</strong> que eu já estou correndo por aqui também!
            </p>
          </div>
        </div>
      </header>

      {/* Aviso importante */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="rounded-xl border-2 border-amber-500 bg-amber-50 px-4 py-3 text-amber-900 shadow-sm">
          <h1 className="text-lg font-semibold sm:text-base">Atenção! Este site não realiza pagamentos!</h1>
          <p className="text-sm sm:text-base">
            Essa é apenas uma vitrine para o bazar.
            As negociações devem ser feitas diretamente com Dona Jeu.
          </p>
          
        </div>
      </section>

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
