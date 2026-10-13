// Receipt: a paper-style record of the finished sale.
// Everything comes from the saved sale in App, so it never changes after payment.

import { formatPrice } from '../utils/formatPrice'

function Receipt({ sale }) {
  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-5 font-mono text-sm shadow-sm">
      {/* Store header with transaction number and date/time */}
      <div className="text-center">
        <h2 className="text-base font-bold">CAMPUS CONVENIENCE STORE</h2>
        <p className="text-xs text-slate-500">Official Receipt</p>
        <p className="mt-2 text-xs">Txn No.: {sale.transactionNumber}</p>
        <p className="text-xs">{sale.dateTime}</p>
      </div>

      {/* One block per item: name on one line, then "qty x unit price" and the subtotal.
          Dashed borders make it look like a paper receipt. */}
      <ul className="my-3 space-y-2 border-y border-dashed border-slate-300 py-3">
        {sale.items.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p className="flex justify-between text-slate-600">
              <span>
                {item.quantity} x {formatPrice(item.price)}
              </span>
              <span className="text-slate-900">{formatPrice(item.price * item.quantity)}</span>
            </p>
          </li>
        ))}
      </ul>

      {/* Money totals */}
      <div className="space-y-1">
        <p className="flex justify-between font-bold">
          <span>TOTAL DUE</span>
          <span>{formatPrice(sale.total)}</span>
        </p>
        <p className="flex justify-between">
          <span>AMOUNT PAID</span>
          <span>{formatPrice(sale.amountPaid)}</span>
        </p>
        <p className="flex justify-between">
          <span>CHANGE</span>
          <span>{formatPrice(sale.change)}</span>
        </p>
      </div>

      {/* Payment confirmation message */}
      <div className="mt-4 border-t border-dashed border-slate-300 pt-3 text-center">
        <p className="font-bold">PAYMENT CONFIRMED</p>
        <p className="text-xs text-slate-500">Thank you for shopping with us!</p>
      </div>
    </section>
  )
}

export default Receipt
