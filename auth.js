console.log("login script loaded");
const apiAuthUrl = "http://localhost:2941/auth/login";
var isLoggedIn = false;

const handleLogin = function () {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // Send a POST request to the authentication API
    fetch(apiAuthUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            alert("Great Success!");
            isLoggedIn = true;
            renderAllTransactions();
        })
        .catch(error => {
            // Handle login failure error message
            console.error('Login error:', error);
            alert('Login fehlgeschlagen. Überprüfe deine Anmeldedaten.');
        });
};

