/**
 * Converts a price in cents to a formatted BRL currency string.
 * @example formatPrice(1100) => "R$ 11,00"
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100)
}

/**
 * Builds the WhatsApp URL with a pre-filled message for a product.
 * @param phoneNumber - WhatsApp phone number with country code (digits only)
 * @param productName - Name of the product
 * @param productUrl - URL of the product detail page
 */
export function buildWhatsAppUrl(
  phoneNumber: string,
  productName: string,
  productUrl: string
): string {
  const message = encodeURIComponent(
    `Olá Dona Jeu! Tenho interesse no produto "${productName}" 😊\n${productUrl}`
  )
  return `https://wa.me/${phoneNumber}?text=${message}`
}
