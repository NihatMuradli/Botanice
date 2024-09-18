document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.querySelector('#form');

    signUpForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.querySelector('#username').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;

        try {
            const isUsernameAvailable = await checkUsernameAvailability(username);

            if (!isUsernameAvailable) {
                const alertBox = document.querySelector('#alertBox')
                const alertText = document.querySelector('#alertText')
                alertText.innerHTML = "Username is already taken";
                alertBox.classList.add('active');
                const alert = document.querySelector(".alert"),
                    deleteBtn = document.querySelector(".delete-btn");
                let classList;

                deleteBtn.addEventListener("click", () => {
                    classList = alert.classList.toString();
                    if (classList.indexOf("active") >= -1) alert.classList.remove("active");
                });
            }

            const userAccount = { username, email, password, confirmPassword };

            const createdAccount = await registerUserAccount(userAccount);

            const alertBox = document.querySelector('#alertBox')
                const alertText = document.querySelector('#alertText')
                alertText.innerHTML = "Singed Up Successfully";
                alertBox.classList.add('active');
                const alert = document.querySelector(".alert"),
                    deleteBtn = document.querySelector(".delete-btn");
                let classList;

                deleteBtn.addEventListener("click", () => {
                    classList = alert.classList.toString();
                    if (classList.indexOf("active") >= -1) alert.classList.remove("active");
                });
                setTimeout(() => {
                    location.replace("templates/login.html");
                }, 1500);
            console.log('Created User Account:', createdAccount);
        } catch (error) {
            console.error('Error during sign up:', error);
            const alertBox = document.querySelector('#alertBox')
            const alertText = document.querySelector('#alertText')
            alertText.innerHTML = "Username is already taken";
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

    async function checkUsernameAvailability(username) {
        try {
            const response = await fetch(`http://localhost:5000/api/users/checkUsername/${username}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking username availability:', error);
            throw error;
        }
    }


    async function registerUserAccount(userAccount) {
        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userAccount),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error during registration. Server response: ${errorText}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error registering user account:', error);
            throw new Error('Error registering user account');
        }
    }
});
