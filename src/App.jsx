// App: the main screen. It owns the cart and sale state and places each component on the page.
// Child components get data and functions from here through props.

import { useRef, useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import OrderSummary from './components/OrderSummary'
import PaymentForm from './components/PaymentForm'
import PaymentConfirmation from './components/PaymentConfirmation'
import Receipt from './components/Receipt'
import { createTransactionNumber, formatDateTime } from './utils/transaction'

// Hard-coded store items. Prices are plain numbers (in pesos) so we can do math with them.
// "category" isn't shown on the cards yet; we'll use it for the category buttons later.
const products = [
  { id: 1, name: 'Instant Noodles', price: 18, category: 'Snacks' },
  { id: 2, name: 'Potato Chips', price: 25, category: 'Snacks' },
  { id: 3, name: 'Soft Drink (Can)', price: 25, category: 'Drinks' },
  { id: 4, name: 'Bottled Water', price: 20, category: 'Drinks' },
  { id: 5, name: 'Ballpen (piece)', price: 12, category: 'School Supplies' },
  { id: 6, name: 'Notebook (piece)', price: 35, category: 'School Supplies' },
]

function App() {
  // The cart is a list of items like { id, name, price, quantity }. It starts empty.
  const [cart, setCart] = useState([])

  // The finished sale, or null while the cashier is still ringing items up.
  // When it is not null, the cart and payment are locked and the receipt is shown.
  const [completedSale, setCompletedSale] = useState(null)

  // Changing this number gives PaymentForm a fresh start (empty input, no errors). See startNewTransaction.
  const [paymentFormKey, setPaymentFormKey] = useState(0)

  // Short success message shown after adding an item ('' means nothing to show)
  const [message, setMessage] = useState('')
  // Remembers the hide-message timer so a new message can cancel the old timer
  const messageTimer = useRef(null)

  // True after payment: used to lock the cart and the payment form
  const isLocked = completedSale !== null

  // Shows a message, then hides it after 2 seconds
  function showMessage(text) {
    setMessage(text)
    clearTimeout(messageTimer.current)
    messageTimer.current = setTimeout(() => setMessage(''), 2000)
  }

  // Add one of a product. If it's already in the cart, just raise its quantity.
  function addToCart(product) {
    const alreadyInCart = cart.some((item) => item.id === product.id)

    if (alreadyInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      )
    } else {
      // { ...product, quantity: 1 } copies the product and adds a quantity field
      setCart([...cart, { ...product, quantity: 1 }])
    }

    showMessage(product.name + ' added to cart.')
  }

  // + button: raise quantity by 1
  function increaseQuantity(id) {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  // − button: lower quantity by 1. If it would hit 0, remove the item instead.
  function decreaseQuantity(id) {
    setCart(
      cart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  // Remove button: take the item out completely
  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id))
  }

  // Clear cart button: empty the whole cart
  function clearCart() {
    setCart([])
  }

  // Total is calculated from the cart every render, so it is never out of date.
  // Subtotal for one item = price × quantity. Total = all subtotals added together.
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Called by PaymentForm after the amount passes every check.
  // Saves a snapshot of the sale so the confirmation and receipt never change afterwards.
  function completePayment(amountPaid, change) {
    const now = new Date()
    setCompletedSale({
      transactionNumber: createTransactionNumber(now),
      dateTime: formatDateTime(now),
      items: cart,
      total: total,
      amountPaid: amountPaid,
      change: change,
    })
  }

  // New Transaction button: reset everything for the next customer
  function startNewTransaction() {
    setCart([]) // empty cart
    setCompletedSale(null) // hides confirmation and receipt, unlocks everything
    setPaymentFormKey(paymentFormKey + 1) // new key = brand-new PaymentForm with empty input and no errors
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top bar with the store name */}
      <header className="bg-slate-900 px-8 py-4 text-white">
        <h1 className="text-xl font-bold">Campus Convenience Store POS</h1>
        <p className="text-sm text-slate-300">Cashier: Name · Register 1</p>
      </header>

      {/* Success message in the top-right corner. role="status" makes screen readers announce it. */}
      <div role="status" className="fixed right-6 top-6 z-10">
        {message && (
          <p className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
            {message}
          </p>
        )}
      </div>

      {/* 12-column grid. The left side takes 7 columns, checkout takes 5 */}
      <main className="mx-auto grid max-w-7xl grid-cols-12 gap-6 p-8">
        {/* Left side: products while selling; after payment, the confirmation then the receipt */}
        <div className="col-span-7">
          {isLocked ? (
            <div className="space-y-6">
              <PaymentConfirmation sale={completedSale} onNewTransaction={startNewTransaction} />
              <Receipt sale={completedSale} />
            </div>
          ) : (
            <ProductList products={products} onAddToCart={addToCart} />
          )}
        </div>

        {/* Checkout column: cart, totals, then payment, stacked top to bottom */}
        <div className="col-span-5 space-y-6">
          <Cart
            cart={cart}
            locked={isLocked}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
          />
          <OrderSummary cart={cart} total={total} />
          {/* PaymentForm needs the total and whether the cart is empty to check the amount */}
          <PaymentForm
            key={paymentFormKey}
            total={total}
            cartIsEmpty={cart.length === 0}
            locked={isLocked}
            onPaymentSuccess={completePayment}
          />
        </div>
      </main>
    </div>
  )
}

export default App
