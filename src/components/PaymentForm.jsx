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
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-900">Payment</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        {/* A disabled fieldset disables every input and button inside it: this locks the form after payment */}
        <fieldset disabled={locked} className="space-y-4">
          {/* Payment method choices (not used yet).
              has-checked: styles the label when the radio inside it is selected. */}
          <fieldset>
            <legend className="text-sm font-semibold text-slate-700">Payment method</legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {['Cash', 'Card', 'E-Wallet'].map((method) => (
                <label
                  key={method}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-300 has-checked:border-brand-600 has-checked:bg-brand-50 has-checked:text-brand-800 has-disabled:cursor-not-allowed has-disabled:opacity-60"
                >
                  <input type="radio" name="method" value={method} className="accent-brand-700" />
                  {method}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Cash amount. type="text" lets us do our own checks;
              inputMode="decimal" still shows a number keypad on touch screens. */}
          <div>
            <label htmlFor="amount" className="text-sm font-semibold text-slate-700">
              Cash amount
            </label>
            {/* The ₱ sign sits inside the box, on the left */}
            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                ₱
              </span>
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
                  'w-full rounded-xl border bg-white py-3 pl-9 pr-4 text-lg font-semibold tabular-nums transition-colors disabled:bg-slate-100 disabled:text-slate-500 ' +
                  (showError ? 'border-red-500 bg-red-50/40' : 'border-slate-300 focus:border-brand-500')
                }
              />
            </div>
          </div>

          {/* Error or success message, shown on the page (no alert boxes) */}
          <div id="payment-message">
            {/* Error: icon + text (not color alone) and a gentle shake.
                key={result.error} replays the shake if the message changes. */}
            {showError && (
              <p
                key={result.error}
                role="alert"
                className="flex animate-shake items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700"
              >
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7.5v5M12 16h.01" strokeLinecap="round" />
                </svg>
                {result.error}
              </p>
            )}
            {/* Success: slides in */}
            {showChange && (
              <div role="status" className="animate-slide-in rounded-xl border border-brand-200 bg-brand-50 px-3 py-2.5 text-sm text-brand-900">
                <p className="flex justify-between">
                  <span>Amount paid</span>
                  <span className="tabular-nums">{formatPrice(result.amountPaid)}</span>
                </p>
                <p className="flex justify-between">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </p>
                <p className="mt-1 flex justify-between text-base font-bold">
                  <span>Change</span>
                  <span className="tabular-nums">{formatPrice(result.change)}</span>
                </p>
              </div>
            )}
          </div>

          {/* type="submit" means clicking it (or pressing Enter in the box) runs handleSubmit.
              active:scale-[0.98] = slight press-in when clicked. */}
          <button
            type="submit"
            className="w-full rounded-xl bg-brand-700 py-3.5 text-base font-bold text-white shadow-md shadow-brand-900/20 transition hover:bg-brand-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-600 disabled:shadow-none"
          >
            {locked ? 'Payment Complete' : 'Confirm Payment'}
          </button>
        </fieldset>
      </form>
    </section>
  )
}

export default PaymentForm
