# AI-Assisted Development Log (Exam Section VIII)

The exam requires at least **two** separate AI prompts, each documented with the five fields below. Fill in your **real** prompts and the AI's actual responses: this must reflect what you really did, and you may be asked to explain the code during checking.

> Suggested pairing: one prompt for **building a feature** and one for **debugging or refactoring**. Your commit history shows where each could fit (e.g. `98946cb` payment validation; `fcc3ba2` "Fix bugs and improve application").

---

## AI Tool Used

<!-- e.g. Claude Code, ChatGPT, GitHub Copilot -->
TODO

---

## Prompt 1 — Building a feature

| Field | Your entry |
| --- | --- |
| **Prompt used** (exact text) | TODO: paste the exact prompt |
| **Purpose of the prompt** | TODO: e.g. "Generate the cart add/increase/decrease/remove logic and total computation" |
| **AI response (summary or screenshot)** | TODO |
| **Your evaluation** (correct / partially correct / incorrect, and why) | TODO |
| **Modifications you made** | TODO |

## Prompt 2 — Debugging or refactoring

| Field | Your entry |
| --- | --- |
| **Prompt used** (exact text) | TODO |
| **Purpose of the prompt** | TODO: e.g. "Debug why a payment of `-0` or `1e3` was accepted" |
| **AI response (summary or screenshot)** | TODO |
| **Your evaluation** | TODO |
| **Modifications you made** | TODO |

## Additional prompts (optional)

Copy the table above for each extra prompt.

---

## Code Explanation Notes (for the checking session)

Be ready to explain these AI-assisted parts in your own words.

| Code | What it does |
| --- | --- |
| `addToCart` (`src/App.jsx`) | If the product is already in the cart, raises its quantity by 1; otherwise adds `{ ...product, quantity: 1 }`. |
| `decreaseQuantity` | Subtracts 1 with `.map`, then `.filter` drops any item whose quantity reached 0. |
| `total = cart.reduce(...)` | Adds price × quantity for every cart item; recalculated each render so it is never stale. |
| `validatePayment` (`src/utils/validatePayment.js`) | Runs the checks in order (empty cart, blank, number format, negative, too large, insufficient) and returns `{ error }` or `{ amountPaid, change }`. |
| Regex `/^-?\d+(\.\d{1,2})?$/` | Allows digits with an optional leading minus and at most 2 decimals; rejects `abc`, `12abc`, `1e3`, `20.555`. |
| Centavo math (`Math.round(x * 100)`) | Compares and subtracts whole centavos to avoid floating-point errors. |
| `completedSale` snapshot | Saved at payment time so the confirmation and receipt cannot change afterward, and it locks the cart and payment form. |
| `paymentFormKey` | Changing the React `key` remounts `PaymentForm`, clearing the input and errors on New Transaction. |
| `createTransactionNumber` (`src/utils/transaction.js`) | Builds `TXN-YYYYMMDD-HHMMSS` from the current date and time. |
