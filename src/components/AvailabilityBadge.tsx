import { CircleCheck, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AvailabilityBadgeProps {
  isAvailable: boolean
}

export function AvailabilityBadge({ isAvailable }: AvailabilityBadgeProps) {
  return isAvailable ? (
    <Badge
      variant="success"
      className="w-28 justify-center rounded-lg gap-1 bg-green-50 text-green-500 hover:bg-green-50 cursor-default"
    >
      <CircleCheck className="h-4 w-4" />
      DISPONÍVEL
    </Badge>
  ) : (
    <Badge variant="sold" className="w-28 justify-center rounded-lg gap-1 bg-red-50 text-red-500">
      <XCircle className="h-4 w-4" />
      VENDIDO
    </Badge>
  )
}
