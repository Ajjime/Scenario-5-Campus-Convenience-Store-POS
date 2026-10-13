// Receipt: a printable-style record of the finished sale.
// Styled to look like a paper receipt with a monospace font.

function Receipt() {
  return (
    <section className="rounded-xl bg-white p-5 font-mono text-sm shadow-sm">
      {/* Store header */}
      <div className="text-center">
        <h2 className="text-base font-bold">CAMPUS CONVENIENCE STORE</h2>
        <p className="text-xs text-slate-500">Store Address · Date and Time</p>
        <p className="text-xs text-slate-500">Receipt #000000</p>
      </div>

      {/* Dashed lines look like a paper receipt */}
      <ul className="my-3 space-y-1 border-y border-dashed border-slate-300 py-3">
        {[1, 2, 3].map((row) => (
          <li key={row} className="flex justify-between">
            <span>1 x Item Name</span>
            <span>₱0.00</span>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="space-y-1">
        <p className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>₱0.00</span>
        </p>
        <p className="flex justify-between">
          <span>Cash</span>
          <span>₱0.00</span>
        </p>
        <p className="flex justify-between">
          <span>Change</span>
          <span>₱0.00</span>
        </p>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">Thank you for shopping!</p>
    </section>
  )
}

export default Receipt
