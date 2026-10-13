# CampusMart POS

**Scenario 5: Campus Convenience Store POS**

CampusMart is a point-of-sale (POS) web app for a campus convenience store. A cashier adds products to a cart, takes a cash payment, and gets a digital receipt. It runs in a desktop browser.

**Live Demo:** https://ajjime.github.io/Scenario-5-Campus-Convenience-Store-POS/

## Features

- Product grid with photos, names, and prices in ₱
- Add to cart; increase or decrease quantities; remove items
- Subtotals and total update automatically
- Order summary listing every item in the cart
- Cash payment with validation:
  - Blank, non-numeric, or negative amounts: "Please enter a valid payment amount."
  - Too little cash: "Insufficient payment. Please enter at least ₱X."
- Change calculation (Change = Amount Paid − Total)
- Payment confirmation with a transaction number, date, and time
- Digital receipt with items, quantities, unit prices, subtotals, total, amount paid, and change
- Cart and payment lock after payment; **New Transaction** starts over

## Products

| Product          | Price  |
| ---------------- | ------ |
| Instant Noodles  | ₱18.00 |
| Potato Chips     | ₱25.00 |
| Soft Drink (Can) | ₱25.00 |
| Bottled Water    | ₱20.00 |
| Ballpen (piece)  | ₱12.00 |
| Notebook (piece) | ₱35.00 |

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## How to Run

You need [Node.js](https://nodejs.org/) installed.

```bash
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

## Credits

### Product photos

<!-- TODO: fill in where each photo came from and who took it -->

| Product          | File                                 | Source | Photographer |
| ---------------- | ------------------------------------ | ------ | ------------ |
| Instant Noodles  | `public/images/instant-noodles.jpg`  | TODO   | TODO         |
| Potato Chips     | `public/images/potato-chips.jpg`     | TODO   | TODO         |
| Soft Drink (Can) | `public/images/soft-drink.jpg`       | TODO   | TODO         |
| Bottled Water    | `public/images/bottled-water.jpg`    | TODO   | TODO         |
| Ballpen (piece)  | `public/images/ballpen.jpg`          | TODO   | TODO         |
| Notebook (piece) | `public/images/notebook.jpg`         | TODO   | TODO         |

### Logo

The CampusMart logo (`public/logo.svg`) is an original design made for this project.
