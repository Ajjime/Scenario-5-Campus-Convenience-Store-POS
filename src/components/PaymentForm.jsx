// PaymentForm: where the cashier picks a payment method and enters the cash received.
// The form does not submit anywhere yet.

function PaymentForm() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Payment</h2>

      <form className="mt-4 space-y-4">
        {/* Payment method choices */}
        <fieldset>
          <legend className="text-sm font-medium text-slate-700">Payment method</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {['Cash', 'Card', 'E-Wallet'].map((method) => (
              <label
                key={method}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 py-2 text-sm"
              >
                <input type="radio" name="method" value={method} />
                {method}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Amount the customer hands over */}
        <div>
          <label htmlFor="amount" className="text-sm font-medium text-slate-700">
            Amount received
          </label>
          <input
            id="amount"
            type="number"
            placeholder="0.00"
            className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2"
          />
        </div>

        {/* Change to give back (just a placeholder number) */}
        <p className="flex justify-between text-sm">
          <span className="text-slate-600">Change</span>
          <span className="font-semibold">₱0.00</span>
        </p>

        {/* Main action button: big and green so it's easy to find */}
        <button
          type="button"
          className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Complete Payment
        </button>
      </form>
    </section>
  )
}

export default PaymentForm
