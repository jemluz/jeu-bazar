"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/Header"
import { ProductFilters } from "@/components/ProductFilters"
import { PAID_STYLES, SUPPLIER_STYLES } from "@/domains/product/product.constants"
import { productData } from "@/domains/product/product.data"
import { PaymentStatus, type Product, type Supplier } from "@/domains/product/product.types"
import { formatPrice } from "@/domains/product/product.utils"
import { AvailabilityBadge } from "@/components/AvailabilityBadge"

type StatusFilter = "all" | "sold" | "available"
type PageSize = 20 | 50 | 100 | "all"

const PAGE_SIZE_OPTIONS: PageSize[] = [20, 50, 100, "all"]

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function getPrimaryPhoto(urlPhoto: Product["urlPhoto"]): string {
  if (Array.isArray(urlPhoto)) {
    return urlPhoto[0] ?? "/product-photos/placeholder.svg"
  }

  return urlPhoto
}

export default function ControlePage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [selectedSuppliers, setSelectedSuppliers] = useState<Supplier[]>([])
  const [pageSize, setPageSize] = useState<PageSize>(20)
  const [requestedPage, setRequestedPage] = useState(1)
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null)

  const supplierOptions = useMemo(
    () => Array.from(new Set(productData.map((product) => product.supplier))),
    []
  )

  const normalizedSearch = useMemo(() => normalizeText(search), [search])
  const hasActiveFilters = statusFilter !== "all" || selectedSuppliers.length > 0 || Boolean(search)

  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      const normalizedName = normalizeText(product.name)
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

  const totalPrice = useMemo(
    () => filteredProducts.reduce((sum, product) => sum + product.price, 0),
    [filteredProducts]
  )

  const totalPages = useMemo(() => {
    if (pageSize === "all") {
      return 1
    }

    return Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  }, [filteredProducts.length, pageSize])

  const currentPage = pageSize === "all" ? 1 : Math.min(requestedPage, totalPages)

  const visibleProducts = useMemo(() => {
    if (pageSize === "all") {
      return filteredProducts
    }

    const startIndex = (currentPage - 1) * pageSize
    return filteredProducts.slice(startIndex, startIndex + pageSize)
  }, [currentPage, filteredProducts, pageSize])

  function toggleSupplier(supplier: Supplier) {
    setRequestedPage(1)
    setSelectedSuppliers((currentSuppliers) =>
      currentSuppliers.includes(supplier)
        ? currentSuppliers.filter((item) => item !== supplier)
        : [...currentSuppliers, supplier]
    )
  }

  function clearFilters() {
    setRequestedPage(1)
    setSearch("")
    setStatusFilter("all")
    setSelectedSuppliers([])
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-5 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-foreground">Controle de Produtos</h2>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} item(ns) após filtro. Total dos preços: {formatPrice(totalPrice)}
          </p>
        </div>

        <ProductFilters
          statusFilter={statusFilter}
          selectedSuppliers={selectedSuppliers}
          supplierOptions={supplierOptions}
          search={search}
          hasActiveFilters={hasActiveFilters}
          onStatusChange={(status) => {
            setRequestedPage(1)
            setStatusFilter(status)
          }}
          onSupplierToggle={toggleSupplier}
          onSearchChange={(value) => {
            setRequestedPage(1)
            setSearch(value)
          }}
          onClearFilters={clearFilters}
        />

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-muted/40 text-left text-foreground">
              <tr>
                <th className="border-b border-border px-3 py-2 font-semibold">ID</th>
                <th className="border-b border-border px-3 py-2 font-semibold">Foto</th>
                <th className="border-b border-border px-3 py-2 font-semibold">Nome</th>
                <th className="border-b border-border px-3 py-2 font-semibold">Disponibilidade</th>
                <th className="border-b border-border px-3 py-2 font-semibold">Pago</th>
                <th className="border-b border-border px-3 py-2 font-semibold">Fornecedor</th>
                <th className="border-b border-border px-3 py-2 font-semibold">Preço</th>
                <th className="border-b border-border px-3 py-2 font-semibold">Comprador</th>
              </tr>
            </thead>

            <tbody>
              {visibleProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-muted-foreground">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                visibleProducts.map((product) => (
                  <tr key={product.id} className="odd:bg-background even:bg-muted/20">
                    <td className="border-b border-border px-3 py-2">{product.id}</td>

                    <td className="border-b border-border px-3 py-2">
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImage({
                            src: getPrimaryPhoto(product.urlPhoto),
                            alt: product.name || `Produto ${product.id}`,
                          })
                        }
                        className="rounded-md border border-border px-2 py-1 text-xs transition hover:border-foreground hover:text-foreground"
                      >
                        Ver foto
                      </button>
                    </td>

                    <td className="border-b border-border px-3 py-2">{product.name || "-"}</td>

                    <td className="border-b border-border px-3 py-2">
                      <AvailabilityBadge isAvailable={product.isAvailable} />
                    </td>

                    <td className="border-b border-border px-3 py-2"><span
                        className={`rounded-lg px-2 py-0.5 text-xs font-medium ${PAID_STYLES[product.isPaid ? PaymentStatus.PAID : PaymentStatus.UNPAID]}`}
                      >
                        {product.isPaid ? PaymentStatus.PAID : PaymentStatus.UNPAID}
                      </span></td>

                    <td className="border-b border-border px-3 py-2">
                      <span
                        className={`rounded-lg px-2 py-0.5 text-xs font-medium ${SUPPLIER_STYLES[product.supplier]}`}
                      >
                        {product.supplier}
                      </span>
                    </td>
                    
                    <td className="border-b border-border px-3 py-2">{formatPrice(product.price)}</td>

                    <td className="border-b border-border px-3 py-2">{product.purchaser || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>

            <tfoot>
              <tr className="bg-muted/40">
                <td colSpan={6} className="px-3 py-2 text-right font-semibold text-foreground">
                  Total (filtro atual)
                </td>
                <td className="px-3 py-2 font-semibold text-foreground">{formatPrice(totalPrice)}</td>
                <td className="px-3 py-2" />
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <span className="text-sm text-muted-foreground">
            Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setRequestedPage((page) => Math.max(1, page - 1))}
            disabled={currentPage <= 1 || pageSize === "all"}
            className="rounded-md border border-border px-3 py-1.5 text-sm transition hover:border-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          <button
            type="button"
            onClick={() => setRequestedPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage >= totalPages || pageSize === "all"}
            className="rounded-md border border-border px-3 py-1.5 text-sm transition hover:border-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Próxima
          </button>

          <label className="inline-flex items-center gap-2 text-sm text-foreground ml-8" htmlFor="page-size-select">
            Itens por página
            <select
              id="page-size-select"
              value={pageSize}
              onChange={(event) => {
                const value = event.target.value
                setRequestedPage(1)
                setPageSize(value === "all" ? "all" : Number(value) as PageSize)
              }}
              className="rounded-md border border-input bg-background px-2 py-1"
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "Todos" : option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {previewImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Pré-visualização da imagem do produto"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl rounded-lg bg-background p-4 shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{previewImage.alt}</p>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="rounded-md border border-border px-2 py-1 text-xs hover:border-foreground"
              >
                Fechar
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted/40">
              <Image
                src={previewImage.src}
                alt={previewImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
