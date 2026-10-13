# AI Usage Documentation

**Project:** CampusMart POS (Scenario 5: Campus Convenience Store POS)

**Members:**

- Cyrel Jave M. Morales
- Syclops S. Lariosa

**Repository:** <https://github.com/Ajjime/Scenario-5-Campus-Convenience-Store-POS>

Each prompt below is copied word for word from the Claude Code session, in the order it was sent.

---

## Prompt 1

**Prompt Used**

> /pos-ui-design Act as a senior front-end developer and UI/UX designer who teaches beginners. Set up a React (Vite) project in this folder with Tailwind CSS. Then build the layout for a Campus Convenience Store POS (point-of-sale) app for a desktop browser with these components in src/components: ProductList, Cart, OrderSummary, PaymentForm, PaymentConfirmation, and Receipt, all shown in App.jsx. Layout only, with placeholder text and no logic yet. Run the dev server and the build to confirm everything works. Keep the code simple and add short comments so a student can explain it. Do not commit or push.

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 2

**Prompt Used**

> okay run this on my browser

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 3

**Prompt Used**

> do this

*Attachment (not part of the prompt text): a screenshot titled "Git, once the app runs:" showing these commands:*

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit: Set up project and basic interface"
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 4

**Prompt Used**

> https://github.com/Ajjime/Scenario-5-Campus-Convenience-Store-POS

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 5

**Prompt Used**

