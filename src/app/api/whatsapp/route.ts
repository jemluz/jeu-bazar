import { NextRequest, NextResponse } from "next/server"
import { buildWhatsAppUrl } from "@/domains/product/product.utils"

export function GET(request: NextRequest) {
  const phoneNumber = process.env.WHATSAPP_NUMBER

  if (!phoneNumber) {
    return NextResponse.json(
      { error: "WHATSAPP_NUMBER não configurado" },
      { status: 500 }
    )
  }

  const productName = request.nextUrl.searchParams.get("productName")
  const productUrl = request.nextUrl.searchParams.get("productUrl")

  if (!productName || !productUrl) {
    return NextResponse.json(
      { error: "Parâmetros obrigatórios ausentes" },
      { status: 400 }
    )
  }

  const redirectUrl = buildWhatsAppUrl(phoneNumber, productName, productUrl)
  return NextResponse.redirect(redirectUrl)
}
