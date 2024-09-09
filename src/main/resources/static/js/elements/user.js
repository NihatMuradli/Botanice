document.addEventListener('DOMContentLoaded', async function () {
    const loggedHeader = document.querySelector(".header");
    loggedHeader.classList.add("logged");



    try {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            const response = await fetch('http://localhost:5000/api/users/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                //User exists
                alert("+")
            } else {
                //Token is not validated so no user
                alert("-")
            }
        } else {
            // token wasnt found which means no user is logged in
            alert("-")
        }

    } catch (error) {
        console.error('Error during validation:', error);
    }
});
