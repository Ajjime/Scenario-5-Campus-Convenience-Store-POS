// ProductList: shows the items a cashier can add to the cart.
// It receives the list of products from App.jsx through props.

// Category filter buttons (they don't filter anything yet)
const categories = ['All', 'Snacks', 'Drinks', 'School Supplies']

// Turns a number like 18 into the text "₱18.00"
function formatPrice(price) {
  return '₱' + price.toFixed(2)
}

// { products } pulls the "products" prop out of the props object that App sends
function ProductList({ products }) {
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

      {/* Responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* .map() makes one card for each product in the array */}
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between rounded-lg border border-slate-200 p-4"
          >
            <div>
              <p className="font-medium text-slate-800">{product.name}</p>
              <p className="mt-1 text-lg font-semibold text-emerald-700">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Add to Cart button (doesn't do anything yet) */}
            <button
              type="button"
              className="mt-4 w-full rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductList
