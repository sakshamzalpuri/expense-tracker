import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "./state.js";

export function openForm(transactionForm, transactionCont, openBtn) {
  openBtn.addEventListener("click", () => {
    if (transactionForm && transactionCont.classList.contains("toggle-form")) {
      transactionCont.classList.remove("toggle-form");
    }
  });
}

export function closeForm(transactionCont) {
  const cross = document.querySelector(".cross");
  if (cross) {
    cross.addEventListener("click", () => {
      transactionCont.classList.add("toggle-form");
    });
  }
  // Close when clicking overlay (the form container, not the form itself)
  transactionCont.addEventListener("click", (e) => {
    if (e.target === transactionCont) {
      transactionCont.classList.add("toggle-form");
    }
  });
}

function formatAmount(amount, type) {
  const n = Math.abs(Number(amount)).toFixed(2);
  return type === "income" ? `+₹${n}` : `-₹${n}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function renderTransactionList() {
  const listEl = document.getElementById("transactionList");
  if (!listEl) return;

  const list = getTransactions();
  listEl.innerHTML = "";

  if (list.length === 0) {
    const empty = document.createElement("li");
    empty.className = "transaction-empty";
    empty.textContent = "No transactions yet. Add one above.";
    listEl.appendChild(empty);
    return;
  }

  list.forEach((t) => {
    const li = document.createElement("li");
    li.className = t.type === "income" ? "income" : "expense";

    const title = document.createElement("span");
    title.className = "transaction-title";
    title.textContent = t.title || "Untitled";

    const right = document.createElement("div");
    right.className = "transaction-right";

    const amount = document.createElement("span");
    amount.className = "transaction-amount";
    amount.textContent = formatAmount(t.amount, t.type);

    const meta = document.createElement("span");
    meta.className = "transaction-meta";
    meta.textContent = `${formatDate(t.date)} · ${(t.category || "").charAt(0).toUpperCase() + (t.category || "").slice(1)}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "transaction-delete";
    deleteBtn.setAttribute("aria-label", "Delete transaction");
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener("click", () => {
      deleteTransaction(t.id);
      renderTransactionList();
      updateSummary();
    });

    right.appendChild(amount);
    right.appendChild(meta);
    right.appendChild(deleteBtn);
    li.appendChild(title);
    li.appendChild(right);
    listEl.appendChild(li);
  });
}

export function updateSummary() {
  const list = getTransactions();
  let totalIncome = 0;
  let totalExpense = 0;
  list.forEach((t) => {
    const amt = Number(t.amount) || 0;
    if (t.type === "income") totalIncome += amt;
    else totalExpense += amt;
  });
  const balance = totalIncome - totalExpense;

  const balanceEl = document.getElementById("totalBalance");
  const incomeEl = document.getElementById("totalIncome");
  const expenseEl = document.getElementById("totalExpense");

  if (balanceEl) balanceEl.textContent = `₹${balance.toFixed(2)}`;
  if (incomeEl) incomeEl.textContent = `₹${totalIncome.toFixed(2)}`;
  if (expenseEl) expenseEl.textContent = `₹${totalExpense.toFixed(2)}`;
}

export function handleFormSubmit(transactionForm, transactionCont) {
  const incomeBtn = document.getElementById("income");
  const expenseBtn = document.getElementById("expense");
  let transactionType = "income";

  if (incomeBtn && expenseBtn) {
    incomeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      incomeBtn.classList.add("active");
      expenseBtn.classList.remove("active");
      transactionType = "income";
    });
    expenseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      expenseBtn.classList.add("active");
      incomeBtn.classList.remove("active");
      transactionType = "expense";
    });
  }

  transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(transactionForm);
    const data = Object.fromEntries(formData.entries());
    data.type = transactionType;
    data.amount = Number(data.amount);
    data.id = Date.now();
    addTransaction(data);
    transactionCont.classList.add("toggle-form");
    transactionForm.reset();
    // Restore type toggle to income
    if (incomeBtn) incomeBtn.classList.add("active");
    if (expenseBtn) expenseBtn.classList.remove("active");
    transactionType = "income";
    renderTransactionList();
    updateSummary();
  });
}
