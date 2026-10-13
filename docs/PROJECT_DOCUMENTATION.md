# CampusMart POS — Project Documentation

**Course:** IT 415 — Application Development and Emerging Technologies
**Exam:** Midterm Practical Examination (Computer-Based Food Ordering and POS System)
**Assigned Scenario:** Scenario 5 — Campus Convenience Store POS
**Institution:** Davao Del Norte State College, Institute of Computing

## 1. Overview

CampusMart is a desktop-browser point-of-sale app for a small campus convenience store that sells snacks, drinks, and basic school supplies. A cashier builds an order, enters a cash payment, and receives a digital receipt. Data is kept in memory only (no database, login, or inventory), as allowed by Section VII of the exam.

## 2. Tech Stack

| Tool | Purpose |
| --- | --- |
| React 19 | UI components and state (`useState`, `useRef`) |
| Vite | Dev server and build tool |
| Tailwind CSS 4 | Styling |
| oxlint | Linting (`npm run lint`) |
| Git / GitHub | Version control |

Run it: `npm install` then `npm run dev` (opens at http://localhost:5173).

## 3. Product List (hard-coded in `src/App.jsx`)

| Product | Price |
| --- | --- |
| Instant Noodles | ₱18.00 |
| Potato Chips | ₱25.00 |
| Soft Drink (Can) | ₱25.00 |
| Bottled Water | ₱20.00 |
| Ballpen (piece) | ₱12.00 |
| Notebook (piece) | ₱35.00 |

## 4. Transaction Flow (Exam Section IV)

| Step | Stage | How CampusMart does it | Where in code |
| --- | --- | --- | --- |
| 1 | Browse Products | Product grid shows photo, name, and price | `ProductList.jsx` |
| 2 | Add to Cart | "Add" button per product; quantities adjustable with + / − | `App.jsx` (`addToCart`), `Cart.jsx` |
| 3 | Review Order | Order summary with items, quantities, subtotals, total | `OrderSummary.jsx` |
| 4 | Enter Payment | Numeric text field for the cash amount | `PaymentForm.jsx` |
| 5 | Validate & Compute | Checks the amount and computes change | `utils/validatePayment.js` |
| 6 | Confirm Payment | Confirmation with transaction number, date and time | `PaymentConfirmation.jsx` |
| 7 | Receipt / New Transaction | Digital receipt; "New Transaction" resets everything | `Receipt.jsx`, `App.jsx` (`startNewTransaction`) |

## 5. Required Features Checklist (Exam Section V)

| # | Requirement | Status | Implementation |
| --- | --- | --- | --- |
| 1 | Display ≥ 5 products with names and prices | Done (6 products) | `products` array in `App.jsx`, rendered by `ProductList` |
| 2 | Add products to cart via on-screen buttons | Done | `addToCart` |
| 3 | Increase / decrease quantity | Done | `increaseQuantity`, `decreaseQuantity` |
| 4 | Remove a product from the cart | Done | `removeFromCart` (decreasing to 0 also removes) |
| 5 | Auto-compute subtotals and total | Done | `total` is recomputed from the cart on every render |
| 6 | Clear order summary of cart items | Done | `OrderSummary` |
| 7 | Accept cash via numeric input | Done | `PaymentForm` |
| 8 | Validate: blank, non-numeric, negative, insufficient | Done | `validatePayment`, message shown on screen |
| 9 | Change = Amount Paid − Total | Done | computed in whole centavos |
| 10 | Payment confirmation | Done | `PaymentConfirmation` |
| 11 | Digital receipt (items, qty, subtotals, total, paid, change, transaction ref) | Done | `Receipt`, number from `createTransactionNumber` |
| 12 | Start new transaction (clear cart, payment, receipt) | Done | `startNewTransaction` (also resets the payment form by changing its `key`) |

## 6. Design Notes

- **State lives in `App.jsx`.** `cart` (array of `{id, name, price, quantity}`), `completedSale` (snapshot after payment, or `null`), `paymentFormKey`, and a short success `message`. Child components receive data and callbacks as props.
- **Total is derived, not stored**, so it can never be out of date: `total = Σ price × quantity`.
- **Money math is done in whole centavos** (`Math.round(x * 100)`) to avoid floating-point errors such as `0.1 + 0.2 = 0.30000000000000004`.
- **After payment the sale is locked.** `completedSale` is a snapshot, so the confirmation and receipt never change; the cart and payment form are disabled until "New Transaction".
- **Transaction number** has the format `TXN-YYYYMMDD-HHMMSS` (from the system clock), which is unique per second without a database.
- **Photos fall back to emoji** if an image fails to load (`ProductImage.jsx`).

### Validation rules (`src/utils/validatePayment.js`)

| Input | Result |
| --- | --- |
| Cart is empty | "Your cart is empty. Please add at least one item before paying." |
| Blank, non-numeric (`abc`, `12abc`, `1e3`), negative, more than 2 decimals, or above ₱1,000,000 | "Please enter a valid payment amount." |
| Less than the total | "Insufficient payment. Please enter at least ₱X.XX." |
| Equal to or more than the total | Accepted; change = paid − total |

## 7. Test Cases

Validation results below were produced by running `validatePayment` directly (total = ₱165.00).

| # | Input | Expected | Actual |
| --- | --- | --- | --- |
| 1 | `` (blank) | Invalid-amount message | Pass |
| 2 | `abc` | Invalid-amount message | Pass |
| 3 | `-50` | Invalid-amount message | Pass |
| 4 | `100` | "Insufficient payment. Please enter at least ₱165.00." | Pass |
| 5 | `164.99` | Insufficient payment | Pass |
| 6 | `165` | Accepted, change ₱0.00 | Pass |
| 7 | `200` | Accepted, change ₱35.00 | Pass |
| 8 | ` 200 ` (spaces) | Accepted, change ₱35.00 | Pass |
| 9 | `20.555` | Invalid-amount message | Pass |
| 10 | `1e3` | Invalid-amount message | Pass |
| 11 | Any amount, empty cart | Empty-cart message | Pass |

### Worked example (Scenario 5)

Customer buys 2 Instant Noodles, 1 Soft Drink (Can), and 1 Bottled Water, and pays ₱100.00.

| Item | Qty | Unit Price | Subtotal |
| --- | --- | --- | --- |
| Instant Noodles | 2 | ₱18.00 | ₱36.00 |
| Soft Drink (Can) | 1 | ₱25.00 | ₱25.00 |
| Bottled Water | 1 | ₱20.00 | ₱20.00 |

Total due ₱81.00 · Amount paid ₱100.00 · **Change ₱19.00**

### Manual test script (one full transaction)

1. Open the app; confirm 6 products with prices appear.
2. Click Add on Instant Noodles twice, then Soft Drink and Bottled Water; check the toast and the header cart count.
3. Use + / − and Remove in the cart; confirm subtotals and total update.
4. Click Pay with the field blank, then `abc`, then `-5`, then `50`; confirm each on-screen message.
5. Enter `100`; confirm the confirmation shows the transaction number and change ₱19.00.
6. Check the receipt contents, and that the cart and payment form are locked.
7. Click New Transaction; confirm cart, payment field, and receipt are cleared.

## 8. Repository Structure

```
src/
  App.jsx                  main screen, state, cart logic
  components/              ProductList, ProductImage, Cart, OrderSummary,
                           PaymentForm, PaymentConfirmation, Receipt
  utils/                   validatePayment, transaction, formatPrice
public/images/             product photos
public/logo.svg            CampusMart logo
docs/                      this documentation and AI usage log
```

## 9. Git Commit History (Exam Section IX)

| Commit | Message | Exam requirement |
| --- | --- | --- |
| `6c31464` | Initial commit: Set up project and basic interface | Initial commit for setup and basic interface |
| `9f09e33` | Add product list and basic user interface | Interface |
| `cd10e2c` | Implement cart and order calculations | Core ordering and computation |
| `98946cb` | Add payment validation and digital receipt | Validation |
| `be8e569` | Add product photos, logo, and UI animations | Final improvements |
| `fcc3ba2` | Fix bugs and improve application | Debugging |
| `07de899` | Add README and credits | README / documentation |

## 10. Submission Checklist (Exam Section X–XI)

- [ ] Source code
- [ ] GitHub repository link
- [ ] AI-assisted development documentation (`docs/AI_USAGE.md`, at least 2 prompts)
- [ ] Screenshots: product list, cart, payment, receipt
- [ ] Screenshot: GitHub commit history
- [ ] One full transaction tested end to end
- [ ] README product-photo credits filled in (currently `TODO` in `README.md`)
