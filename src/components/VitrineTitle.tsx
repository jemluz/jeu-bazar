import { useProductContext } from '@/contexts/ProductContext';
import { Badge } from './ui/badge';

export function VitrineTitle() {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <h2 className="text-xl font-bold text-foreground ml-1">
        Vitrine de Produtos
      </h2>
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

      <div className="ml-2 mt-2 md:mt-0">
        <Badge
          variant="destructive"
          className="rounded-full bg-red-50 text-red-500 font-bold no-hover-badge hover:none"
        >
          {soldProducts} vendidos
        </Badge>
        ,{' '}
        <Badge
          variant="secondary"
          className="rounded-full bg-green-50 text-green-500 font-bold no-hover-badge hover:none"
        >
          {availableProducts} disponíveis restantes
        </Badge>
      </div>
    </div>
  );
}
