const buttonStart = document.querySelector("[data-start]");
const buttonStop = document.querySelector("[data-stop]");
let timerId = null;

buttonStart.addEventListener("click", () => {
    timerId = setInterval(() => {
       color.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}