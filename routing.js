function handleRoute() {
    const hash = window.location.hash;

    switch (hash) {
        case "#login":
            renderLoginForm();
            break;
        case "#allTransactions":
            renderAllTransactions();
            break;
        case "#newTransaction":
            renderNewTransactionForm();
            break;
        case "#editTransactions":
            renderEditForm();
            break;
        default:
            renderLoginForm();
            break;
    }
}


document.addEventListener("DOMContentLoaded", function(){
    handleRoute();
    window.addEventListener("hashchange", (event) =>{
        event.preventDefault();
        handleRoute();
    });
});
