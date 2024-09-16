document.addEventListener('DOMContentLoaded', async function () {
    const registerForm = document.querySelector('#form');
    const flowerID = document.querySelector('#flower-id');
    const addBtn = document.querySelector(".add-card");
    const backBlur = document.querySelector(".back-blur");
    const modal = document.querySelector(".add-modal");
    const body = document.querySelector("body");

    addBtn.addEventListener("click", () => {
        if (!backBlur.classList.contains("active")) {
            backBlur.classList.add("active");
        }
        if (!modal.classList.contains("active")) {
            modal.classList.add("active");
        }
        if (!body.classList.contains("no-scroll")) {
            body.classList.add("no-scroll");
        }
    });

    const modalHeadBtn = document.querySelector(".modal-header-btn");
    const cancelBtn = document.querySelector(".cancel");
    const submitBtn = document.querySelector(".submit");
    const Btns = [modalHeadBtn, submitBtn, cancelBtn];

    Btns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (backBlur.classList.contains("active")) {
                backBlur.classList.remove("active");
                backBlur.classList.add("remove");
                setTimeout(() => {
                    backBlur.classList.remove("remove");
                }, 2000);
            }
            if (modal.classList.contains("active")) {
                modal.classList.remove("active");
                modal.classList.add("remove");
                setTimeout(() => {
                    modal.classList.remove("remove");
                }, 2000);
            }
            if (body.classList.contains("no-scroll")) {
                body.classList.remove("no-scroll");
            }
        });
    });

    flowerID.addEventListener('input', function () {
        let value = this.value.replace(/^#/, '');
        if (value.length > 0) {
            this.value = '#' + value;
        } else {
            this.value = '';
        }
    });

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const flowerIDvalue = document.querySelector('#flower-id').value.replace('#', '');
        const specie = document.querySelector('#specie').value;
        const date = document.querySelector('#date').value;
        try {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const jwtResponse = await fetch('http://localhost:5000/api/users/validate', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (jwtResponse.ok) {
                    const isFlowerIdAvailable = await checkFlowerIdAvailability(flowerIDvalue);
                    const userData = await jwtResponse.json();
                    if (!isFlowerIdAvailable) {
                        alert("Flower ID is already taken. Please choose another.");
                        return;
                    }
                    console.log(userData);
                    const flower = { flowerId: flowerIDvalue, specie, birthdate: date, user: { id: userData.userId } };

                    const createdFlower = await registerFlower(flower);

                    alert("Flower added successfully");
                    console.log('Created Flower:', createdFlower);
                } else {
                    //Token is not validated so no user
                    console.log("Token is not validated so no user")
                }
            } else {
                // token wasnt found which means no user is logged in
                console.log("token wasnt found which means no user is logged in")
            }
        } catch (error) {
            console.error('Error during flower signup:', error);
            alert("There was an error while adding the flower. Please try again.");
        }
    });

    async function checkFlowerIdAvailability(flowerId) {
        try {
            const response = await fetch(`http://localhost:5000/api/flowers/checkFlowerId/${flowerId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking flower availability:', error);
            throw error;
        }
    }

    async function registerFlower(flower) {
        try {
            const response = await fetch('http://localhost:5000/api/flowers/addFlower', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flower),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error during registration. Server response: ${errorText}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error registering flower:', error);
            throw new Error('Error registering flower');
        }
    }
    alert("sdfs")
    try {
        const token = localStorage.getItem('jwtToken');
        console.log('Token:', token); // Add this to see if token is present and valid


        if (token) {
            const response = await fetch('http://localhost:5000/api/users/validate', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                location.replace("../../templates/access/login.html");
                return;
            }

            const result = await response.json();

            if (result.userId) {
                const flowersResponse = await fetch(`http://localhost:5000/api/flowers/findFlowersByUserId/${result.userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(flowersResponse);
                if (flowersResponse.ok) {
                    const flowers = await flowersResponse.json();
                    const dashboard = document.querySelector('.dashboard');
                    dashboard.innerHTML = '';

                    flowers.forEach(flower => {
                        if (flower.condition == undefined) {
                            const card = document.createElement('a');
                            card.classList.add("dash-card");
                            card.innerHTML = `
                            <img src="../../static/images/ficus-benjamina-care.jpg" alt="card-img" class="dash-img">
                            <div class="dash-overlay">
                                <i class="fa-regular fa-flower-tulip"></i>
                                <span class="condtion">Good</span>
                            </div>
                            <div class="dash-type">${flower.specie}</div>
                            <div class="dash-blurs">
                                <div class="dash-blur"></div>
                                <div class="dash-blur"></div>
                                <div class="dash-blur"></div>
                            </div>
                            `;
                            dashboard.appendChild(card);
                        } else {
                            const card = document.createElement('a');
                            card.classList.add("dash-card");
                            card.innerHTML = `
                            <img src="../../static/images/ficus-benjamina-care.jpg" alt="card-img" class="dash-img">
                            <div class="dash-overlay">
                                <i class="fa-regular fa-flower-tulip"></i>
                                <span class="condtion">${flower.condition}</span>
                            </div>
                            <div class="dash-type">${flower.specie}</div>
                            <div class="dash-blurs">
                                <div class="dash-blur"></div>
                                <div class="dash-blur"></div>
                                <div class="dash-blur"></div>
                            </div>
                            `;
                            dashboard.appendChild(card);
                        }

                    });

                } else {
                    console.error('Error fetching computers:', computersResponse.status, computersResponse.statusText);
                }
            } else {
                console.error('Unable to retrieve flower information.');
            }
        } else {
            location.replace("../../templates/access/login.html");
        }

    } catch (error) {
        console.error('Error during validation:', error);
    }
});
