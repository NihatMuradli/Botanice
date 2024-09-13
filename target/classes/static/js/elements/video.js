const videoOverlay = document.querySelector(".video-overlay");
const videoBtn = document.querySelector(".video-btn");

videoOverlay.addEventListener("mouseover",()=>{
    let classList = videoBtn.classList;
    if(!classList.contains("active")){
        videoBtn.classList.add("active");
    }
});

videoOverlay.addEventListener("mouseleave",()=>{
    let classList = videoBtn.classList;
    if(classList.contains("active")){
        videoBtn.classList.remove("active");
    }
});