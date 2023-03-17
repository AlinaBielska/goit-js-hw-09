const buttonStart = document.querySelector("[data-start]");
const buttonStop = document.querySelector("[data-stop]");
const bodyColor = document.querySelector("body");
let timerId = null;

buttonStart.addEventListener("click", () => {
    timerId = setInterval(() => {
       bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000);
    buttonStart.setAttribute('disabled', '');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

buttonStop.addEventListener("click", () => {
    clearInterval(timerId);
    buttonStart.removeAttribute('disabled');
});