import {
  openForm,
  closeForm,
  handleFormSubmit,
  renderTransactionList,
  updateSummary,
} from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const transactionForm = document.getElementById("transactionForm");
  const transactionCont = document.querySelector(".form-container");
  const addTransaction = document.getElementById("toggleForm");

  if (!transactionForm || !transactionCont || !addTransaction) {
    console.error("One or more elements not found");
    return;
  }

  // Default date to today
  const dateInput = document.getElementById("date");
  if (dateInput) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }

  openForm(transactionForm, transactionCont, addTransaction);
  closeForm(transactionCont);
  handleFormSubmit(transactionForm, transactionCont);

  renderTransactionList();
  updateSummary();
});
