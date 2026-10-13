// App: the main screen. It doesn't do any work itself,
// it just places each component in the right spot on the page.

import ProductList from './components/ProductList'
import Cart from './components/Cart'
import OrderSummary from './components/OrderSummary'
import PaymentForm from './components/PaymentForm'
import PaymentConfirmation from './components/PaymentConfirmation'
import Receipt from './components/Receipt'

// Hard-coded store items. Prices are plain numbers (in pesos) so we can do math with them later.
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
            {/* Pass the products array down to ProductList as a prop named "products" */}
            <ProductList products={products} />
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
