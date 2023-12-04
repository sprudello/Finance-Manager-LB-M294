document.addEventListener("DOMContentLoaded", () => {
    const newTransaction = document.getElementById("createTransaction-link");
    const allTransactions = document.getElementById("showTransactions-link");
    const editTransaction = document.getElementById("editTransaction-link");
    const login = document.getElementById("login-link");

    newTransaction.addEventListener("click", (event) => {
        event.preventDefault();
        renderNewTransactionForm();
    });

    allTransactions.addEventListener("click", (event) => {
        event.preventDefault();
        renderAllTransactions();
    });

    editTransaction.addEventListener("click", (event) => {
        event.preventDefault();
        renderEditForm();
    });

    login.addEventListener("click", (event) => {
        event.preventDefault();
        renderLoginForm();
    });
});