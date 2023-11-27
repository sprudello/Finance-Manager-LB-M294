// showEntries.js

window.onload = () => {
    const allTransactionsLink = document.querySelector('a[href="#allTransactions"]');

    allTransactionsLink.addEventListener('click', () => {
        fetch('data.json')
            .then(response => response.json())
            .then(data => displayTransactions(data))
            .catch(error => console.error('Error fetching data:', error));
    });
};

function displayTransactions(transactions) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<h2>All Transactions</h2>';

    const transactionList = document.createElement('ul');

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `Transaction ID: ${transaction.transactionId}, Date: ${transaction.date}, Type: ${transaction.type}, Amount: ${transaction.amount}, Category: ${transaction.category}, Description: ${transaction.description}`;
        transactionList.appendChild(listItem);
    });

    mainContent.appendChild(transactionList);
}
