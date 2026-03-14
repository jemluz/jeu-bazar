type CatalogCounterProps = {
  totalProducts: number;
  soldProducts: number;
  availableProducts: number;
};

export function CatalogCounter({
  totalProducts,
  soldProducts,
  availableProducts,
}: CatalogCounterProps) {
  return (
    <p className="mt-1 text-sm text-muted-foreground">
      {totalProducts} produtos catalogados:{' '}
      <span className="rounded-full font-bold px-1.5 py-0.5 bg-red-50 text-red-500">
        {soldProducts} vendidos
      </span>
      ,{' '}
      <span className="rounded-full font-bold px-1.5 py-0.5 bg-green-50 text-green-500">
        {availableProducts} disponíveis restantes
      </span>
    </p>
  );
}
