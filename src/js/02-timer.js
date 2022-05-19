import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDatetime: document.querySelector(`#datetime-picker`),
  startBtn: document.querySelector(`button[data-start]`),
  timer: document.querySelector(`.timer`),
  day: document.querySelector(`[data-days]`),
};

refs.startBtn.disabled = true;

const fp = flatpickr(refs.inputDatetime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < this.now) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
    console.log(selectedDates[0].getTime());
  },
});

let currentDates = Date.now();
let timeLeftConvert;

refs.startBtn.addEventListener(`click`, start);

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
  //console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function start(e) {
  refs.startBtn.disabled = true;
  let timeLeftUNIX = fp.selectedDates[0].getTime() - currentDates;
  const timerId = setInterval(() => {
    timeLeftUNIX -= 1000;
    timeLeftConvert = convertMs(timeLeftUNIX);

    refs.timer.innerHTML = `<div class="field">
        <span class="value" data-days>${addLeadingZero(timeLeftConvert.days)}</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>${addLeadingZero(timeLeftConvert.hours)}</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>${addLeadingZero(timeLeftConvert.minutes)}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>${addLeadingZero(timeLeftConvert.seconds)}</span>
        <span class="label">Seconds</span>
      </div>`;

    if (Math.floor(timeLeftUNIX / 1000) === 0) {
      Notiflix.Notify.success('Time is up!');
      clearInterval(timerId);
      refs.startBtn.disabled = false;
    }
  }, 1000);
}
