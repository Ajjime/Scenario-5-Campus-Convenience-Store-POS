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
import { assetUrl } from './utils/assetUrl'

// Hard-coded store items. Prices are plain numbers (in pesos) so we can do math with them.
// "category" isn't shown on the cards yet; we'll use it for the category buttons later.
// "image" is a photo in public/images/ (assetUrl adds the GitHub Pages folder in front);
// "emoji" is shown instead if the photo fails to load.
const products = [
  { id: 1, name: 'Instant Noodles', price: 18, category: 'Snacks', image: assetUrl('images/instant-noodles.jpg'), emoji: '🍜' },
  { id: 2, name: 'Potato Chips', price: 25, category: 'Snacks', image: assetUrl('images/potato-chips.jpg'), emoji: '🥔' },
  { id: 3, name: 'Soft Drink (Can)', price: 25, category: 'Drinks', image: assetUrl('images/soft-drink.jpg'), emoji: '🥤' },
  { id: 4, name: 'Bottled Water', price: 20, category: 'Drinks', image: assetUrl('images/bottled-water.jpg'), emoji: '💧' },
  { id: 5, name: 'Ballpen (piece)', price: 12, category: 'School Supplies', image: assetUrl('images/ballpen.jpg'), emoji: '🖊️' },
  { id: 6, name: 'Notebook (piece)', price: 35, category: 'School Supplies', image: assetUrl('images/notebook.jpg'), emoji: '📓' },
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

  // Number of pieces in the cart (2 noodles + 1 water = 3). Only used for the header badge.
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-brand-50 font-sans text-slate-900 antialiased">
      {/* Top bar: logo + store name on the left, register info and cart count on the right */}
      <header className="bg-linear-to-r from-brand-900 via-brand-800 to-brand-700 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* alt="" because the store name is written right next to the logo */}
            <img src={assetUrl('logo.svg')} alt="" width="44" height="44" className="h-11 w-11 drop-shadow" />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                Campus<span className="text-amber-300">Mart</span>
              </h1>
              <p className="text-xs font-medium text-brand-100">Campus Convenience Store · Point of Sale</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="hidden rounded-full bg-white/10 px-3 py-1.5 text-brand-50 sm:inline">Register 1</span>
            <span className="hidden rounded-full bg-white/10 px-3 py-1.5 text-brand-50 sm:inline">Cashier: Name</span>

            {/* Cart count. key={itemCount} re-creates the badge when the number changes,
                which replays the "pop" animation. */}
            <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-semibold text-brand-800">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" />
                <path d="M9 7V6a3 3 0 0 1 6 0v1" strokeLinecap="round" />
              </svg>
              Cart
              <span
                key={itemCount}
                className="inline-flex min-w-6 animate-pop items-center justify-center rounded-full bg-amber-400 px-1.5 text-xs font-bold tabular-nums text-slate-900"
              >
                {itemCount}
              </span>
              <span className="sr-only">items</span>
            </span>
          </div>
        </div>
      </header>

      {/* Success message under the header. role="status" makes screen readers announce it.
          key={message} replays the slide-in animation for each new message. */}
      <div role="status" className="pointer-events-none fixed right-4 top-24 z-20 sm:right-6">
        {message && (
          <p
            key={message}
            className="flex animate-toast-in items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-xs" aria-hidden="true">
              ✓
            </span>
            {message}
          </p>
        )}
      </div>

      {/* One column on small screens; from 1024px wide (lg), a 12-column grid: 7 left, 5 right */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-8">
        {/* Left side: products while selling; after payment, the confirmation then the receipt */}
        <div className="lg:col-span-7">
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
        <div className="space-y-6 lg:col-span-5">
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
