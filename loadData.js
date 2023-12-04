

const mainSection = function(){
  return document.getElementById("content")
}
const renderNewTransactionForm = function(){
  if(isLoggedIn){
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
    
    mainSection().innerHTML = formHTML;
    
    document.getElementById("transaction-form").addEventListener('submit', (event) =>{
        event.preventDefault();
        saveTransaction();
    })
  }
  else{
    renderLoginForm();
  }
}

const renderEditForm = function(){
  if(isLoggedIn){
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
        <option value="executionDate">Date</option>
        <option value="expenseType">Type</option>
        <option value="amount">Amount</option>
        <option value="description">Description</option>
    </select>
    <br><br>

    <label for="edit-value">Edit Value:</label>
    <input type="text" id="edit-value" name="value" required>
    <br><br>

    <input type="submit" id="save-changes-button" value="Save Changes">
    </form>
    `
    mainSection().innerHTML = formHTML;
    renderEditFormOptions(); 
    const saveChangesButton = document.getElementById("save-changes-button");
        saveChangesButton.addEventListener("click", function (event) {
        event.preventDefault();
        // Handle the save changes logic here
        saveChanges();
    }); 
  }
  else{
    renderLoginForm();
  }

const renderEditFormOptions = function(){
  const transactionSelect = document.getElementById("transaction-select");

  // Fetch data from the API using the apiUrl
  fetch(apiUrl, { method: "GET" })
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then((data) => {
          // Iterate through the fetched data and create options for the select element
          data.forEach((transaction) => {
              const option = document.createElement("option");
              option.value = transaction.id; // Use a unique identifier for each transaction
              option.textContent = `ID: ${transaction.id}, Date: ${transaction.executionDate}, Description: ${transaction.description}`;
              transactionSelect.appendChild(option);
          });
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }
    
}

const renderAllTransactions = function () {
  if(isLoggedIn){
    fetch(apiUrl, { method: "GET" })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        const transactionsList = document.createElement("ul");
        let transactionsHTML = ""; // Create an empty string to store the HTML

        data.forEach((transaction) => {
            transactionsHTML += `
                <li>
                    ${transaction.executionDate}, ${transaction.expenseType}, ${transaction.amount}CHF, ${transaction.description}
                    <button class="delete-button" data-transaction-id="${transaction.id}">Delete</button>
                </li>
            `;
        });

        transactionsList.innerHTML = transactionsHTML; // Set the HTML directly

        // Clear existing content in mainSection and set the new list
        mainSection().innerHTML = "";
        mainSection().appendChild(transactionsList);

        // Add event listeners to the delete buttons
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const transactionId = button.getAttribute("data-transaction-id");
                deleteTransaction(transactionId);
            });
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }else{
    renderLoginForm();
  }
}


const renderLoginForm = function () {
  const form = document.createElement("form");
  form.id = "login-form";
  form.innerHTML = `
      <h2>Login</h2>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required><br><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br><br>
      <button type="button" id="login-button">Login</button>
  `;

  // Attach a click event handler to the login button
  const loginButton = form.querySelector("#login-button");
  loginButton.addEventListener("click", (event) => {
      event.preventDefault();
      handleLogin();
  });

  // Clear the content section and append the form
  mainSection().innerHTML = "";
  mainSection().appendChild(form);
}


