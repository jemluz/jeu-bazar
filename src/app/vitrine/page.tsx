"use client"

import { useMemo, useEffect, useCallback, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { productData } from "@/domains/product/product.data"
import { Supplier } from "@/domains/product/product.types"
import { ProductFilters } from "@/components/ProductFilters"
import { ProductCard } from "@/components/ProductCard"
import { PaymentWarning } from "@/components/PaymentWarning"
import { Header } from "@/components/Header"

type StatusFilter = "all" | "sold" | "available"

export default function VitrinePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Inicializa os filtros a partir da URL
  const searchFromUrl = searchParams.get("search") || ""
  const statusFilter = (searchParams.get("status") as StatusFilter) || "all"
  const selectedSuppliers = searchParams.getAll("supplier") as Supplier[]

  // Estado local para o campo de busca
  const [search, setSearch] = useState(searchFromUrl)

  // Sincroniza o estado local com a URL ao mudar a query string externamente
  useEffect(() => {
    setSearch(searchFromUrl)
  }, [searchFromUrl])
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


  // Função para atualizar a URL com os filtros
  const updateFilters = useCallback((filters: {
    search?: string
    status?: StatusFilter
    suppliers?: Supplier[]
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    if (filters.search !== undefined) {
      if (filters.search) {
        params.set("search", filters.search)
      } else {
        params.delete("search")
      }
    }
    if (filters.status !== undefined) {
      if (filters.status && filters.status !== "all") {
        params.set("status", filters.status)
      } else {
        params.delete("status")
      }
    }
    if (filters.suppliers !== undefined) {
      params.delete("supplier")
      filters.suppliers.forEach((s) => params.append("supplier", s))
    }
    router.replace(`?${params.toString()}`)
  }, [router, searchParams])

  function onStatusChange(status: StatusFilter) {
    updateFilters({ status })
  }

  function onSupplierToggle(supplier: Supplier) {
    const current = new Set(selectedSuppliers)
    if (current.has(supplier)) {
      current.delete(supplier)
    } else {
      current.add(supplier)
    }
    updateFilters({ suppliers: Array.from(current) as Supplier[] })
  }

  // onSearchChange agora aceita um segundo argumento: forceUpdate
  function onSearchChange(value: string, forceUpdate = false) {
    setSearch(value)
    if (forceUpdate) {
      updateFilters({ search: value })
    }
  }

  function onClearFilters() {
    updateFilters({ search: "", status: "all", suppliers: [] })
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
          onStatusChange={onStatusChange}
          onSupplierToggle={onSupplierToggle}
          onSearchChange={onSearchChange}
          onClearFilters={onClearFilters}
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
