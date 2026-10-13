// PaymentForm: the cashier types the cash received and clicks Confirm Payment.
// It checks the amount with validatePayment and shows either an error or the change.
// When the payment is OK, it tells App by calling onPaymentSuccess.

import { useState } from 'react'
import { formatPrice } from '../utils/formatPrice'
import validatePayment from '../utils/validatePayment'

function PaymentForm({ total, cartIsEmpty, locked, onPaymentSuccess }) {
  // What the cashier typed (kept as text so we can check it ourselves)
  const [amountText, setAmountText] = useState('')
  // Becomes true after Confirm Payment is clicked, so errors don't appear while typing
  const [submitted, setSubmitted] = useState(false)

  // Check the amount on every render. Because it uses the current total,
  // the message stays correct even if the cart changes after confirming.
  const result = validatePayment(amountText, total, cartIsEmpty)

  function handleSubmit(event) {
    event.preventDefault() // stop the browser from reloading the page
    setSubmitted(true)

    // Only a valid payment is sent to App; errors just stay on screen
    if (!result.error) {
      onPaymentSuccess(result.amountPaid, result.change)
    }
  }

  function handleChange(event) {
    setAmountText(event.target.value)
    setSubmitted(false) // hide the old message until they confirm again
  }

  const showError = submitted && result.error
  const showChange = submitted && !result.error

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Payment</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        {/* A disabled fieldset disables every input and button inside it: this locks the form after payment */}
        <fieldset disabled={locked} className="space-y-4">
          {/* Payment method choices (not used yet) */}
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

          {/* Cash amount. type="text" lets us do our own checks;
              inputMode="decimal" still shows a number keypad on touch screens. */}
          <div>
            <label htmlFor="amount" className="text-sm font-medium text-slate-700">
              Cash amount
            </label>
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amountText}
              onChange={handleChange}
              aria-invalid={showError ? 'true' : 'false'}
              aria-describedby="payment-message"
              className={
                'mt-1 w-full rounded-lg border px-4 py-2 disabled:bg-slate-100 disabled:text-slate-500 ' +
                (showError ? 'border-red-500' : 'border-slate-300')
              }
            />
          </div>

          {/* Error or success message, shown on the page (no alert boxes) */}
          <div id="payment-message">
            {showError && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {result.error}
              </p>
            )}
            {showChange && (
              <div role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                <p className="flex justify-between">
                  <span>Amount paid</span>
                  <span>{formatPrice(result.amountPaid)}</span>
                </p>
                <p className="flex justify-between">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </p>
                <p className="mt-1 flex justify-between text-base font-bold">
                  <span>Change</span>
                  <span>{formatPrice(result.change)}</span>
                </p>
              </div>
            )}
          </div>

          {/* type="submit" means clicking it (or pressing Enter in the box) runs handleSubmit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {locked ? 'Payment Complete' : 'Confirm Payment'}
          </button>
        </fieldset>
      </form>
    </section>
  )
}

export default PaymentForm
