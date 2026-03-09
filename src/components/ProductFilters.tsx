"use client"

import { CircleCheck, CircleX, RotateCcw, Search, Tag, Users } from "lucide-react"
import { Supplier } from "@/domains/product/product.types"

type StatusFilter = "all" | "sold" | "available"

const supplierFilterStyles: Record<Supplier, { active: string; inactive: string }> = {
  [Supplier.JEU]: {
    active: "border-pink-500 bg-pink-50 text-pink-600",
    inactive: "border-border bg-background text-foreground hover:border-pink-400 hover:text-pink-600",
  },
  [Supplier.LENI]: {
    active: "border-orange-500 bg-orange-50 text-orange-600",
    inactive: "border-border bg-background text-foreground hover:border-orange-400 hover:text-orange-600",
  },
  [Supplier.MIRIAM]: {
    active: "border-purple-500 bg-purple-50 text-purple-600",
    inactive: "border-border bg-background text-foreground hover:border-purple-400 hover:text-purple-600",
  },
}

interface ProductFiltersProps {
  statusFilter: StatusFilter
  selectedSuppliers: Supplier[]
  supplierOptions: Supplier[]
  search: string
  hasActiveFilters: boolean
  onStatusChange: (status: StatusFilter) => void
  onSupplierToggle: (supplier: Supplier) => void
  onSearchChange: (value: string) => void
  onClearFilters: () => void
}

export function ProductFilters({
  statusFilter,
  selectedSuppliers,
  supplierOptions,
  search,
  hasActiveFilters,
  onStatusChange,
  onSupplierToggle,
  onSearchChange,
  onClearFilters,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-start sm:gap-6">
      <div className="flex flex-col gap-4 sm:flex-1 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex flex-1 flex-col gap-2">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Tag className="h-4 w-4" />
            Filtrar por status
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onStatusChange("all")}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                statusFilter === "all"
                  ? "border-pink-500 bg-pink-50 text-pink-600"
                  : "border-border bg-background text-foreground hover:border-pink-400 hover:text-pink-600"
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => onStatusChange("available")}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition ${
                statusFilter === "available"
                  ? "border-green-500 bg-green-50 text-green-600"
                  : "border-border bg-background text-foreground hover:border-green-400 hover:text-green-600"
              }`}
            >
              <CircleCheck className="h-4 w-4" />
              Disponiveis
            </button>
            <button
              type="button"
              onClick={() => onStatusChange("sold")}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition ${
                statusFilter === "sold"
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-border bg-background text-foreground hover:border-red-400 hover:text-red-600"
              }`}
            >
              <CircleX className="h-4 w-4" />
              Vendidos
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Users className="h-4 w-4" />
            Filtrar por fornecedor
          </p>
          <div className="flex flex-wrap gap-2">
            {supplierOptions.map((supplier) => {
              const isSelected = selectedSuppliers.includes(supplier)
              const supplierStyle = supplierFilterStyles[supplier]

              return (
                <button
                  key={supplier}
                  type="button"
                  onClick={() => onSupplierToggle(supplier)}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    isSelected
                      ? supplierStyle.active
                      : supplierStyle.inactive
                  }`}
                >
                  {supplier}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Search className="h-4 w-4" />
            Filtrar por nome
          </p>
          <input
            type="search"
            placeholder="Pesquisar por nome do produto..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
            aria-label="Pesquisar produtos por nome"
          />
        </div>
      </div>

      <div className="sm:pt-7">
        <button
          type="button"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:border-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:text-muted-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          Limpar filtros
        </button>
      </div>
    </div>
  )
}
