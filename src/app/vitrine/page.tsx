"use client"

import { useMemo, useState } from "react"
import { productData } from "@/domains/product/product.data"
import { ProductCard } from "@/components/ProductCard"
import { PaymentWarning } from "@/components/PaymentWarning"
import { Header } from "@/components/Header"

export default function VitrinePage() {
  const [search, setSearch] = useState("")
  const totalProducts = productData.length
  const soldProducts = productData.filter((product) => !product.isAvailable).length
  const availableProducts = totalProducts - soldProducts

  const normalizedSearch = search
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()

  const filteredProducts = useMemo(() => {
    if (!normalizedSearch) {
      return productData
    }

    return productData.filter((product) => {
      const normalizedName = product.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()

      return normalizedName.includes(normalizedSearch)
    })
  }, [normalizedSearch])

  return (
    <main className="min-h-screen bg-background">
      <Header maxWidthClass="max-w-7xl" />

      <PaymentWarning />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Vitrine de Produtos</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalProducts} produtos catalogados: {" "}
              <span className="rounded-full font-bold px-1.5 py-0.5 bg-red-50 text-red-500">
                {soldProducts} vendidos
              </span>
              , {" "}
              <span className="rounded-full font-bold px-1.5 py-0.5 bg-green-50 text-green-500">
                {availableProducts} disponíveis restantes
              </span>
            </p>
          </div>

          <input
            type="search"
            placeholder="Pesquisar por nome do produto..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20 sm:max-w-sm"
            aria-label="Pesquisar produtos por nome"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">
            Nenhum produto encontrado para "{search}".
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
