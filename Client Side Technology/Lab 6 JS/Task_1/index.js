const textbox = document.getElementById("textbox");

textbox.addEventListener("keydown", (e) => {
  alert(`${e.key} pressed`);
});

textbox.addEventListener("mousedown", (e) => {
  let buttonName;
  // console.log(e);
  switch (e.button) {
    case 0:
      buttonName = "left button";
      break;
    case 1:
      buttonName = "scroll wheel";
      break;
    case 2:
      buttonName = "right button";
      break;
  }

  alert(`${buttonName} clicked`);
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

window.addEventListener("keydown", (e) => {
  console.log("ddd");
  console.log(e);
  if (e.altKey && e.key === "w") {
    clearInterval(clockInterval);
  }
});

textbox.addEventListener("keydown", (e) => {
  // console.log(e);
  if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
    e.preventDefault();
  }
});
