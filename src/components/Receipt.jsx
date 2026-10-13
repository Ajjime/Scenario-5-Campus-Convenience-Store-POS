// Receipt: a paper-style record of the finished sale.
// Everything comes from the saved sale in App, so it never changes after payment.

import { formatPrice } from '../utils/formatPrice'
import ProductImage from './ProductImage'

function Receipt({ sale }) {
  return (
    // Outer wrapper: slides up (after the confirmation) and casts a soft shadow.
    // drop-shadow is used instead of box-shadow so the shadow follows the torn edge.
    <div className="mx-auto max-w-md animate-slide-up drop-shadow-[0_10px_18px_rgba(15,23,42,0.14)]">
      {/* receipt-paper (index.css) = off-white paper with a torn zig-zag bottom edge */}
      <section className="receipt-paper px-6 pb-10 pt-6 font-mono text-sm text-slate-800">
        {/* Store header: logo, name, transaction number and date/time */}
        <div className="text-center">
          <img src="/logo.svg" alt="CampusMart logo" width="48" height="48" className="mx-auto h-12 w-12" />
          <h2 className="mt-2 font-sans text-lg font-extrabold tracking-tight">
            Campus<span className="text-brand-700">Mart</span>
          </h2>
          <p className="text-xs text-slate-500">Campus Convenience Store · Official Receipt</p>
          <p className="mt-3 text-xs">Txn No.: {sale.transactionNumber}</p>
          <p className="text-xs">{sale.dateTime}</p>
        </div>

        {/* One row per item: small photo, name, "qty x unit price", and subtotal.
            Dashed borders are the dividers you see on paper receipts. */}
        <ul className="my-4 space-y-3 border-y border-dashed border-slate-300 py-4">
          {sale.items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              {/* alt="" because the item name is printed right next to it */}
              <ProductImage
                src={item.image}
                emoji={item.emoji}
                alt=""
                className="h-9 w-9 shrink-0 rounded-md"
                emojiSize="text-lg"
              />
              <div className="min-w-0 flex-1">
                <p>{item.name}</p>
                <p className="text-xs text-slate-500">
                  {item.quantity} x {formatPrice(item.price)}
                </p>
              </div>
              <span className="tabular-nums">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        {/* Money totals */}
        <div className="space-y-1">
          <p className="flex justify-between text-base font-bold">
            <span>TOTAL DUE</span>
            <span className="tabular-nums">{formatPrice(sale.total)}</span>
          </p>
          <p className="flex justify-between">
            <span>AMOUNT PAID</span>
            <span className="tabular-nums">{formatPrice(sale.amountPaid)}</span>
          </p>
          <p className="flex justify-between">
            <span>CHANGE</span>
            <span className="tabular-nums">{formatPrice(sale.change)}</span>
          </p>
        </div>

        {/* Payment confirmation message */}
        <div className="mt-5 border-t border-dashed border-slate-300 pt-4 text-center">
          <p className="font-bold tracking-widest text-brand-800">✓ PAYMENT CONFIRMED</p>
          <p className="mt-1 text-xs text-slate-500">Thank you for shopping at CampusMart!</p>
        </div>
      </section>
    </div>
  )
}

export default Receipt
