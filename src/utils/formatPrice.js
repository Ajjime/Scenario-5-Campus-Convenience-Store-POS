// Turns a number like 18 into the text "₱18.00".
// Kept in its own file so every component can use the same formatting.
export function formatPrice(price) {
  return '₱' + price.toFixed(2)
}
