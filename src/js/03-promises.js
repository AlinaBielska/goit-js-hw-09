import Notiflix from 'notiflix';

const form = document.querySelector('form');
const { delay, step, amount } = form.elements;


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const eventPromise = e => {
  e.preventDefault();
  let generalDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, generalDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    generalDelay += Number(step.value);
  }
};

form.addEventListener("submit", eventPromise);