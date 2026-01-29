const textbox = document.getElementById("textbox");

textbox.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    e.stopPropagation();
  }
});

const clock = document.getElementById("clock");
const startClock = document.querySelector(".start-clock");
let clockInterval;

startClock.addEventListener("click", () => {
  clockInterval = setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    clock.textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);
});

document.addEventListener("keydown", (e) => {
  // console.log(e);
  if (e.key === "w") {
    clearInterval(clockInterval);
  }
});
