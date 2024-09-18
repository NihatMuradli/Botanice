document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('#form');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Login failed. Server response: ${errorText}`);
            }

            const data = await response.json();
            const token = data.message;

            localStorage.setItem('jwtToken', token);
            const alertBox = document.querySelector('#alertBox')
            const alertText = document.querySelector('#alertText')
            alertText.innerHTML = "Logged in successfully";
            alertBox.classList.add('active');
            const alert = document.querySelector(".alert"),
            deleteBtn = document.querySelector(".delete-btn");
            let classList;

            deleteBtn.addEventListener("click", () => {
                classList = alert.classList.toString();
                if (classList.indexOf("active") >= -1) alert.classList.remove("active");
            });
            setTimeout(() => {
                location.replace("templates/index.html");
            }, 1500);
            
        } catch (error) {
            console.error('Error during login:', error);
            const alertBox = document.querySelector('#alertBox')
            const alertText = document.querySelector('#alertText')
            alertText.innerHTML = "Username or Password is incorrect";
            alertBox.classList.add('active');
            const alert = document.querySelector(".alert"),
            deleteBtn = document.querySelector(".delete-btn");
            let classList;

            deleteBtn.addEventListener("click", () => {
                classList = alert.classList.toString();
                if (classList.indexOf("active") >= -1) alert.classList.remove("active");
            });
        }
    });
});