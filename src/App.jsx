// App: the main screen. It doesn't do any work itself,
// it just places each component in the right spot on the page.

import ProductList from './components/ProductList'
import Cart from './components/Cart'
import OrderSummary from './components/OrderSummary'
import PaymentForm from './components/PaymentForm'
import PaymentConfirmation from './components/PaymentConfirmation'
import Receipt from './components/Receipt'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top bar with the store name */}
      <header className="bg-slate-900 px-8 py-4 text-white">
        <h1 className="text-xl font-bold">Campus Convenience Store POS</h1>
        <p className="text-sm text-slate-300">Cashier: Name · Register 1</p>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 p-8">
        {/* Row 1: 12-column grid. Products take 7 columns, checkout takes 5 */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <ProductList />
          </div>

          {/* Checkout column: cart, totals, then payment, stacked top to bottom */}
          <div className="col-span-5 space-y-6">
            <Cart />
            <OrderSummary />
            <PaymentForm />
          </div>
        </div>

        {/* Row 2: what the cashier sees after paying (always shown for now) */}
        <div className="grid grid-cols-2 gap-6">
          <PaymentConfirmation />
          <Receipt />
        </div>
      </main>
    </div>
  )
}

export default App
