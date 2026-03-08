"use client"

import { useCallback } from "react"
import { buildWhatsAppUrl } from "@/domains/product/product.utils"

const JEU_WHATSAPP_NUMBER = "5511999999999" // TODO: replace with real number

export function useWhatsApp() {
  const openWhatsApp = useCallback(
    (productName: string, productUrl: string) => {
      const url = buildWhatsAppUrl(
        JEU_WHATSAPP_NUMBER,
        productName,
        productUrl
      )
      window.open(url, "_blank", "noopener,noreferrer")
    },
    []
  )

  return { openWhatsApp }
}
