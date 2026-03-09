export enum Supplier {
  JEU = "Jeu",
  LENI = "Leni",
  MIRIAM = "Miriam",
}

export enum PaymentStatus {
  PAID = "Pago",
  UNPAID = "Não pago",
}
export interface Product {
  id: number
  urlPhoto: string | string[]
  name: string
  isAvailable: boolean
  isPaid: boolean
  supplier: Supplier
  /** Price stored in cents (e.g. 1100 = R$ 11,00) */
  price: number
  purchaser: string
}
