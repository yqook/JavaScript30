
const video = document.querySelector('video');
const controls = document.querySelector('.player__controls');
const progress = document.querySelector('.progress');
const toggle = document.querySelector('.toggle');
const fullScreen = document.querySelector('.full-screen');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function handleProgress() {
  const percent = (this.currentTime / this.duration) * 100;
  progress.children[0].style.flexBasis = `${percent}%`;

  function secondsToTime(seconds, length = 0) {
    let time = [];
    let a = Math.round(seconds);
    const b = 60;
    while(a / b) {
      r = a % b;
      a = (a - r) / b;
      time.push(('0'+ r).slice(-2));
    }

    while(time.length < 2 || time.length < length) {
      time.push('00');
    }

    return time.reverse().join(':');
  }

  const totalTime = secondsToTime(this.duration);
  const currentTime = secondsToTime(this.currentTime, totalTime.split(':').length);

  const current = document.querySelector('.progress__time>.current');
  const total = document.querySelector('.progress__time>.total');

  current.textContent = currentTime;
  total.textContent = totalTime;
}

function skip(btn) {
  video.currentTime += parseFloat(btn.dataset.skip);
}

function btnHandler(e) {
  const button = e.target;
  if (button.tagName !== 'BUTTON') return;

  if (button.classList.contains('toggle')) {
    togglePlay();
  } else {
    skip(button)
  }
}

function inputHandler(e) {
  const input = e.target;
  if (!input.classList.contains('player__slider')) return;
  video[input.name] = input.value;
}

function throttle(func, delay = 250) {
  let isThrottled = false;
  let thisArg, savedArgs;
  const timeoutFunc = () => {
    if (savedArgs === null || savedArgs === undefined) {
      isThrottled = false;
    } else {
      func.apply(thisArg, savedArgs);
      thisArg = savedArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  }

  return function () {
    if (isThrottled) {
      thisArg = this;
      savedArgs = arguments;
      return;
    }

    func.apply(this, arguments);
    isThrottled = true;

    setTimeout(timeoutFunc, delay);
  }
}

function handleDrag(e) {
  const progress = this;
  const progressBar = progress.querySelector('.progress__filled');
  const coords = progress.getBoundingClientRect();

  let pos = e.clientX - coords.x - progress.clientLeft;
  let paused = video.paused;

  function moveTo(pos) {
    /**
     * 可以用 pos - coords.x 可以用 e.offsetX 替代
     * const coords = progress.getBoundingClientRect();
     * const percent = ((pos - coords.x) / progress.clientWidth) * 100;
     */
    const percent = (pos / progress.clientWidth) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function updateVideoTime(pos, resumeVideo = false) {
    const percent = pos / progress.clientWidth;
    video.currentTime = (percent * video.duration);
    if (resumeVideo) {
      const method = paused ? 'pause' : 'play';
      video[method]();
    }
  }

  updateVideoTime = throttle(updateVideoTime, 300);

  function updateProgress() {
    updateVideoTime(pos, true);

    document.removeEventListener('mousemove', updateDisplay);
    document.removeEventListener('mouseup', updateProgress);
  }

  function updateDisplay(e1) {
    pos = e1.clientX - coords.x - progress.clientLeft;
    moveTo(pos);
    updateVideoTime(pos);
  }

  if (!paused) video.pause();
  moveTo(pos);
  document.addEventListener('mousemove', updateDisplay);
  document.addEventListener('mouseup', updateProgress);
}

function toggleFullScreen(e) {
  console.log(e, e.currentTarget);
  const player = document.querySelector('.player');
  const icon = this.querySelector('i');
  if (!document.fullscreenElement) {
    player.requestFullscreen();
    icon.classList.remove('bx-expand');
    icon.classList.add('bx-collapse');
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    icon.classList.add('bx-expand');
    icon.classList.remove('bx-collapse');
  }
}

controls.addEventListener('click', btnHandler);
controls.addEventListener('change', inputHandler);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('mousedown', handleDrag);
progress.ondragstart = () => false;

fullScreen.addEventListener('click', toggleFullScreen);