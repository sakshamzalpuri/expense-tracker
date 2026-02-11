export function handleFormData() {
    const addTransaction = document.getElementById("transactionBtn")
    const transactionForm = document.getElementById("transactionForm")
    const transactionCont = document.querySelector(".toggle-form")

    addTransaction.addEventListener("click", () => {
        if (transactionForm) {
            console.log("working - form dom")
            if (transactionCont.classList.contains("toggle-form")) {
                transactionCont.classList.remove("toggle-form")
                console.log("Working-classlist")
            }
        }
    })
}