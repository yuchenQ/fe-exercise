function initClock() {
  const date = new Date();

  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  const handsDeg = { 
    hours: hours * 30 + minutes / 2,
    minutes: minutes * 6,
    seconds: seconds * 6,
  };

  const hoursEle = document.querySelector("#hours");
  hoursEle.style.transform = `rotate(${handsDeg.hours}deg)`;

  const minutesEle = document.querySelector("#minutes");
  minutesEle.style.transform = `rotate(${handsDeg.minutes}deg)`;

  const secondsEle = document.querySelector("#seconds");
  secondsEle.style.transform = `rotate(${handsDeg.seconds}deg)`;

  // 当首次在屏幕上绘制时钟时，在分针需要移动之前不到一分钟。为了实现这一点，
  // 我们可以计算出第一分钟结束的时间并手动轻推分针。由于我们使用JavaScript进行第一次移动，
  // 我们可以使用setTimeout继续旋转6度。
  if (seconds > 0) {
    setTimeout(() => {
      minutesEle.style.transform = `rotate(${handsDeg.minutes + 6}deg)`;
    }, (60 - seconds + 1) * 1000);
  }
}

initClock();
