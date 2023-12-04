// Define a function to handle routing based on the hash fragment
function handleRoute() {
    const hash = window.location.hash;

    // Check the hash and load the corresponding content
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
            // Handle any other routes or the default route
            renderLoginForm();
            break;
    }
}


document.addEventListener("DOMContentLoaded", function(){
    handleRoute(); // Handle the initial route
    window.addEventListener("hashchange", (event) =>{
        event.preventDefault();
        handleRoute();
    });
    initializeApp();
});
