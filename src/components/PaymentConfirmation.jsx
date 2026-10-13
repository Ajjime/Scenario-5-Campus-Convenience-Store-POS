// PaymentConfirmation: the "success" message shown after a payment goes through.
// Later we will only show this after payment; for now it is always visible.

function PaymentConfirmation() {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
      {/* Check mark circle */}
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
        ✓
      </div>

      <h2 className="mt-3 text-lg font-semibold text-emerald-800">Payment Successful</h2>
      <p className="mt-1 text-sm text-emerald-700">Transaction #000000 · ₱0.00 paid by Cash</p>

      {/* Next-step buttons */}
      <div className="mt-4 flex justify-center gap-3">
        <button type="button" className="rounded-lg border border-emerald-600 px-4 py-2 text-sm text-emerald-700">
          Print Receipt
        </button>
        <button type="button" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white">
          New Order
        </button>
      </div>
    </section>
  )
}

export default PaymentConfirmation
