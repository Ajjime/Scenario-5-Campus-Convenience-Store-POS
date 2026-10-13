// OrderSummary: lists each item with its quantity and subtotal, plus the total.
// It only displays data from App.jsx, so it updates by itself whenever the cart changes.

import { formatPrice } from '../utils/formatPrice'

function OrderSummary({ cart, total }) {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

      {cart.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No items yet.</p>
      ) : (
        // Each line: "Name × quantity" on the left, subtotal on the right
        <ul className="mt-3 space-y-2 text-sm">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between gap-3">
              <span className="text-slate-600">
                {item.name} <span className="text-slate-400">×</span> {item.quantity}
              </span>
              <span className="font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Total is bigger and bolder so it stands out.
          key={total} re-creates this element when the total changes, replaying the amber flash. */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="text-base font-semibold text-slate-700">Total</span>
        <span
          key={total}
          className="animate-flash rounded-lg px-2 py-0.5 text-2xl font-extrabold tabular-nums text-slate-900"
        >
          {formatPrice(total)}
        </span>
      </div>
    </section>
  )
}

export default OrderSummary
