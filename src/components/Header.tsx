import { ShoppingBag } from "lucide-react"

interface HeaderProps {
  maxWidthClass?: string
}

export function Header({ maxWidthClass = "max-w-7xl" }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className={`mx-auto flex ${maxWidthClass} items-center gap-3`}>
        <ShoppingBag className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bazar da Jeu</h1>
          <p className="text-sm text-muted-foreground">
            Tudo é diferente quanto muda, e eu estou de mudança...{" "}
            <br />
            <strong>Corra</strong> que eu já estou correndo por aqui também!
          </p>
        </div>
      </div>
    </header>
  )
}
