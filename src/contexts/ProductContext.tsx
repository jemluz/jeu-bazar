import { productData } from '@/domains/product/product.data';
import React, { createContext, useContext, useMemo } from 'react';

type ProductContextType = {
  totalProducts: number;
  soldProducts: number;
  availableProducts: number;
  // Adicione outros dados de produto aqui futuramente
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      'useProductContext deve ser usado dentro de um ProductProvider',
    );
  }
  return context;
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const totalProducts = useMemo(() => productData.length, []);
  const soldProducts = useMemo(
    () => productData.filter((product) => !product.isAvailable).length,
    [],
  );
  const availableProducts = useMemo(
    () => totalProducts - soldProducts,
    [totalProducts, soldProducts],
  );

  return (
    <ProductContext.Provider
      value={{ totalProducts, soldProducts, availableProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
}
