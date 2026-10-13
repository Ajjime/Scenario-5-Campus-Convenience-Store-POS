# Scenario-5-Campus-Convenience-Store-POS

A point-of-sale (POS) screen layout for a campus convenience store, built with React (Vite) and Tailwind CSS. This version is layout only: placeholder text, no logic yet.

## Components

All components live in `src/components` and are placed on the page by `src/App.jsx`:

- **ProductList** – search, category buttons, and a grid of products
- **Cart** – items being bought, with quantity buttons
- **OrderSummary** – subtotal, discount, tax, and total
- **PaymentForm** – payment method, amount received, and change
- **PaymentConfirmation** – success message after payment
- **Receipt** – paper-style receipt of the sale

## Run it

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # make a production build in dist/
```
