import { PaymentStatus, Supplier } from "./product.types"

export const SUPPLIER_STYLES: Record<Supplier, string> = {
  [Supplier.LENI]: "bg-orange-50 text-orange-500",
  [Supplier.JEU]: "bg-pink-50 text-pink-500",
  [Supplier.MIRIAM]: "bg-purple-50 text-purple-500",
}

export const PAID_STYLES: Record<PaymentStatus, string> = {
  [PaymentStatus.PAID]: "bg-blue-50 text-blue-500",
  [PaymentStatus.UNPAID]: "bg-gray-100 text-gray-500",
}