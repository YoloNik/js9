import Notiflix from 'notiflix';

const form = document.querySelector(`form`);

form.addEventListener(`submit`, onClick);

function createPromise(position, delay) {
  return new Promise((fulfilled, rejected) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        fulfilled(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rejected(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function onClick(e) {
  e.preventDefault();
  let firstDelay = e.target.delay.value;
  let delayStep = e.target.step.value;
  let amount = e.target.amount.value;
  for (let i = 1; i <= amount; i += 1) {
    let delay = +firstDelay + +delayStep * (i - 1);
    createPromise(i, delay)
      .then(data => {
        Notiflix.Notify.success(data);
      })
      .catch(data => {
        Notiflix.Notify.failure(data);
      });
  }
}
