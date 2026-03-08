export function PaymentWarning() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-8">
      <div className="rounded-xl border-2 border-amber-500 bg-amber-50 px-4 py-3 text-amber-900 shadow-sm">
        <h1 className="text-lg font-semibold sm:text-base">
          Atenção! Este site não realiza pagamentos!
        </h1>
        <p className="text-sm sm:text-base">
          Essa é apenas uma vitrine para o bazar.
          As negociações devem ser feitas diretamente com Dona Jeu.
        </p>
      </div>
    </section>
  )
}
