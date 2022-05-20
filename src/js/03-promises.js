import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector(`input[name=delay]`),
  step: document.querySelector(`input[name="step"]`),
  amount: document.querySelector(`input[name="amount"]`),
  button: document.querySelector(`button`),
};

refs.button.addEventListener(`click`, onClick);

function createPromise() {
  return new Promise((fulfilled, rejected) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      fulfilled();
    } else {
      rejected();
    }
  });
}

function onClick(e) {
  e.preventDefault();
  let firstDelay = +refs.delay.value;
  let delayStep = refs.step.value;
  let amount = refs.amount.value;
  let counterOfAmount = 0;
  let counterOfSteps = 0;
  //Notiflix.Notify.info(`☝️Your request is being processed`);
  setTimeout(() => {
    if (amount !== '') {
      const intervalId = setInterval(
        () => {
          createPromise()
            .then(() => {
              Notiflix.Notify.success(
                `✅ Fulfilled promise ${counterOfAmount} in ${counterOfSteps}ms`,
              );
            })
            .catch(() => {
              Notiflix.Notify.failure(
                `❌ Rejected promise ${counterOfAmount} in ${counterOfSteps}ms`,
              );
            });

          counterOfAmount += 1;
          counterOfSteps += +delayStep;
          if (counterOfAmount === +amount) {
            clearInterval(intervalId);
          }
        },
        counterOfSteps === 1 ? 0 : delayStep,
      );
    } else {
      Notiflix.Notify.failure(`❌Error. Amount of promises not selected`);
    }
  }, firstDelay);
}
