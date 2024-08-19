const checkbox = document.querySelector(".menu-icon");
const menu = document.querySelector('.menu');

checkbox.addEventListener('change', function() {
<<<<<<< HEAD
    if (checkbox.checked) {
        menu.classList.add('active');
    } else {
        menu.classList.remove('active');
    }
=======
    menu.classList.toggle("active");
    sideBar.classList.toggle("active")
>>>>>>> b7d6a3c435921888fb347ae2d647bdaab9b15c2e
});