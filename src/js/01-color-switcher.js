function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let currentHexColor;
let intervalColorId = null;

const refs = {
  background: document.querySelector(`body`),
  startBtn: document.querySelector(`button[data-start]`),
  stopBtn: document.querySelector(`button[data-stop]`),
};

refs.stopBtn.addEventListener(`click`, onStop);
refs.startBtn.addEventListener(`click`, onStart);

function onStart() {
  intervalColorId = setInterval(() => {
    currentHexColor = getRandomHexColor();
    refs.background.style.background = currentHexColor;
  }, 1000);
  refs.startBtn.disabled = true;
}

function onStop() {
  if (onStart) {
    clearInterval(intervalColorId);
    refs.background.style.background = currentHexColor;
    refs.startBtn.disabled = false;
  }
}
