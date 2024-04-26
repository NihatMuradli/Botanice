document.addEventListener('DOMContentLoaded', async function () {
    const myComputersLink = document.getElementById('myComputers');
    const logoutButton = document.getElementById('logout');
    const loginLink = document.getElementById('loginlink');
    const ordersButon = document.getElementById('orders');
    const userTitleSpan = document.getElementById('userTitle');

    try {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            const response = await fetch('http://localhost:5000/api/shop/accounts/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                myComputersLink.classList.remove('d-none');
                logoutButton.classList.remove('d-none');
                ordersButon.classList.remove('d-none')
                loginLink.classList.add('d-none');

                const userData = await response.json();
                const username = userData.username;
                userTitleSpan.textContent = username;


                logoutButton.addEventListener('click', function () {

                    localStorage.removeItem('jwtToken');

                    window.location.href = 'login.html';
                });
            } else {

                myComputersLink.classList.add('d-none');
                logoutButton.classList.add('d-none');
                ordersButon.classList.add('d-none')
                loginLink.classList.remove('d-none');
            }
        } else {
            myComputersLink.classList.add('d-none');
            logoutButton.classList.add('d-none');
            ordersButon.classList.add('d-none')
            loginLink.classList.remove('d-none');
        }

    } catch (error) {
        console.error('Error during validation:', error);
    }
});