```text
PS C:\exam\exam_IT414> git push -u origin main
>> 
To https://github.com/Ajjime/Scenario-5-Campus-Convenience-Store-POS.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/Ajjime/Scenario-5-Campus-Convenience-Store-POS.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally. This is usually caused by another repository pushing to
hint: the same ref. If you want to integrate the remote changes, use
hint: 'git pull' before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 6

**Prompt Used**

> done?

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 7

**Prompt Used**

> done whats next?

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 8

**Prompt Used**

> done whats next?

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 9

**Prompt Used**

> Act as a beginner-friendly React developer. Add a hard-coded products array with these items: Instant Noodles ₱18, Potato Chips ₱25, Soft Drink (Can) ₱25, Bottled Water ₱20, Ballpen (piece) ₱12, Notebook (piece) ₱35. Show them in ProductList as a responsive grid of cards with the name, the price formatted as ₱0.00, and an Add to Cart button. The buttons don't need to work yet. Explain what you changed and how props are passed to ProductList. Do not commit.

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 10

**Prompt Used**

> Act as an experienced React developer building a POS system. Keep the cart state in App.jsx with useState. Add to Cart should add the item, or increase its quantity if it's already in the cart. In Cart, show each item's name, unit price, quantity, and subtotal, with + and − buttons and a Remove button. Quantity must never be zero or negative: remove the item instead. In OrderSummary, list every item with its quantity and subtotal and show the total amount, updating automatically whenever the cart changes. Subtotal = unit price × quantity. Total = sum of all subtotals. Show a short success message such as "Instant Noodles added to cart." Run the build to check for errors, and explain how the state flows between components. Do not commit.

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 11

**Prompt Used**

> Act as a software engineer who specializes in form validation and money calculations. In PaymentForm, add a text input for the cash amount and a Confirm Payment button. Validate the amount using exactly these messages. For a blank, non-numeric, or negative entry, show: "Please enter a valid payment amount." If the amount is less than the total, show: "Insufficient payment. Please enter at least ₱X." where X is the actual total. If the cart is empty, show an error that says to add at least one item. For a valid, sufficient amount, compute change = amount paid − total. Show errors on the page, not in alert boxes. Explain how each validation check works. Do not commit.

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 12

**Prompt Used**

> Act as a POS system developer at a retail company. After a successful payment, first show PaymentConfirmation with the transaction number, date and time, total amount, amount paid, and change. Then show Receipt with the transaction number, date and time, each purchased item with quantity, unit price, and subtotal, the total amount due, the amount paid, the change, and a payment confirmation message. Lock the cart and payment input after payment. Add a New Transaction button that clears the cart, payment input, error messages, confirmation, and receipt. Run the build to check for errors. Do not commit.

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 13

**Prompt Used**

> /pos-ui-design Act as a senior UI/UX designer, brand designer, and creative front-end developer at a modern product studio. My POS app now has real product photos in public/images/: instant-noodles.jpg, potato-chips.jpg, soft-drink.jpg, bottled-water.jpg, ballpen.jpg, notebook.jpg. Make the whole app look polished, modern, and professional. You decide the best improvements, but include these:
>
> 1. Product photos: add an image field to each product in the products array. Show the photos on product cards (consistent aspect ratio, object-cover, rounded corners, lazy loading, meaningful alt text), as small thumbnails in the cart rows, and as thumbnails on the receipt. If an image fails to load, fall back to a matching emoji so the layout never breaks.
>
> 2. System logo: design an original logo for the store, a simple, modern mark with the name "CampusMart" (a convenience store brand) as an inline SVG. Do not copy or imitate any existing brand's logo. Save it as public/logo.svg, use it in the header next to the store name, as the browser tab favicon, and at the top of the digital receipt. Update the page title in index.html to the store name.
>
> 3. Animations (Tailwind classes and small CSS keyframes only, no new animation libraries): product cards lift on hover with a subtle image zoom, buttons scale slightly when pressed, new cart items slide in and removed items fade out, the cart count badge pops when it changes, the total briefly highlights when it updates, error messages shake gently, success messages slide in, the Payment Confirmation shows an animated checkmark, and the Receipt slides up smoothly. Respect prefers-reduced-motion.
>
> 4. Polish: a refined header with the logo and a cart count, better typography and spacing, subtle gradients, clear focus states, a friendly empty-cart state, a receipt styled like paper with a torn edge and dashed dividers, and a clean responsive layout.
>
> 5. Keep it working: change only the UI. Do not change the logic, state, calculations, validation rules, or the exact validation message text. Don't add heavy dependencies. Keep the code simple and commented so a student can explain it.
>
> Run the build when you're done, then summarize what you changed and where the images, logo, and animations are handled. Do not commit.

*Attachment (not part of the prompt text): six product images (a ballpen, attached twice; potato chips; a soft drink can; bottled water; a sheet of notebook paper).*

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 14

**Prompt Used**

> Act as a strict QA tester and code reviewer. Review the whole project and test these cases: a blank payment, spaces only, "abc", "-5", "1e3", an amount below the total, an exact payment, a payment above the total, an empty cart, removing an item at quantity 1, clicking + and − many times, and starting a new transaction after a receipt. Also check that the product photos, logo, and fallback emojis still load after the UI changes. For each bug, list what is wrong and why, then fix it and explain the fix. Run the build when you're done. Do not commit.

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 15

**Prompt Used**

> replace this on instant noodles image

*Attachment (not part of the prompt text): one image of a Quickchow Instant Mami (beef flavor) noodle pack.*

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 16

**Prompt Used**

> Act as the examiner who grades the IT 415 Midterm Practical Exam. Check my app against this list and report PASS or FAIL for each item with a one-line reason. For any FAIL, fix it and explain the change.
> 1. At least five products with names and prices in ₱ are displayed.
> 2. Products can be added to the cart with on-screen buttons.
> 3. Quantities can be increased and decreased, and an item can be removed.
> 4. Subtotals and the total update automatically whenever the cart changes.
> 5. A clear order summary shows all items in the cart.
> 6. Cash payment is entered in an input field.
> 7. Blank, non-numeric, and negative payments show exactly: "Please enter a valid payment amount."
> 8. An insufficient payment shows exactly: "Insufficient payment. Please enter at least ₱X." with the actual total.
> 9. Change = Amount Paid − Total Amount is computed correctly.
> 10. A payment confirmation is displayed after successful payment.
> 11. The digital receipt shows the items, quantities, unit prices, subtotals, total, amount paid, change, and a transaction number.
> 12. New Transaction clears the cart, payment amount, messages, and receipt.
>
> Use this worked example to test: 2 items at ₱25 and 1 item at ₱35 gives a total of ₱85; paying ₱100 gives ₱15 change. Do not commit.

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 17

**Prompt Used**

> Act as a technical writer. Write a short README.md for this project with the title, a description, the feature list, the product list with prices, the tech stack (React, Vite, Tailwind CSS), how to run it (npm install, then npm run dev), and a Credits section listing the product photo sources and photographers: [paste your list here]. Note that the logo is an original design made for this project. Keep it simple and clear.

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 18

**Prompt Used**

> Act as a technical writer. Format the following into the AI usage documentation table with these fields for each entry: Prompt Used, Purpose, AI Response (summary), Your Evaluation, Modifications Made. Do not change my wording or invent anything. Here are my entries: [paste your prompts, your own summaries, evaluations, and modifications].

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**

---

## Prompt 19

**Prompt Used**

> Yes. Fill in the "Prompt Used" column with my prompts from this session, word for word, one entry per prompt. Leave the other four fields blank for me to write. Use a separate section for each prompt instead of one wide table, because my prompts are long. Save it as AI_USAGE.md in the project root.

**Purpose**

**AI Response (summary)**

**Your Evaluation**

**Modifications Made**
