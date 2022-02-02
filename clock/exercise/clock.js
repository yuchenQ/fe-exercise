function initClock() {
  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

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

  if (seconds > 0) {
    setTimeout(() => {
      minutesEle.style.transform = `rotate(${handsDeg.minutes + 6}deg)`;
    }, (60 - seconds + 1) * 1000);
  }
}

initClock();