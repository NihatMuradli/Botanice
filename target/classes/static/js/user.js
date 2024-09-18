document.addEventListener('DOMContentLoaded', async function () {
    const loggedHeader = document.querySelector(".header");
    const userName = document.querySelector(".username .name");
    const accountBtn = document.querySelector(".user");
    const userConatiner = document.querySelector(".user-container");
    const user = document.querySelector(".user");
    const logoutButton = document.querySelector(".log-out")

    accountBtn.addEventListener("click", () => {
        if (userConatiner.classList.contains("active")) {
            userConatiner.classList.remove("active");
            userConatiner.classList.add("remove");
            user.classList.remove("active");
            user.classList.add("remove");
        } else {
            userConatiner.classList.add("active");
            userConatiner.classList.remove("remove");
            user.classList.add("active");
            user.classList.remove("remove");
        }
    });

    try {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            const response = await fetch('http://localhost:5000/api/users/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(token)
            if (response.ok) {
                const userData = await response.json();
                const username = userData.username;
                userName.innerHTML = username;
                loggedHeader.classList.add("logged");

                logoutButton.addEventListener('click', function () {

                    localStorage.removeItem('jwtToken');
                    window.location.reload()
                });
            } else {
                //Token is not validated so no user
                console.log("Token is not validated so no user")
            }
        } else {
            // token wasnt found which means no user is logged in
            console.log("token wasnt found which means no user is logged in")
        }

    } catch (error) {
        console.error('Error during validation:', error);
    }
});

