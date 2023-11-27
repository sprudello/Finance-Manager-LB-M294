console.log("Script loaded"); // Add this line to check if the script is loaded

window.onload = () => {
    navigateTo(location.hash || '#allTransactions');
};

window.onhashchange = () => {
    navigateTo(location.hash);
};

const apiLink = 'http://localhost:2940/api/v1/entities'; // Your Docker API endpoint

function navigateTo(hash) {
    switch (hash) {
        case '#allTransactions':
            document.getElementById('main-content').innerHTML = '<h2>All Transactions</h2>';
            // Here you can implement the function to display all transactions.
            break;
        case '#editTransactions':
            document.getElementById('main-content').innerHTML = '<h2>Change / Delete Transactions</h2>';
            // Here you can implement the function to change/delete transactions.
            break;
        case '#newTransaction':
            renderTransactionForm(); // Display a form when "#newTransaction" is selected
            break;
        default:
            document.getElementById('main-content').innerHTML = '<h2>404 - Page Not Found</h2>';
    }
}

function renderTransactionForm() {
    const uniqueId = Date.now(); // Generate a unique ID based on the current timestamp

    const formHTML = `
        <h2>New Transaction</h2>
        <form id="transaction-form-${uniqueId}">
            <input type="hidden" id="transactionId-${uniqueId}" name="transactionId" value="${uniqueId}">
            <label for="date-${uniqueId}">Date:</label>
            <input type="date" id="date-${uniqueId}" name="date" required><br><br>

            <label for="type-${uniqueId}">Type:</label>
            <input type="text" id="type-${uniqueId}" name="type" required><br><br>

            <label for="amount-${uniqueId}">Amount:</label>
            <input type="number" id="amount-${uniqueId}" name="amount" required><br><br>

            <label for="category-${uniqueId}">Category:</label>
            <input type="text" id="category-${uniqueId}" name="category" required><br><br>

            <label for="description-${uniqueId}">Description:</label>
            <input type="text" id="description-${uniqueId}" name="description" required><br><br>

            <input type="submit" value="Save Transaction">
        </form>
    `;

    document.getElementById('main-content').innerHTML = formHTML;

    // Event listener for the form submission
    document.getElementById(`transaction-form-${uniqueId}`).addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form behavior (page reload)

        // Collect data from the form using the generated IDs
        const transactionId = document.getElementById(`transactionId-${uniqueId}`).value;
        const date = document.getElementById(`date-${uniqueId}`).value;
        const type = document.getElementById(`type-${uniqueId}`).value;
        const amount = document.getElementById(`amount-${uniqueId}`).value;
        const category = document.getElementById(`category-${uniqueId}`).value;
        const description = document.getElementById(`description-${uniqueId}`).value;

        // Create a JSON object for the new transaction
        const newTransaction = {
            transactionId,
            date,
            type,
            amount,
            category,
            description
        };

        // Send a POST request to your Docker API to add the new transaction
        fetch(apiLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTransaction),
        })
        .then(response => {
            if (response.ok) {
                // Transaction was successfully added on the server
                document.getElementById(`transaction-form-${uniqueId}`).reset(); // Reset the form
                alert('Transaction saved on the server!');
            } else {
                // Handle errors if the request fails
                console.error('Error adding transaction:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error adding transaction:', error);
        });
    });
}
