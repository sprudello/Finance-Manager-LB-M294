console.log("transactionManager Loaded");

document.addEventListener("DOMContentLoaded", () => {
    const mainSection = document.getElementById("content");
    const newTransaction = document.getElementById("createTransaction-link");
    const allTransactions = document.getElementById("showTransactions-link");
    const editTransaction = document.getElementById("editTransaction-link");
    const saveForm = null;
    const apiUrl = 'http://localhost:2940/api/v1/entities';

    const showNewTransactionForm = function(){
        const formHTML = `
        <h2>New Transaction</h2>
        <form id="transaction-form">
            <label for="transaction-date">Date: </label>
            <input type="date" id="transaction-date" name="date" required><br><br>

            <label for="expense-type">Type: </label>
            <select id="expense-type" name="type" required>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>

            <label for="amount">Amount: </label>
            <input type="number" id="amount" name="amount" min="0" required><br><br>

            <label for="description">Text: </label>
            <input type="text" id="description" name="description" placeholder="42" required><br><br>

            <input type="submit" id="submit" value="Save Entry">
        </form>
        `;
        
        mainSection.innerHTML = formHTML;
        
        document.getElementById("transaction-form").addEventListener('submit', (event) =>{
            event.preventDefault();
            saveTransaction();
        })
    }
    const saveTransaction = function(){
        const executionDate = document.getElementById("transaction-date").value;
            const expenseType = document.getElementById("expense-type").value;
            const amount = document.getElementById("amount").value;
            const description = document.getElementById("description").value;
    
            const transaction = {
                executionDate,
                expenseType,
                amount,
                description
            }
    
            fetch(apiUrl,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transaction)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Antwort von der API:', data);
                alert('Eintrag gespeichert!');
            })
            .catch(error => {
                console.error('Fehler beim Senden der Daten an die API:', error);
                alert('Fehler beim Speichern des Eintrags.');
            });
    
            
            document.getElementById('transaction-form').reset(); 
            alert('Eintrag gespeichert!'); 
    }
    newTransaction.addEventListener("click", (event) => {
        event.preventDefault();
        showNewTransactionForm();
    });

    const showAllTransactions = function () {
        fetch(apiUrl, { method: "GET" })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            const transactionsList = document.createElement("ul");
            data.forEach((transaction) => {
              const listItem = document.createElement("li");
              listItem.textContent = `${transaction.executionDate}, ${transaction.expenseType}, ${transaction.amount}CHF, ${transaction.description}`;
              transactionsList.appendChild(listItem);
            });
      
            mainSection.innerHTML = ""; 
            mainSection.appendChild(transactionsList);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

    allTransactions.addEventListener("click", (event) => {
        event.preventDefault();
        showAllTransactions();
    });

    const loadEditForm = function(){
        const formHTML = `
        <h2>Edit Transaction</h2>
        <form id="edit-transaction-form">
        <label for="transaction-select">Select Transaction:</label>
        <select id="transaction-select" name="transaction" required>
        <!-- Transaction options will be added here -->
        </select>
        <br><br>

            <label for="edit-select">Select Field to Edit:</label>
        <select id="edit-select" name="edit" required>
            <option value="date">Date</option>
            <option value="type">Type</option>
            <option value="amount">Amount</option>
            <option value="description">Description</option>
        </select>
        <br><br>

        <label for="edit-value">Edit Value:</label>
        <input type="text" id="edit-value" name="value" required>
        <br><br>

        <input type="submit" value="Save Changes">
        </form>
        `
        mainSection.innerHTML = formHTML;

        const transactionSelect = document.getElementById("transaction-select");

        // Populate the transaction dropdown with options
        transactions.forEach((transaction) => {
            const option = document.createElement("option");
            option.value = transaction.id;
            option.textContent = `ID: ${transaction.id}, Date: ${transaction.date}, Description: ${transaction.description}`;
            transactionSelect.appendChild(option);
        });
    }

    editTransaction.addEventListener("click", (event) =>{
        event.preventDefault();
        loadEditForm();
        //loadAllTransactions();

    });
});