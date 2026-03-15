import { useProductContext } from '@/contexts/ProductContext';

export function VitrineTitle() {
  return (
    <div className="mb-6 flex flex-col gap-3">
      <h2 className="text-xl font-bold text-foreground">Vitrine de Produtos</h2>
      <CatalogCounter />
    </div>
  );
}

export function CatalogCounter() {
  const { totalProducts, soldProducts, availableProducts } =
    useProductContext();

  return (
    <div className="flex flex-col md:flex-row mt-1 text-sm text-muted-foreground">
      <p className="ml-2">
        <strong>{totalProducts}</strong> produtos catalogados:{' '}
      </p>

      <div className="mt-2 md:mt-0">
        <span className="rounded-full font-bold px-1.5 py-0.5 bg-red-50 text-red-500">
          {soldProducts} vendidos
        </span>
        ,{' '}
        <span className="rounded-full font-bold px-1.5 py-0.5 bg-green-50 text-green-500">
          {availableProducts} disponíveis restantes
        </span>
      </div>
    </div>
  );
}
