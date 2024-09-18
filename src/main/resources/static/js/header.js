const checkbox = document.querySelector(".menu-icon");
const menu = document.querySelector('.menu');

checkbox.addEventListener('change', function() {
    menu.classList.toggle("active");
    sideBar.classList.toggle("active")
});