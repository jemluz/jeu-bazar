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

export const supplierFilterStyles: Record<Supplier, { active: string; inactive: string }> = {
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
