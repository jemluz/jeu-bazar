import { Product, Supplier } from "./product.types"

export const productData: Product[] = [
  {
    id: 1,
    urlPhoto: "/product-photos/placeholder.svg",
    name: "Bolsa de Couro Marrom",
    isAvailable: true,
    supplier: Supplier.JEU,
    price: 4500,
  },
  {
    id: 2,
    urlPhoto: "/product-photos/placeholder.svg",
    name: "Vestido Floral Rosa",
    isAvailable: true,
    supplier: Supplier.LENI,
    price: 8000,
  },
  {
    id: 3,
    urlPhoto: "/product-photos/placeholder.svg",
    name: "Colar Dourado",
    isAvailable: false,
    supplier: Supplier.MIRIAM,
    price: 2500,
  },
  {
    id: 4,
    urlPhoto: "/product-photos/placeholder.svg",
    name: "Sapato Scarpin Vermelho",
    isAvailable: true,
    supplier: Supplier.JEU,
    price: 12000,
  },
  {
    id: 5,
    urlPhoto: "/product-photos/placeholder.svg",
    name: "Lenço Estampado",
    isAvailable: true,
    supplier: Supplier.LENI,
    price: 1500,
  },
  {
    id: 6,
    urlPhoto: "/product-photos/placeholder.svg",
    name: "Óculos de Sol Retrô",
    isAvailable: false,
    supplier: Supplier.MIRIAM,
    price: 3500,
  },
]
