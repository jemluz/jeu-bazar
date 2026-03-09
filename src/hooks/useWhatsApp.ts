"use client"

import { useCallback } from "react"

export function useWhatsApp() {
  const openWhatsApp = useCallback(
    (productName: string, productUrl: string) => {
      const query = new URLSearchParams({ productName, productUrl })
      const url = `/api/whatsapp?${query.toString()}`
      window.open(url, "_blank", "noopener,noreferrer")
    },
    []
  )

  return { openWhatsApp }
}
