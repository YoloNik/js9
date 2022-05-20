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
  let counterOfAmount = 0;
  let counterOfSteps = 0;
  Notiflix.Notify.info(`☝️Your request is being processed`);
  if (amount !== '') {
    setTimeout(() => {
      const intervalId = setInterval(() => {
        createPromise(amount, delayStep)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(
              `✅ Fulfilled promise ${counterOfAmount} in ${counterOfSteps}ms`,
            );
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(
              `❌ Rejected promise ${counterOfAmount} in ${counterOfSteps}ms`,
            );
          });
        counterOfAmount += 1;
        counterOfSteps += +delayStep;
        if (counterOfAmount === +amount) {
          clearInterval(intervalId);
        }
      }, delayStep);
    }, firstDelay);
  } else {
    Notiflix.Notify.failure(`❌Error. Amount of promises not selected`);
  }
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
