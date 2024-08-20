const textContainer = document.querySelector(".welcome-text");
const wrap = document.querySelector(".wrap"); 
const titleStroke = document.querySelector(".title-stroke");
const helloCard = document.querySelector(".hello-card");
const helloImage = document.querySelector(".hello-img");

let wrapWidth = wrap.offsetWidth;
textContainer.style.left =  `${wrapWidth * 0.17}px`;
helloCard.style.left =  `${wrapWidth * 0.8}px`;
helloImage.style.left =  `${wrapWidth * 0.35}px`;

if (wrapWidth < 1680) {
    titleStroke.setAttribute("y", "110");
}