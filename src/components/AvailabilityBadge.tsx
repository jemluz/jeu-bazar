import { CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AvailabilityBadgeProps {
  isAvailable: boolean
}

export function AvailabilityBadge({ isAvailable }: AvailabilityBadgeProps) {
  return isAvailable ? (
    <Badge
      variant="success"
      className="rounded-lg gap-1 bg-green-50 text-green-500 hover:bg-green-50 cursor-default"
    >
      <CheckCircle className="h-3 w-3" />
      DISPONÍVEL
    </Badge>
  ) : (
    <Badge variant="sold" className="rounded-lg gap-1 bg-red-50 text-red-500">
      <XCircle className="h-3 w-3" />
      VENDIDO
    </Badge>
  )
}
