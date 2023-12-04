console.log("login script loaded");
const apiAuthUrl = "http://localhost:2941/auth/login";
var isLoggedIn = false;

const handleLogin = function () {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const credentials = {
        username: usernameInput,
        password: passwordInput
    };

    // Send a POST request to the authentication API
    fetch(apiAuthUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Check the response from the API for successful login
        if (data.success) {
            // Authentication successful
            alert("Login successful!");
            // Add logic to redirect to the authenticated section of your app or perform other actions.
        } else {
            // Authentication failed
            alert("Invalid username or password. Please try again.");
            // Clear the input fields
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error during login.');
    });
};

