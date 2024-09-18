document.addEventListener('DOMContentLoaded', function () {
    const sellBtn = document.querySelector(".sell");
    const deleteBtn = document.querySelector(".delete");

    const backBlur = document.querySelector(".back-blur");
    const sellModal = document.querySelector(".sell-modal");
    const body = document.querySelector("body");
    const deleteModal = document.querySelector(".delete-modal");

    sellBtn.addEventListener("click", () => {
        if (!backBlur.classList.contains("active")) {
            backBlur.classList.add("active");
        }
        if (!sellModal.classList.contains("active")) {
            sellModal.classList.add("active");
        }
        if (!body.classList.contains("no-scroll")) {
            body.classList.add("no-scroll");
        }
    });

    deleteBtn.addEventListener("click", () => {
        if (!backBlur.classList.contains("active")) {
            backBlur.classList.add("active");
        }
        if (!deleteModal.classList.contains("active")) {
            deleteModal.classList.add("active");
        }
        if (!body.classList.contains("no-scroll")) {
            body.classList.add("no-scroll");
        }
    });

    const price = document.querySelector("#price");

    price.addEventListener('input', function () {
        let value = this.value.replace(/^\$|\s+$/g, '');
        if (value.length > 0) {
            this.value = `$${value}`;
        } else {
            this.value = '';
        }
    });

    const modalHeadBtn = document.querySelectorAll(".modal-header-btn");
    const cancelBtn = document.querySelectorAll(".cancel");
    const submitBtn = document.querySelectorAll(".submit");
    const Btns = [modalHeadBtn, submitBtn, cancelBtn];

    Btns.forEach(btns => {
        btns.forEach(btn => {
            btn.addEventListener("click", () => {
                if (backBlur.classList.contains("active")) {
                    backBlur.classList.remove("active");
                    backBlur.classList.add("remove");
                    setTimeout(() => {
                        backBlur.classList.remove("remove");
                    }, 2000);
                }
                if (sellModal.classList.contains("active")) {
                    sellModal.classList.remove("active");
                    sellModal.classList.add("remove");
                    setTimeout(() => {
                        sellModal.classList.remove("remove");
                    }, 2000);
                }
                if (deleteModal.classList.contains("active")) {
                    deleteModal.classList.remove("active");
                    deleteModal.classList.add("remove");
                    setTimeout(() => {
                        deleteModal.classList.remove("remove");
                    }, 2000);
                }
                if (body.classList.contains("no-scroll")) {
                    body.classList.remove("no-scroll");
                }
            });
        });
    });

    // Function to calculate the life time in years, months, and days
    function calculateLifeTime(birthdate) {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    // Function to fetch flower data and update HTML
    async function fetchFlowerData(flowerId) {
        try {
            const response = await fetch(`http://localhost:5000/api/flowers/${flowerId}`);
            const data = await response.json();

            // Update HTML with flower data
            document.querySelector("#user").textContent = data.user.username;
            document.querySelector("#flower-id").textContent = "#" + data.flowerId;
            document.querySelector(".head-plant-id").textContent = "#" + data.flowerId;
            document.querySelector("#kind").textContent = data.specie;
            document.querySelector("#born-time").textContent = data.birthdate;

            // Calculate and set life time
            const lifeTime = calculateLifeTime(data.birthdate);
            document.querySelector("#life-time").textContent = `${lifeTime.years} years, ${lifeTime.months} months, ${lifeTime.days} days`;

            document.querySelector("#condition").textContent = "Good";
            document.querySelector("#phosphorus").textContent = `${data.phosphorus}mg`;
            document.querySelector("#nitrogen").textContent = `${data.nitrogen}mg`;
            document.querySelector("#potassium").textContent = `${data.potassium}mg`;
            document.querySelector("#humidity").textContent = `${data.humidity}%`;
            document.querySelector("#temperature").textContent = `${data.temperature}C`;
            document.querySelector("#conductivity").textContent = `${data.conductivity} mS/mg`;
            document.querySelector("#ph").textContent = data.ph;
            document.querySelector("#adding-time").textContent = data.timestamp;

            // Optionally set the image source
            const plantImg = document.querySelector('.plant-img');
            if (data.imageUrl) {
                plantImg.src = data.imageUrl;
            } else {
                plantImg.src = '../../static/images/ficus-benjamina-care.jpg'; // Default image
            }
        } catch (error) {
            console.error('Error fetching flower data:', error);
        }
    }

    // Extract flower ID from URL and fetch data
    function getFlowerIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    const flowerId = getFlowerIdFromURL();
    if (flowerId) {
        fetchFlowerData(flowerId);
    } else {
        console.error('No flower ID found in URL.');
    }

    // Handle form submissions for sell and delete actions
    const sellForm = document.querySelector('#sell-form');
    sellForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        // Handle sell form submission
        // try {
        //     const response = await fetch('https://example.com/api/sell', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        //         },
        //         body: JSON.stringify({
        //             flowerId: flowerId,
        //             price: document.querySelector("#price").value
        //         })
        //     });
        //     if (response.ok) {
        //         alert('Flower sold successfully!');
        //         // Redirect or update UI accordingly
        //     } else {
        //         console.error('Error selling flower:', response.status, response.statusText);
        //     }
        // } catch (error) {
        //     console.error('Error submitting sell form:', error);
        // }
    });

    const deleteForm = document.querySelector('#delete-form'); // Fixed typo from deleteFrom to deleteForm
    
    deleteForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const deleteFlowerId = document.querySelector('#flowerId').value;
        console.log(deleteFlowerId);
        console.log(flowerId);
        try {
            if (deleteFlowerId == flowerId) {
                const response = await fetch(`http://localhost:5000/api/flowers/deleteFlower/${flowerId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    },
                });
                if (response.ok) {
                    alert('Flower deleted successfully!');
                    location.replace("templates/index.html");
                } else {
                    console.error('Error deleting flower:', response.status, response.statusText);
                }
            } else {
                alert('Flower Id doesnt match');
            }

        } catch (error) {
            console.error('Error submitting delete form:', error);
        }
    });
});
