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

const ExpIncBtn = document.querySelector(".buttons")

ExpIncBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("income") || (e.target.classList.contains("expense"))) {
    const form = document.querySelector(".toggle-form");
    if(form){
      form.classList.toggle("toggle-form");
    }
    if(!form.classList.contains("toggle-form")){
      const closeBtn = document.querySelector(".cross-form")
      if(closeBtn){
        closeBtn.addEventListener("click",()=>{
          form.classList.add("toggle-form")
        })
      }
    }
  }
})