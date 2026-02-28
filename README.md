# Finance Tracker

A simple, vanilla JavaScript expense tracker. Add income and expenses, see your balance at a glance, and keep everything in Indian Rupees (₹). Data is saved in your browser so it persists across sessions.

## Features

- **Add transactions** — Income or expense with name, amount, date, and category (Food, Shopping, Salary)
- **Summary** — Total balance, total income, and total expense updated in real time
- **Transaction list** — All entries with amount, date, and category; income in green, expenses in red
- **Delete** — Remove any transaction with one click (×)
- **Persistence** — Stored in `localStorage`; no server or sign-in required
- **Currency** — All amounts in Indian Rupees (₹)

## How to run

1. Clone or download this repo.
2. Open `index.html` in a browser (double-click or use a local server).
3. OR https://sakshamzalpuri.github.io/expense-tracker/

No build step or dependencies. Plain HTML, CSS, and ES modules.

## Project structure

```
expense tracker/
├── index.html              # App shell and form modal
├── README.md
└── src/
    ├── script/
    │   ├── main.js         # Entry point, DOM setup, default date
    │   ├── state.js        # Transactions array, localStorage, add/delete
    │   └── ui.js           # Form open/close, submit, render list, summary
    └── styles/
        ├── variables.css   # Colors, radius, etc.
        ├── base.css        # Reset, body, max-width
        ├── layout.css      # App container, navbar, form overlay
        └── components.css  # Summary, list, form, buttons
```

## Tech

- **HTML** — Semantic structure, form with type toggle
- **CSS** — Custom properties, grid/flex, dark theme
- **JavaScript** — ES modules, no frameworks; state in memory + localStorage
