const sideBar = document.querySelector(".side-bar");
const sideBarBtn = document.querySelector(".side-btn");
const body = document.querySelector("body");

sideBarBtn.addEventListener("click", function() {
  sideBar.classList.toggle("active");
  menu.classList.toggle("active");
  checkbox.checked = !checkbox.checked;
});

function responsiveSideBar() {
  let bodyWidth = body.offsetWidth;

  if (bodyWidth >= 2000) {
    sideBar.style.backgroundColor = "#457744b4"; 
  }
}

window.addEventListener('resize', responsiveSideBar);
window.addEventListener('DOMContentLoaded', responsiveSideBar);