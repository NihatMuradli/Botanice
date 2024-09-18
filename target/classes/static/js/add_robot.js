document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('#form');
    const robotID = document.querySelector('#robot-id');
    const batteryCapacity = document.querySelector("#battery");
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

    robotID.addEventListener('input', function () {
        let value = this.value.replace(/^#/, '');
        if (value.length > 0) {
            this.value = '#' + value;
        } else {
            this.value = '';
        }
    });

    batteryCapacity.addEventListener('input', function () {
        let value = this.value.replace(/\D/g, ''); 
        let cursorPosition = this.selectionStart;

        if (value.length > 0) {
            this.value = value + ' mAh';
            this.setSelectionRange(cursorPosition, cursorPosition); 
        } else {
            this.value = ''; 
        }
    });

    batteryCapacity.addEventListener('focus', function () {
        if (this.value.includes(' mAh')) {
            let cursorPosition = this.value.indexOf(' mAh');
            this.setSelectionRange(cursorPosition, cursorPosition);
        }
    });

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const robotIDvalue = document.querySelector('#robot-id').value.replace('#', '');
        const version = document.querySelector('#version').value;
        const battery = document.querySelector('#battery').value;
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
                    const isRobotIdAvailable = await checkRobotIdAvailability(robotIDvalue);
                    const userData = await jwtResponse.json();
                    if (!isRobotIdAvailable) {
                        alert("Robot ID is already taken. Please choose another.");
                        return;
                    }
                    console.log(userData);
                    const robot = { robotId: robotIDvalue, version, capacity: battery, user: { id: userData.userId } };

                    const createdRobot = await registerRobot(robot);

                    alert("Robot added successfully");
                    console.log('Created Robot:', createdRobot);
                } else {
                    console.log("Token is not validated")
                }
            } else {
                console.log("token wasnt found which means no user is logged in")
            }
        } catch (error) {
            console.error('Error during robot signup:', error);
            alert("There was an error while adding the robot. Please try again.");
        }
    });

    async function checkRobotIdAvailability(robotId) {
        try {
            const response = await fetch(`http://localhost:5000/api/robots/checkRobotId/${robotId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking robot availability:', error);
            throw error;
        }
    }

    async function registerRobot(robot) {
        try {
            const response = await fetch('http://localhost:5000/api/robots/addRobot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(robot),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error during registration. Server response: ${errorText}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error registering robot:', error);
            throw new Error('Error registering robot');
        }
    }
});
