document.addEventListener('DOMContentLoaded', function () {
    const deleteBtn = document.querySelector(".delete");
    const robotID = document.querySelector("#id");

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

    robotID.addEventListener('input', function () {
        let value = this.value.replace(/^#/, '');
        if (value.length > 0) {
            this.value = '#' + value;
        } else {
            this.value = '';
        }
    });

    
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
    
    const deleteFrom = document.querySelector('#delete-form');

    deleteFrom.addEventListener('submit', async function (event) {
        event.preventDefault();



        // try {
            
        // } catch (error) {
            
        // }


    });
});