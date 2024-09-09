document.addEventListener('DOMContentLoaded', async function () {
    const loggedHeader = document.querySelector(".header");
    const userName = document.querySelector(".username .name");
    const accountBtn = document.querySelector(".user");
    const userConatiner = document.querySelector(".user-container");
    const user = document.querySelector(".user");

    accountBtn.addEventListener("click", ()=>{
        if(userConatiner.classList.contains("active")){
            userConatiner.classList.remove("active");
            userConatiner.classList.add("remove");
            user.classList.remove("active");
            user.classList.add("remove");
        }else{
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

            if (response.ok) {
                // add user name to class
                //userName.innerHTML = 
                loggedHeader.classList.add("logged");
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

