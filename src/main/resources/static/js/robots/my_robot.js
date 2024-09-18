document.addEventListener('DOMContentLoaded', function () {
    const deleteBtn = document.querySelector(".delete");
    //const robotID = document.querySelector("#robotId");

    const backBlur = document.querySelector(".back-blur");
    const body = document.querySelector("body");

    const deleteModal = document.querySelector(".delete-modal");

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

    // robotID.addEventListener('input', function () {
    //     let value = this.value.replace(/^#/, '');
    //     if (value.length > 0) {
    //         this.value = '#' + value;
    //     } else {
    //         this.value = '';
    //     }
    // });

    
    const modalHeadBtn = document.querySelector(".modal-header-btn");
    const cancelBtn = document.querySelector(".cancel");
    const submitBtn = document.querySelector(".submit");
    const Btns = [modalHeadBtn,submitBtn,cancelBtn];

    Btns.forEach(btn => {
            btn.addEventListener("click", () => {
            if (backBlur.classList.contains("active")) {
                backBlur.classList.remove("active");
                backBlur.classList.add("remove");
                setTimeout(() => {
                    backBlur.classList.remove("remove");
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

    const myBar = document.querySelector(".my-bar");
    const robotBtn = document.querySelector(".robot-btn");
    const status = document.querySelector("#status");

    robotBtn.addEventListener("click", () => {
        if(robotBtn.classList.contains("started")){
            robotBtn.classList.remove("started")
            robotBtn.classList.add("pasued")
            robotBtn.innerHTML = "<i class='fa-regular fa-play'></i>" + "Start";
            myBar.classList.remove("bg-success");
            myBar.classList.add("bg-danger");
            myBar.style.width = "56%";
            status.innerHTML = "Paused";

            // Stop code
        }else{
            robotBtn.classList.add("started")
            robotBtn.classList.remove("pasued")
            robotBtn.innerHTML = "<i class='fa-regular fa-pause'></i>" + "Pause";
            myBar.classList.add("bg-success");
            myBar.classList.remove("bg-danger");
            myBar.style.width = "85%";
            status.innerHTML = "Working";

            // Start code
        }
    });

    function calculateWorkingTime(addingTime) {
        const currentTime = new Date();
        const addedTime = new Date(addingTime);
        const diffInMilliseconds = currentTime - addedTime;

        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const remainingMinutes = diffInMinutes % 60;
        const remainingSeconds = diffInSeconds % 60;

        return `${diffInHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
    }

    async function fetchRobotData(robotId) {
        try {
            const response = await fetch(`http://localhost:5000/api/robots/${robotId}`);
            const data = await response.json();

            // Update HTML with robot data
            document.querySelector("#user").textContent = data.user.username;
            document.querySelector("#robot-id").textContent = "#" + data.robotId;
            document.querySelector(".head-robot-id").textContent = "#" + data.robotId;
            document.querySelector("#version").textContent = data.version;
            document.querySelector("#battery").textContent = data.capacity;
            document.querySelector("#add-time").textContent = data.addingTime;

            // Calculate and update work time
            const workTime = calculateWorkingTime(data.addingTime);
            document.querySelector("#work-time").textContent = workTime;

            // Optionally set the image source
            const robotImg = document.querySelector('.robot-img');
            if (data.imageUrl) {
                // robotImg.src = data.imageUrl;
            } else {
                robotImg.src = '../../static/images/bot-img.jpeg'; // Default image
            }

            // Optional: Update the working time dynamically every second
            setInterval(() => {
                const updatedWorkTime = calculateWorkingTime(data.addingTime);
                document.querySelector("#work-time").textContent = updatedWorkTime;
            }, 1000); // Update every second

        } catch (error) {
            console.error('Error fetching robot data:', error);
        }
    }

    // Extract robot ID from URL and fetch data
    function getRobotIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    const robotId = getRobotIdFromURL();
    if (robotId) {
        fetchRobotData(robotId);
    } else {
        console.error('No robot ID found in URL.');
    }
    
    const deleteForm = document.querySelector('#delete-form');

    deleteForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const deleteRobotId = document.querySelector('#robotId').value;
        try {
            if (deleteRobotId == robotId) {
                const response = await fetch(`http://localhost:5000/api/robots/deleteRobot/${robotId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    },
                });
                if (response.ok) {
                    alert('Robot deleted successfully!');
                    location.replace("index.html");
                } else {
                    console.error('Error deleting Robot:', response.status, response.statusText);
                }
            } else {
                alert('Robot Id doesnt match');
            }

        } catch (error) {
            console.error('Error submitting delete form:', error);
        }
    });
});