document.addEventListener('DOMContentLoaded', function () {
    const sellBtn = document.querySelector(".sell");
    const deleteBtn = document.querySelector(".delete");

    const backBlur = document.querySelector(".back-blur");

    const sellModal = document.querySelector(".sell-modal");
    const body = document.querySelector("body");

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

    const price = document.querySelector("#price");

    price.addEventListener('input', function() {
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
    const Btns = [modalHeadBtn,submitBtn,cancelBtn];

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

    const sellForm = document.querySelector('#sell-form');

    sellForm.addEventListener('submit', async function (event) {
        event.preventDefault();



        // try {
            
        // } catch (error) {
            
        // }


    });

    const deleteFrom = document.querySelector('#sell-form');

    deleteFrom.addEventListener('submit', async function (event) {
        event.preventDefault();



        // try {
            
        // } catch (error) {
            
        // }


    });
});