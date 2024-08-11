const checkbox = document.querySelector(".menu-icon");
const menu = document.querySelector('.menu');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        menu.classList.add('active');
    } else {
        menu.classList.remove('active');
    }
});