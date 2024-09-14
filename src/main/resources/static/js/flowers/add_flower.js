document.addEventListener('DOMContentLoaded', function () {
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

    flowerID.addEventListener('input', function() {
        let value = this.value.replace(/^#/, '');
        if (value.length > 0) {
            this.value = '#' + value; 
        } else {
            this.value = '';
        }
    });

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const flowerIDvalue = document.querySelector('#flower-id').value;
        const kind = document.querySelector('#kind').value;
        const date = document.querySelector('#date').value;

        // try {
            
        // } catch (error) {
            
        // }


    });
});