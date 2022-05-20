import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector(`input[name=delay]`),
  step: document.querySelector(`input[name="step"]`),
  amount: document.querySelector(`input[name="amount"]`),
  button: document.querySelector(`button`),
};

refs.button.addEventListener(`click`, onClick);

function onClick(e) {
  e.preventDefault();

  let firstDelay = refs.delay.value;
  let delayStep = refs.step.value;
  let amount = refs.amount.value;
  let counterOfAmount = null;
  let counterOfSteps = null;

  createPromise().finally(Notiflix.Notify.warning(`☝️Your request is being processed`));

  setTimeout(() => {
    const intervalId = setInterval(() => {
      createPromise(amount, delayStep)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${counterOfAmount} in ${counterOfSteps}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${counterOfAmount} in ${counterOfSteps}ms`);
        });
      counterOfAmount += 1;
      counterOfSteps += +delayStep;
      if (counterOfAmount === +amount) {
        clearInterval(intervalId);
      }
    }, delayStep);
  }, firstDelay);
}

function createPromise(position, delay) {
  return new Promise((fulfilled, rejected) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      fulfilled({ position, delay });
    } else {
      rejected({ position, delay });
    }
  });
}
