const timer = document.querySelector('.timer');

if (timer) {

const timerFields = timer.querySelectorAll('.timer__value input');

const hour = timer.querySelector('.timer__hour input');
const minute = timer.querySelector('.timer__min input');
const second = timer.querySelector('.timer__sec input');
const startBtn = timer.querySelector('.timer__start');
const pauseBtn = timer.querySelector('.timer__pause');
const resetBtn = timer.querySelector('.timer__reset');

let interval;

function sliceValue () {
  if (this.value.length > 2) {
    this.value = this.value.slice(0, 2);
  }
}

  timerFields.forEach(timerField => {
    timerField.addEventListener('keydown', sliceValue);
    timerField.addEventListener('keyup', sliceValue);
  });


  timer.addEventListener('submit', (evt) => {
    evt.preventDefault();
    startTimer();
  });


  function startTimer () {
    second.readOnly = true;
    minute.readOnly = true;
    hour.readOnly = true;
    startBtn.disabled = true;

    function countdown () {
      const minMaxMinute = minute.value > 0 && minute.value < 60;
      const minMaxHour = hour.value > 0 && hour.value < 24;
      const minMaxSecond = second.value > 0 && second.value < 60;

      if (minMaxSecond) {
        if (second.value <= 10) {
          second.value--;
          second.value = '0' + second.value;
        } else {
          second.value--;
        }
      }
      else {
        second.value = 60;
        second.value--;
        if (minute.value <=10) {
          minute.value --;
          minute.value = '0' + minute.value;
        } else {
          minute.value --;
        }
      }

      if (!minMaxMinute && !minMaxSecond) {
        minute.value = 60;
        minute.value--;

        if (hour.value <=10) {
          hour.value --;
          hour.value = '0' + hour.value;
        } else {
          hour.value --;
        }
      }


       if (!minMaxSecond && !minMaxMinute && !minMaxHour) {
         resetTimer();
       }

    }
    interval = setInterval(countdown,1000);

  }


  function clearTimer () {
    clearInterval(interval);
    startBtn.disabled = false;
    second.readOnly = false;
    minute.readOnly = false;
    hour.readOnly = false;
  }

  pauseBtn.addEventListener('click', clearTimer);


  function resetTimer () {
    clearTimer();
    hour.value = "00";
    minute.value = "00";
    second.value = "00";
  }

  resetBtn.addEventListener('click', resetTimer);


}
