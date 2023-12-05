console.log("transactionManager Loaded");


const saveForm = null;
const apiUrl = 'http://localhost:2940/api/v1/entities';

    
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
    const deleteTransaction = function (transactionId) {
        // Confirm with the user before deleting the transaction
        const confirmDelete = confirm("Are you sure you want to delete this transaction?");
    
        if (!confirmDelete) {
            //If user regrets his desicion
            return;
        }
    
        // Make a DELETE request to remove the transaction
        fetch(`${apiUrl}/${transactionId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Transaction deleted:', data);
            alert('Transaction deleted successfully!');
            renderAllTransactions();
            //After deletion transactions will be relaoded
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting the transaction.');
        });
        
    }
    const saveChanges = function () {
        const selectedTransactionId = document.getElementById("transaction-select").value;
        const editField = document.getElementById("edit-select").value;
        const editValue = document.getElementById("edit-value").value;
    
        const updatedData = {
            [editField]: editValue,
        };
    
        fetch(`${apiUrl}/${selectedTransactionId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Transaction updated:', data);
            alert('Changes saved successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error saving changes.');
        });
    };