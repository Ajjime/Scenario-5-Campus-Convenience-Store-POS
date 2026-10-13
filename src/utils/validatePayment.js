// validatePayment: checks the cash amount typed by the cashier.
// Returns { error: 'message' } if something is wrong,
// or { amountPaid: number, change: number } if the payment is OK.
// It's a plain function (no React), so it is easy to read and test on its own.

import { formatPrice } from './formatPrice.js'

const INVALID_AMOUNT = 'Please enter a valid payment amount.'

// Largest cash amount accepted. Far above any real sale here, and it keeps the
// centavo math exact (JavaScript loses precision on very large numbers).
const MAX_PAYMENT = 1000000

function validatePayment(amountText, total, cartIsEmpty) {
  // Check 1: there must be something to pay for
  if (cartIsEmpty) {
    return { error: 'Your cart is empty. Please add at least one item before paying.' }
  }

  // Remove spaces at the start and end, so " 50 " is treated as "50"
  const text = amountText.trim()

  // Check 2: blank
  if (text === '') {
    return { error: INVALID_AMOUNT }
  }

  // Check 3: must look like a plain number: digits, an optional minus sign,
  // and at most 2 decimal places (centavos). Rejects "abc", "12abc", "1e3", "20.555".
  if (!/^-?\d+(\.\d{1,2})?$/.test(text)) {
    return { error: INVALID_AMOUNT }
  }

  const amount = Number(text)

  // Check 4: negative. We look at the minus sign itself, because Number("-0") is 0
  // and "amount < 0" would let "-0" through.
  if (text.startsWith('-')) {
    return { error: INVALID_AMOUNT }
  }

  // Check 5: unrealistically large (would also break the centavo math)
  if (amount > MAX_PAYMENT) {
    return { error: INVALID_AMOUNT }
  }

  // Do money math in whole centavos to avoid decimal rounding errors
  // (in JavaScript, 0.1 + 0.2 is 0.30000000000000004)
  const paidCentavos = Math.round(amount * 100)
  const totalCentavos = Math.round(total * 100)

  // Check 6: enough money
  if (paidCentavos < totalCentavos) {
    return { error: 'Insufficient payment. Please enter at least ' + formatPrice(total) + '.' }
  }

  // All checks passed: change = amount paid − total
  return {
    amountPaid: paidCentavos / 100,
    change: (paidCentavos - totalCentavos) / 100,
  }
}

export default validatePayment
