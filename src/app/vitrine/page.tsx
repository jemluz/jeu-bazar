"use client"

import { useMemo, useState } from "react"
import { productData } from "@/domains/product/product.data"
import { Supplier } from "@/domains/product/product.types"
import { ProductFilters } from "@/components/ProductFilters"
import { ProductCard } from "@/components/ProductCard"
import { PaymentWarning } from "@/components/PaymentWarning"
import { Header } from "@/components/Header"

type StatusFilter = "all" | "sold" | "available"

export default function VitrinePage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [selectedSuppliers, setSelectedSuppliers] = useState<Supplier[]>([])
  const totalProducts = productData.length
  const soldProducts = productData.filter((product) => !product.isAvailable).length
  const availableProducts = totalProducts - soldProducts
  const supplierOptions = useMemo(
    () => Array.from(new Set(productData.map((product) => product.supplier))),
    []
  )

  const normalizedSearch = search
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
  const hasActiveFilters = statusFilter !== "all" || selectedSuppliers.length > 0 || Boolean(search)

  function toggleSupplier(supplier: Supplier) {
    setSelectedSuppliers((currentSuppliers) =>
      currentSuppliers.includes(supplier)
        ? currentSuppliers.filter((currentSupplier) => currentSupplier !== supplier)
        : [...currentSuppliers, supplier]
    )
  }

  function clearFilters() {
    setSearch("")
    setStatusFilter("all")
    setSelectedSuppliers([])
  }

  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      const normalizedName = product.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()

      const matchesSearch = !normalizedSearch || normalizedName.includes(normalizedSearch)
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "available" && product.isAvailable) ||
        (statusFilter === "sold" && !product.isAvailable)
      const matchesSupplier =
        selectedSuppliers.length === 0 || selectedSuppliers.includes(product.supplier)

      return matchesSearch && matchesStatus && matchesSupplier
    })
  }, [normalizedSearch, selectedSuppliers, statusFilter])

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
        </div>

        <ProductFilters
          statusFilter={statusFilter}
          selectedSuppliers={selectedSuppliers}
          supplierOptions={supplierOptions}
          search={search}
          hasActiveFilters={hasActiveFilters}
          onStatusChange={setStatusFilter}
          onSupplierToggle={toggleSupplier}
          onSearchChange={setSearch}
          onClearFilters={clearFilters}
        />

        {filteredProducts.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">
            Nenhum produto encontrado para &quot;{search}&quot;.
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
