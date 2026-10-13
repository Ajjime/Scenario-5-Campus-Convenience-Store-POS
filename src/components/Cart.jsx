// Cart: lists the items the customer is buying.
// It gets the cart and the functions to change it from App.jsx through props.
// After payment, "locked" is true and the cart can't be changed.

import { formatPrice } from '../utils/formatPrice'

function Cart({ cart, locked, onIncrease, onDecrease, onRemove, onClear }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Cart</h2>

      {/* Tell the cashier why the buttons stopped working */}
      {locked && (
        <p className="mt-2 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">
          Locked: payment is complete. Start a new transaction to make changes.
        </p>
      )}

      {/* If the cart is empty, show a hint instead of an empty list */}
      {cart.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Cart is empty. Add a product to get started.</p>
      ) : (
        <>
          {/* One row per item: name, unit price, quantity buttons, subtotal, remove */}
          <ul className="mt-4 divide-y divide-slate-100">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-800">{item.name}</p>
                  <p className="text-xs text-slate-500">{formatPrice(item.price)} each</p>
                </div>

                {/* Quantity controls. Calling onDecrease at quantity 1 removes the item (handled in App). */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onDecrease(item.id)}
                    aria-label={'Decrease ' + item.name}
                    disabled={locked}
                    className="h-8 w-8 rounded border border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => onIncrease(item.id)}
                    aria-label={'Increase ' + item.name}
                    disabled={locked}
                    className="h-8 w-8 rounded border border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal = unit price × quantity, with a Remove link underneath */}
                <div className="w-20 text-right">
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  {/* Remove is hidden once the cart is locked */}
                  {!locked && (
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={'Remove ' + item.name}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {!locked && (
            <button type="button" onClick={onClear} className="mt-3 text-sm text-red-600 hover:underline">
              Clear cart
            </button>
          )}
        </>
      )}
    </section>
  )
}

export default Cart
