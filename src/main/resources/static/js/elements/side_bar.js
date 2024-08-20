const sideBar = document.querySelector(".side-bar");
const sideBarBtn = document.querySelector(".side-btn");

sideBarBtn.addEventListener("click", function() {
  sideBar.classList.toggle("active");
  menu.classList.toggle("active");
  checkbox.checked = !checkbox.checked;
});