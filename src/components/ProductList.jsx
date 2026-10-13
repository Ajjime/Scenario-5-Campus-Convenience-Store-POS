// ProductList: shows the items a cashier can add to the cart.
// It receives the products and the add function from App.jsx through props.

import { formatPrice } from '../utils/formatPrice'
import ProductImage from './ProductImage'

// Category filter buttons (they don't filter anything yet)
const categories = ['All', 'Snacks', 'Drinks', 'School Supplies']

// { products, onAddToCart } pulls those two props out of the props object that App sends
function ProductList({ products, onAddToCart }) {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-slate-900">Products</h2>
        <p className="text-sm text-slate-500">{products.length} items</p>
      </div>

      {/* Search box with a magnifying-glass icon inside it */}
      <div className="relative mt-4">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:bg-white"
        />
      </div>

      {/* Category buttons in a row */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 active:scale-95"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* .map() makes one card for each product in the array */}
        {products.map((product) => (
          // "group" lets the photo react when the whole card is hovered (group-hover:)
          <div
            key={product.id}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-3 transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/10"
          >
            {/* Photo area: same 4:3 shape on every card; overflow-hidden keeps the zoom inside */}
            <div className="aspect-4/3 overflow-hidden rounded-xl bg-slate-100">
              <ProductImage
                src={product.image}
                emoji={product.emoji}
                alt={product.name}
                emojiSize="text-6xl"
                className="h-full w-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="mt-3 flex flex-1 flex-col justify-between px-1">
              <div>
                <p className="font-semibold leading-snug text-slate-800">{product.name}</p>
                <p className="mt-1 text-lg font-bold tabular-nums text-brand-700">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Clicking calls App's addToCart with this product. active:scale-95 = slight press-in. */}
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                aria-label={'Add ' + product.name + ' to cart'}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-700 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 active:scale-95"
              >
                <span aria-hidden="true" className="text-base leading-none">+</span>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductList
