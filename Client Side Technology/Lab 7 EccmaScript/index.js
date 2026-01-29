class Clock {
  hours;
  minutes;
  seconds;

  #intervalId;

  constructor(time) {
    const [hours, minutes, seconds] = time.split(":");
    this.hours = Number(hours);
    this.minutes = Number(minutes);
    this.seconds = Number(seconds);
    this.#intervalId = null;
  }

  static formatTime(hours, minutes, seconds) {
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${hours}:${minutes}:${seconds}`;
  }

  #tick() {
    this.seconds++;

    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
    }

    if (this.minutes >= 60) {
      this.minutes = 0;
      this.hours++;
    }

    if (this.hours >= 24) {
      this.hours = 0;
    }

    console.log(this.getTime());
  }

  start() {
    if (this.#intervalId === null) {
      this.#intervalId = setInterval(() => this.#tick(), 1000);
    }
  }

  stop() {
    if (this.#intervalId !== null) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }

  getTime() {
    return Clock.formatTime(this.hours, this.minutes, this.seconds);
  }
}

class AlarmClock extends Clock {
  #alarmTime;
  #alarmMessage;

  constructor(time, alarmTime, message = "Alarm! Wake up!") {
    super(time);
    this.#alarmTime = alarmTime;
    this.#alarmMessage = message;
  }

  #checkAlarm() {
    if (this.getTime() === this.#alarmTime) {
      console.log(this.#alarmMessage);
      this.stop();
    }
  }

  start() {
    super.start();
    this.alarmCheckId = setInterval(() => this.#checkAlarm(), 1000);
  }

  stop() {
    super.stop();
    if (this.alarmCheckId) {
      clearInterval(this.alarmCheckId);
      this.alarmCheckId = null;
    }
  }

  setAlarm(newAlarmTime) {
    this.#alarmTime = newAlarmTime;
  }

  setAlarmMessage(newMessage) {
    this.#alarmMessage = newMessage;
  }
}

const sleepAlarmClock = new AlarmClock("14:59:55", "15:00:00", "Hello World!, Wake up!");
sleepAlarmClock.start();
setTimeout(() => {
  sleepAlarmClock.setAlarm("15:01:00");
}, 10000);

// sleepAlarmClock.setAlarmMessage("New custom message!");
