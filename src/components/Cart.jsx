// Cart: lists the items the customer is buying.
// The rows below are placeholders until we add real cart logic.

function Cart() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Cart</h2>

      {/* One row per item: name, quantity buttons, and line price */}
      <ul className="mt-4 divide-y divide-slate-100">
        {[1, 2, 3].map((row) => (
          <li key={row} className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-slate-800">Item Name</p>
              <p className="text-xs text-slate-500">₱0.00 each</p>
            </div>

            {/* Quantity controls (not working yet) */}
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Decrease quantity" className="h-8 w-8 rounded border border-slate-300">
                -
              </button>
              <span className="w-6 text-center">1</span>
              <button type="button" aria-label="Increase quantity" className="h-8 w-8 rounded border border-slate-300">
                +
              </button>
            </div>

            <p className="w-20 text-right font-medium">₱0.00</p>
          </li>
        ))}
      </ul>

      <button type="button" className="mt-3 text-sm text-red-600 hover:underline">
        Clear cart
      </button>
    </section>
  )
}

export default Cart
