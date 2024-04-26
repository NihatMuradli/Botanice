document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('sign-up');

    signUpForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const isUsernameAvailable = await checkUsernameAvailability(username);

            if (!isUsernameAvailable) {
                Swal.fire({
                    icon: "error",
                    title: "Username",
                    text: "Username is already in use",
                    timer: 1200
                }).then(() => {
                    location.reload();
                });
                return;
            }

            const shopId = await createShop(name, phone);
            const shopAccount = { username, password, shop: { id: shopId } };

            const createdAccount = await registerShopAccount(shopAccount);

            Swal.fire({
                icon: "success",
                title: "Account",
                text: "Accouns registered successfully. You can log in.",
                timer: 1500
            }).then(() => {
                location.replace("login.html");
            });
            console.log('Created Shop Account:', createdAccount);
        } catch (error) {
            console.error('Error during sign up:', error);
            alert('Error during sign up. Please try again.');
        }
    });

    async function checkUsernameAvailability(username) {
        try {
            const response = await fetch(`http://localhost:5000/api/shop/accounts/checkUsername/${username}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking username availability:', error);
            throw error;
        }
    }

    async function createShop(name, phone) {
        try {
            const response = await fetch('http://localhost:5000/api/shops/addShop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, phoneNumber: phone }),
            });

            const data = await response.json();
            return data.id;
        } catch (error) {
            console.error('Error creating shop:', error);
            throw error;
        }
    }

    async function registerShopAccount(shopAccount) {
        try {
            const response = await fetch('http://localhost:5000/api/shop/accounts/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shopAccount),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error during registration. Server response: ${errorText}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error registering shop account:', error);
            throw new Error('Error registering shop account');
        }
    }
});
