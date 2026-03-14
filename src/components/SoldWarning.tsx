export function SoldWarning() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-4">
      <div className="rounded-xl border-2 border-red-500 bg-red-50 px-4 py-3 text-red-900 shadow-sm">
        <h1 className="text-lg font-semibold sm:text-base">
          Sinto muito, mas este produto já foi vendido!
        </h1>
        <p className="text-sm sm:text-base">
          Não se preocupe, temos muitos outros itens incríveis disponíveis. Continue navegando para encontrar algo que você goste!
        </p>
      </div>
    </section>
  )
}
