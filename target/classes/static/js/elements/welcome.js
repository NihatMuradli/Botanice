const textContainer = document.querySelector(".welcome-text");
const wrap = document.querySelector(".wrap"); 
const titleStroke = document.querySelector(".title-stroke");
const helloCard = document.querySelector(".hello-card");
const helloImage = document.querySelector(".hello-img");


function responsiveWelcomePage() {
    let wrapWidth = wrap.offsetWidth;
    textContainer.style.left =  `${wrapWidth * 0.1}px`;
    helloCard.style.left =  `${wrapWidth * 0.8}px`;
    helloImage.style.left =  `${wrapWidth * 0.4}px`;
    titleStroke.setAttribute("stroke-width","5");
    titleStroke.setAttribute("y", "140");
    
    if (wrapWidth <= 1680 && wrapWidth > 1440) {
        titleStroke.setAttribute("y", "130");
        titleStroke.setAttribute("stroke-width","4")
    }else if(wrapWidth <= 1440 && wrapWidth > 1280){
        titleStroke.setAttribute("y", "102");
        titleStroke.setAttribute("stroke-width","4")
    }else if(wrapWidth <= 1280 && wrapWidth > 1024){
        helloCard.style.left =  `${wrapWidth * 0.75}px`;
        titleStroke.setAttribute("y", "79");
        titleStroke.setAttribute("stroke-width","2")
    }else if(wrapWidth <= 1024 && wrapWidth > 768){
        helloCard.style.left =  `${wrapWidth * 0.75}px`;
        helloImage.style.left =  `${wrapWidth * 0.45}px`;
        titleStroke.setAttribute("y", "65");
        titleStroke.setAttribute("stroke-width","2")
    }else if(wrapWidth <= 768 && wrapWidth > 576){
        helloCard.style.left =  `${wrapWidth * 0.75}px`;
        helloImage.style.left =  `${wrapWidth * 0.50}px`;
        titleStroke.setAttribute("y", "52");
        titleStroke.setAttribute("stroke-width","1.5")
    }else if( wrapWidth < 576){
        titleStroke.setAttribute("y", "52");
        titleStroke.setAttribute("stroke-width","1.5")
    }
}
  
window.addEventListener('resize', responsiveWelcomePage);
window.addEventListener('DOMContentLoaded', responsiveWelcomePage);