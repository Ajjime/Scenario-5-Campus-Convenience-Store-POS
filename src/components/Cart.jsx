// Cart: lists the items the customer is buying.
// It gets the cart and the functions to change it from App.jsx through props.
// After payment, "locked" is true and the cart can't be changed.

import { useRef, useState } from 'react'
import { formatPrice } from '../utils/formatPrice'
import ProductImage from './ProductImage'

// How long the fade-out animation lasts (must match --animate-fade-out in index.css)
const FADE_OUT_MS = 180

// One row in the cart: photo, name and unit price, quantity buttons, subtotal, remove.
// A "ghost" row is a copy of an item that was just removed: it only plays the fade-out.
// "inert" makes the ghost unclickable and hidden from screen readers.
function CartRow({ item, ghost, locked, onDecrease, onIncrease, onRemove }) {
  return (
    <li
      inert={ghost}
      className={'flex items-center gap-3 py-3 ' + (ghost ? 'animate-fade-out' : 'animate-slide-in')}
    >
      {/* alt="" because the item name is written right next to the thumbnail */}
      <ProductImage src={item.image} emoji={item.emoji} alt="" className="h-12 w-12 shrink-0 rounded-lg" />

      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-snug text-slate-800">{item.name}</p>
        <p className="text-xs tabular-nums text-slate-500">{formatPrice(item.price)} each</p>
      </div>

      {/* Quantity controls. − at quantity 1 removes the item (handled in App). */}
      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-0.5">
        <button
          type="button"
          onClick={() => onDecrease(item)}
          aria-label={'Decrease ' + item.name}
          disabled={locked}
          className="h-8 w-8 rounded-full text-lg leading-none text-slate-700 transition hover:bg-white hover:shadow-sm active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        {/* min-w (not a fixed width) so 3+ digit quantities still fit */}
        <span className="min-w-6 px-1 text-center font-semibold tabular-nums">{item.quantity}</span>
        <button
          type="button"
          onClick={() => onIncrease(item.id)}
          aria-label={'Increase ' + item.name}
          disabled={locked}
          className="h-8 w-8 rounded-full text-lg leading-none text-slate-700 transition hover:bg-white hover:shadow-sm active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>

      {/* Subtotal = unit price × quantity, with a Remove link underneath.
          whitespace-nowrap keeps big amounts on one line. */}
      <div className="min-w-20 text-right">
        <p className="whitespace-nowrap font-bold tabular-nums text-slate-900">
          {formatPrice(item.price * item.quantity)}
        </p>
        {/* Remove is hidden once the cart is locked */}
        {!locked && (
          <button
            type="button"
            onClick={() => onRemove(item)}
            aria-label={'Remove ' + item.name}
            className="text-xs font-medium text-red-600 hover:underline active:scale-95"
          >
            Remove
          </button>
        )}
      </div>
    </li>
  )
}

function Cart({ cart, locked, onIncrease, onDecrease, onRemove, onClear }) {
  // ---- Fade-out animation (UI only: App's cart logic is unchanged) ----
  // App removes the item right away, so the cart, totals, and payment are always correct.
  // Cart keeps a short-lived "ghost" copy of the removed row just to show it fading out.

  // Ghost rows currently fading out: { id, item, index }
  const [ghosts, setGhosts] = useState([])
  // Gives every ghost its own id (used as the React key)
  const nextGhostId = useRef(0)

  // Run the real App action now, then show ghosts of the removed items for FADE_OUT_MS
  function removeWithFade(items, action) {
    const newGhosts = items.map((item) => ({
      id: nextGhostId.current++,
      item: item,
      index: cart.indexOf(item), // remember where the row was, so the ghost fades in the same spot
    }))
    action()
    setGhosts((current) => [...current, ...newGhosts])
    setTimeout(() => {
      setGhosts((current) => current.filter((ghost) => !newGhosts.includes(ghost)))
    }, FADE_OUT_MS)
  }

  function handleRemove(item) {
    removeWithFade([item], () => onRemove(item.id))
  }

  // − at quantity 1 removes the item in App, so show a fade. Otherwise just lower it.
  function handleDecrease(item) {
    if (item.quantity === 1) {
      removeWithFade([item], () => onDecrease(item.id))
    } else {
      onDecrease(item.id)
    }
  }

  function handleClear() {
    removeWithFade(cart, onClear)
  }

  // The list we draw: the real cart items, with any ghosts slotted back where they were
  const rows = cart.map((item) => ({ key: 'item-' + item.id, item: item, ghost: false }))
  ghosts.forEach((ghost) => {
    rows.splice(Math.min(ghost.index, rows.length), 0, { key: 'ghost-' + ghost.id, item: ghost.item, ghost: true })
  })

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-900">Cart</h2>

      {/* Tell the cashier why the buttons stopped working */}
      {locked && (
        <p className="mt-3 flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Locked: payment is complete. Start a new transaction to make changes.
        </p>
      )}

      {/* Friendly empty state (shown once any fading rows are gone) */}
      {rows.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-xl border-2 border-dashed border-slate-200 px-4 py-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" strokeLinecap="round" />
            </svg>
          </div>
          <p className="mt-3 font-semibold text-slate-700">Your cart is empty</p>
          <p className="mt-1 text-sm text-slate-500">Tap “Add to Cart” on any product to start an order.</p>
        </div>
      ) : (
        <>
          <ul className="mt-3 divide-y divide-slate-100">
            {rows.map((row) => (
              <CartRow
                key={row.key}
                item={row.item}
                ghost={row.ghost}
                locked={locked}
                onDecrease={handleDecrease}
                onIncrease={onIncrease}
                onRemove={handleRemove}
              />
            ))}
          </ul>

          {!locked && cart.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="mt-2 rounded-lg px-2 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50 active:scale-95"
            >
              Clear cart
            </button>
          )}
        </>
      )}
    </section>
  )
}

export default Cart
