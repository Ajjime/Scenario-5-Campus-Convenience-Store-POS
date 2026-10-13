// PaymentConfirmation: the "success" panel shown right after a payment goes through.
// It reads the saved sale from App and has the New Transaction button.

import { formatPrice } from '../utils/formatPrice'

function PaymentConfirmation({ sale, onNewTransaction }) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="text-center">
        {/* Check mark circle */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
          ✓
        </div>
        <h2 className="mt-3 text-lg font-semibold text-emerald-800">Payment Successful</h2>
      </div>

      {/* Sale details: label on the left, value on the right */}
      <dl className="mx-auto mt-4 max-w-sm space-y-1 text-sm text-emerald-900">
        <div className="flex justify-between">
          <dt>Transaction No.</dt>
          <dd className="font-mono">{sale.transactionNumber}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Date & Time</dt>
          <dd>{sale.dateTime}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Total Amount</dt>
          <dd>{formatPrice(sale.total)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Amount Paid</dt>
          <dd>{formatPrice(sale.amountPaid)}</dd>
        </div>
        <div className="flex justify-between border-t border-emerald-200 pt-2 text-base font-bold">
          <dt>Change</dt>
          <dd>{formatPrice(sale.change)}</dd>
        </div>
      </dl>

      {/* Resets everything for the next customer (handled in App) */}
      <div className="mt-5 text-center">
        <button
          type="button"
          onClick={onNewTransaction}
          className="rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white hover:bg-emerald-700"
        >
          New Transaction
        </button>
      </div>
    </section>
  )
}

export default PaymentConfirmation
