import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const button = document.querySelector("[data-start]");
let selectedDate = 0;
const span = {
  day: document.querySelector("[data-days]"),
  hour: document.querySelector("[data-hours]"),
  minute: document.querySelector("[data-minutes]"),
  second: document.querySelector("[data-seconds]"),
};

const fp = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    let dateNow = new Date();
    if (selectedDates[0].getTime() < dateNow.getTime()) {
          Notiflix.Notify.failure('Please choose a date in the future');
          button.setAttribute('disabled', '');
      } else {
          button.removeAttribute('disabled');
      }
},
});

const addLeadingZero = value => {
  return value.toString().padStart('2', '0');
};

button.addEventListener("click", () => {
  let timerId = setInterval(() => {
  let ms = new Date(selectedDate).getTime() - new Date().getTime();
  const timerData = convertMs(ms);
  if (ms <= 0) {
      clearInterval(timerId);
      return;
    }
  span.second.textContent = addLeadingZero(timerData.seconds);
  span.minute.textContent = addLeadingZero(timerData.minutes);
  span.hour.textContent = addLeadingZero(timerData.hours);
  span.day.textContent = addLeadingZero(timerData.days);
  }, 1000);
}
);
  
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

