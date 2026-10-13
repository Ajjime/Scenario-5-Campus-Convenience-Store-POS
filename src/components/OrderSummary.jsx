// OrderSummary: shows the money totals for the current order.
// All amounts are placeholders (₱0.00) for now.

function OrderSummary() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Order Summary</h2>

      {/* Each line: label on the left, amount on the right */}
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-600">Subtotal</dt>
          <dd>₱0.00</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-600">Discount</dt>
          <dd>₱0.00</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-600">Tax</dt>
          <dd>₱0.00</dd>
        </div>

        {/* Total is bigger and bolder so it stands out */}
        <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold">
          <dt>Total</dt>
          <dd>₱0.00</dd>
        </div>
      </dl>
    </section>
  )
}

export default OrderSummary
