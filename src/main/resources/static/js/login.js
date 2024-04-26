document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('log-in');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/api/shop/accounts/login', {
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
            Swal.fire({
                icon: "success",
                title: "Account",
                text: "Accouns registered successfully. You can log in.",
                timer: 1500
            }).then(() => {
                location.replace("index.html");
            });
        } catch (error) {
            console.error('Error during login:', error);
            const dangerAlert = document.getElementById('dangerAlert');
            dangerAlert.textContent = 'İstifadəçi adı və ya parol səhvdir.';
            dangerAlert.classList.remove('d-none');
        }
    });
});
