// ProductList: shows the items a cashier can tap to add to the cart.
// For now it uses fake placeholder products (no real data yet).

// Placeholder products so the grid has something to show
const products = [
  { id: 1, name: 'Product Name', category: 'Snacks' },
  { id: 2, name: 'Product Name', category: 'Drinks' },
  { id: 3, name: 'Product Name', category: 'School Supplies' },
  { id: 4, name: 'Product Name', category: 'Snacks' },
  { id: 5, name: 'Product Name', category: 'Drinks' },
  { id: 6, name: 'Product Name', category: 'Personal Care' },
  { id: 7, name: 'Product Name', category: 'Snacks' },
  { id: 8, name: 'Product Name', category: 'School Supplies' },
  { id: 9, name: 'Product Name', category: 'Drinks' },
]

// Category filter buttons (they don't filter anything yet)
const categories = ['All', 'Snacks', 'Drinks', 'School Supplies', 'Personal Care']

function ProductList() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Products</h2>

      {/* Search box */}
      <input
        type="search"
        placeholder="Search products..."
        aria-label="Search products"
        className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm"
      />

      {/* Category buttons in a row */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="rounded-full border border-slate-300 px-4 py-1 text-sm text-slate-700 hover:bg-slate-100"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product cards in a 3-column grid */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            className="rounded-lg border border-slate-200 p-4 text-left hover:border-emerald-500 hover:shadow-sm"
          >
            {/* Grey box stands in for a product photo */}
            <div className="mb-3 h-24 rounded-md bg-slate-100" />
            <p className="font-medium text-slate-800">{product.name}</p>
            <p className="text-xs text-slate-500">{product.category}</p>
            <p className="mt-2 font-semibold text-emerald-700">₱0.00</p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ProductList
