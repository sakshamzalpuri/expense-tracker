const STORAGE_KEY = "finance-tracker-transactions";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      transactions.length = 0;
      transactions.push(...parsed);
    }
  } catch (_) {
    transactions.length = 0;
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

let transactions = [];

function addTransaction(data) {
  transactions.push(data);
  save();
}

function deleteTransaction(id) {
  const index = transactions.findIndex((t) => t.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
    save();
  }
}

function getTransactions() {
  return transactions;
}

// Load from storage when module runs
load();

export { transactions, addTransaction, deleteTransaction, getTransactions };
