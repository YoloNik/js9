function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let intervalColorId = null;

const refs = {
  background: document.querySelector(`body`),
  startBtn: document.querySelector(`button[data-start]`),
  stopBtn: document.querySelector(`button[data-stop]`),
};

refs.stopBtn.addEventListener(`click`, onStop);
refs.startBtn.addEventListener(`click`, onStart);

refs.stopBtn.disabled = true;

function onStart() {
  intervalColorId = setInterval(() => {
    refs.background.style.background = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onStop() {
  if (onStart) {
    clearInterval(intervalColorId);
    refs.background.style.background = getRandomHexColor();
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  }
}
