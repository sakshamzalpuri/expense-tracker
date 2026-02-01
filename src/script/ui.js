import { state } from "./state.js";

export function renderExpenses() {
  const tbody = document.getElementById('expenseTable');
  tbody.innerHTML = '';

  state.expenses.forEach(exp => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${exp.name}</td>
      <td>${exp.date}</td>
      <td>
        <span class="${exp.status === 'Pending' ? 'pending' : 'done'}">
          ${exp.status}
        </span>
      </td>
      <td>-$${exp.amount}</td>
    `;

    tbody.appendChild(tr);
  });
}
renderExpenses()