// OrderSummary: lists each item with its quantity and subtotal, plus the total.
// It only displays data from App.jsx, so it updates by itself whenever the cart changes.

import { formatPrice } from '../utils/formatPrice'

function OrderSummary({ cart, total }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Order Summary</h2>

      {cart.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No items yet.</p>
      ) : (
        // Each line: "Name × quantity" on the left, subtotal on the right
        <ul className="mt-4 space-y-2 text-sm">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span className="text-slate-600">
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Total is bigger and bolder so it stands out */}
      <p className="mt-4 flex justify-between border-t border-slate-200 pt-3 text-lg font-bold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </p>
    </section>
  )
}

export default OrderSummary
