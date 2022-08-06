
class CountdownTimer {
  constructor(timer) {
    this.timer = timer;
    this.timeLeft = this.timer.querySelector('.display__time-left');
    this.timeEnd = this.timer.querySelector('.display__end-time');
    this.controls = this.timer.querySelector('.timer__controls');

    this.controls.addEventListener('click', this);
    this.controls.addEventListener('submit', this);

    this.timerId = null;

    this.originalTitle = document.title;
  }

  handleEvent(event) {
    let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    this[method](event);
  }

  onClick(event) {
    console.log(this);
    const button = event.target;
    if (button.tagName != 'BUTTON') return;

    this.setFinalDate(+button.dataset.time);
    console.log(`开始${button.dataset.time}秒倒计时`);
    this.startCountdown();
  }

  onSubmit(event) {
    console.log(this);
    event.preventDefault();
    const form = event.target;

    this.setFinalDate(form.minutes.value * 60);
    console.log(`开始${form.minutes.value}分钟倒计时`);
    this.startCountdown();
  }

  setFinalDate(seconds) {
    const now = new Date();
    now.setSeconds(now.getSeconds() + seconds);
    this.finalDate = now;
  }

  startCountdown() {
    if (this.timerId === null) {
      const t = this.finalDate.toTimeString().slice(0, 5);
      this.timeEnd.textContent = `Be Back At ${t}`;
    }

    clearInterval(this.timerId);
    this.timerId = setInterval(this.updateTimeLeft, 1000);
    this.updateTimeLeft();
  }

  updateTimeLeft = () => {
    let time = this.finalDate.getTime() - Date.now();
    const clock = this.secondsToClock(Math.round(time / 1000));
    this.timeLeft.textContent = clock;
    document.title = `${this.isFocus ? '' : `[${clock}] `}${this.originalTitle}`;

    if (time <= 0) {
      console.log(`倒计时结束`);
      this.initialize();
      return;
    };
  }

  initialize() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.finalDate = null;
    this.timeLeft.textContent = '0:00';
    this.timeEnd.textContent = (new Date()).toDateString();
    document.title = this.originalTitle;
    this.isFocus = true;
  }

  secondsToClock(seconds) {
    if (seconds === 0) return '0:00';

    let clockTime = [];
    // 转换为 s,m,h。天数留在 seconds 中
    while (clockTime.length < 4 && seconds) {
      const base = clockTime.length < 2 ? 60 : 24;
      const t = seconds % base;
      seconds = (seconds - t) / base;
      clockTime.push(('0' + t).slice(-2));
    }
    if (seconds) clockTime.push(seconds);
    if (clockTime.length === 1) clockTime.push('0');
    if (clockTime.length === 0) clockTime.push('00');

    return clockTime.reverse().join(':');
  }
}

const timer = document.querySelector('.timer');
const counter = new CountdownTimer(timer);
counter.initialize();

window.addEventListener('focus', () => counter.isFocus = true);

window.addEventListener('blur', () => counter.isFocus = false);