// PaymentConfirmation: the "success" panel shown right after a payment goes through.
// It reads the saved sale from App and has the New Transaction button.

import { formatPrice } from '../utils/formatPrice'

function PaymentConfirmation({ sale, onNewTransaction }) {
  return (
    // animate-scale-in: the panel grows in slightly when it appears
    <section className="animate-scale-in rounded-2xl border border-brand-200 bg-linear-to-br from-brand-50 via-white to-amber-50 p-6 shadow-sm">
      <div className="text-center">
        {/* Animated checkmark: the circle grows in, then the tick "draws" itself.
            strokeDasharray/animate-draw: the line starts hidden and is revealed bit by bit. */}
        <div className="mx-auto flex h-16 w-16 animate-scale-in items-center justify-center rounded-full bg-brand-600 shadow-lg shadow-brand-600/30">
          <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" aria-hidden="true">
            <path
              d="M6.5 12.5l3.5 3.5 7.5-8"
              stroke="white"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="24"
              className="animate-draw"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-extrabold text-brand-900">Payment Successful</h2>
        <p className="mt-1 text-sm text-slate-600">The receipt is ready below.</p>
      </div>

      {/* Sale details: label on the left, value on the right */}
      <dl className="mx-auto mt-5 max-w-sm space-y-2 rounded-xl bg-white/70 p-4 text-sm text-slate-700 ring-1 ring-brand-100">
        <div className="flex justify-between gap-4">
          <dt>Transaction No.</dt>
          <dd className="font-mono font-semibold text-slate-900">{sale.transactionNumber}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Date & Time</dt>
          <dd className="text-right text-slate-900">{sale.dateTime}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Total Amount</dt>
          <dd className="tabular-nums text-slate-900">{formatPrice(sale.total)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Amount Paid</dt>
          <dd className="tabular-nums text-slate-900">{formatPrice(sale.amountPaid)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-brand-100 pt-2 text-base font-extrabold text-brand-800">
          <dt>Change</dt>
          <dd className="tabular-nums">{formatPrice(sale.change)}</dd>
        </div>
      </dl>

      {/* Resets everything for the next customer (handled in App) */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onNewTransaction}
          className="rounded-xl bg-brand-700 px-8 py-3 font-bold text-white shadow-md shadow-brand-900/20 transition hover:bg-brand-800 active:scale-95"
        >
          New Transaction
        </button>
      </div>
    </section>
  )
}

export default PaymentConfirmation
