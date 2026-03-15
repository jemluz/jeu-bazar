'use client';

import { useMemo, useState, Suspense } from 'react';
import { productData } from '@/domains/product/product.data';
import { Supplier } from '@/domains/product/product.types';
import { ProductCard } from '@/components/ProductCard';
import { PaymentWarning } from '@/components/PaymentWarning';
import {
  CircleCheck,
  CircleX,
  RotateCcw,
  Search,
  Tag,
  Users,
} from 'lucide-react';
import { supplierFilterStyles } from '@/domains/product/product.constants';
import { VitrineTitle } from '@/components/VitrineTitle';

type StatusFilter = 'all' | 'sold' | 'available';

export default function VitrinePage() {
  return (
    <Suspense>
      <VitrinePageContent />
    </Suspense>
  );
}

function VitrinePageContent() {
  // Estado local para filtros
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedSuppliers, setSelectedSuppliers] = useState<Supplier[]>([]);

  const supplierOptions = useMemo(
    () => Array.from(new Set(productData.map((product) => product.supplier))),
    [],
  );

  const normalizedSearch = search
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  const hasActiveFilters =
    statusFilter !== 'all' || selectedSuppliers.length > 0 || Boolean(search);

  function onSearchChange(value: string) {
    setSearch(value);
  }

  function onStatusChange(status: StatusFilter) {
    setStatusFilter(status);
  }

  function onSupplierToggle(supplier: Supplier) {
    setSelectedSuppliers((prev) => {
      if (prev.includes(supplier)) {
        return prev.filter((s) => s !== supplier);
      } else {
        return [...prev, supplier];
      }
    });
  }

  function onClearFilters() {
    setSearch('');
    setStatusFilter('all');
    setSelectedSuppliers([]);
  }

  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      const normalizedName = product.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch || normalizedName.includes(normalizedSearch);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'available' && product.isAvailable) ||
        (statusFilter === 'sold' && !product.isAvailable);

      const matchesSupplier =
        selectedSuppliers.length === 0 ||
        selectedSuppliers.includes(product.supplier);

      return matchesSearch && matchesStatus && matchesSupplier;
    });
  }, [normalizedSearch, selectedSuppliers, statusFilter]);

  return (
    <main className="min-h-screen bg-background">
      <PaymentWarning />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <VitrineTitle />

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
                  onClick={() => onStatusChange('all')}
                  className={`rounded-full border px-3 py-1 text-sm transition ${
                    statusFilter === 'all'
                      ? 'border-pink-500 bg-pink-50 text-pink-600'
                      : 'border-border bg-background text-foreground hover:border-pink-400 hover:text-pink-600'
                  }`}
                >
                  Todos
                </button>
                <button
                  type="button"
                  onClick={() => onStatusChange('available')}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition ${
                    statusFilter === 'available'
                      ? 'border-green-500 bg-green-50 text-green-600'
                      : 'border-border bg-background text-foreground hover:border-green-400 hover:text-green-600'
                  }`}
                >
                  <CircleCheck className="h-4 w-4" />
                  Disponiveis
                </button>
                <button
                  type="button"
                  onClick={() => onStatusChange('sold')}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition ${
                    statusFilter === 'sold'
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-border bg-background text-foreground hover:border-red-400 hover:text-red-600'
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
                  const isSelected = selectedSuppliers.includes(supplier);
                  const supplierStyle = supplierFilterStyles[supplier];

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
                  );
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
  );
}
