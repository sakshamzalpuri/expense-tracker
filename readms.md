# Expense Tracker - Development Guide

## PHASE 1 — THINK FIRST (no code yet)

### 1. Define the DATA (most important)

**Decide this before writing JS.**

**Transaction object:**
- `id`
- `description`
- `amount`
- `type` (income | expense)
- `category`
- `date` (ISO string)

> If this feels "extra", that's your beginner instinct talking.

### 2. Define the STATE

**Single source of truth:**
- `transactions: []`
- `filters: { month, type }`
- `currency`

Nothing else lives in memory.

### 3. Define USER ACTIONS

**List them clearly:**
- add transaction
- delete transaction
- edit transaction
- undo delete
- filter transactions
- calculate summary

> If an action isn't listed, it doesn't exist.

---

## PHASE 2 — FILE STRUCTURE (MANDATORY)

```
/src
  ├── state.js        // data + mutations
  ├── storage.js      // localStorage only
  ├── ui.js           // DOM updates only
  ├── utils.js        // helpers (format, ids)
  └── main.js         // glue (event listeners)
index.html
style.css
```

> **Warning:** If you dump everything into one file again, stop here.

---

## PHASE 3 — BUILD ORDER (DO NOT CHANGE)

### Step 1: State layer

**Pointers:**
- no DOM
- no localStorage
- pure JS

**Functions:**
- `addTransaction`
- `removeTransaction`
- `updateTransaction`
- `getSummary`

**Test with `console.log` only.**

### Step 2: Storage layer

**Pointers:**
- `saveState()`
- `loadState()`
- key name defined once (no typos)

> If storage breaks, UI should still work.

### Step 3: UI rendering

**Pointers:**
- `renderList()`
- `renderSummary()`
- `renderEmptyState()`

> UI reads state, never modifies it directly.

### Step 4: Events

**Pointers:**
- one submit handler
- one delegated click handler
- zero inline events

**Flow:**  
Events → state → UI → storage  
*Always in this order.*

---

## PHASE 4 — FEATURES (NO SKIPPING)

**Implement in this exact sequence:**

1. Add transaction
2. Delete transaction
3. Persist on reload
4. Edit transaction
5. Undo delete (timeout-based)
6. Monthly filter
7. Category totals

> Each step must work before moving on.

---

## PHASE 5 — QUALITY CHECK (THIS IS WHERE YOU LEVEL UP)

**Before calling it "done", answer YES to all:**

- ✅ Can I explain data flow without code?
- ✅ Can I change storage to IndexedDB later?
- ✅ Can I add charts without touching state logic?
- ✅ Did I catch my own bugs?

> If not, it's still basic.

---

WHAT YOU’RE ACTUALLY TRAINING HERE

Not JS syntax.
You already know that.

**You're training:**
- thinking before coding
- system design at small scale
- discipline
- professional habits

> This is what you're missing — not tutorials.