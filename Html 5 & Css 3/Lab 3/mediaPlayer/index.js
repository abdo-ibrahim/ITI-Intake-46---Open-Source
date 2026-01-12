let videoPlayer = document.getElementById("videoPlayer");
let playPauseBtn = document.querySelector(".play-pause");
let muteUnmuteBtn = document.querySelector(".mute-unmute");
let seekBar = document.getElementById("seekBar");
let volumeBar = document.getElementById("volume");
let currentDisplay = document.getElementById("currentTime");
let durationDisplay = document.getElementById("duration");
let fullscreenBtn = document.querySelector(".fullscreen");

let resetBtn = document.querySelector(".reset");
let forwardBtn = document.querySelector(".forward");
let backwardBtn = document.querySelector(".backward");

let quality = document.getElementById("quality");
let speed = document.getElementById("speed");

// console.dir(videoPlayer);
playPauseBtn.addEventListener("click", function () {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
  playPauseBtn.classList.toggle("playing");
});

resetBtn.addEventListener("click", function () {
  videoPlayer.currentTime = 0;
  videoPlayer.play();
  playPauseBtn.classList.add("playing");
});

forwardBtn.addEventListener("click", function () {
  videoPlayer.currentTime += 5;
});

backwardBtn.addEventListener("click", function () {
  videoPlayer.currentTime -= 5;
});

muteUnmuteBtn.addEventListener("click", function () {
  videoPlayer.muted = !videoPlayer.muted;
  muteUnmuteBtn.classList.toggle("muted");
});

fullscreenBtn.addEventListener("click", function () {
  if (videoPlayer.requestFullscreen) {
    videoPlayer.requestFullscreen();
  }
});

volumeBar.addEventListener("change", function (event) {
  videoPlayer.volume = event.target.value / 100;
  if (videoPlayer.volume === 0) {
    muteUnmuteBtn.classList.add("muted");
  } else {
    muteUnmuteBtn.classList.remove("muted");
  }
});

seekBar.addEventListener("change", function (event) {
  videoPlayer.currentTime = (event.target.value * videoPlayer.duration) / 100;
});

videoPlayer.addEventListener("timeupdate", function () {
  let value = (100 / videoPlayer.duration) * videoPlayer.currentTime;
  seekBar.value = value;
  let currentMinutes = Math.floor(videoPlayer.currentTime / 60);
  let currentSeconds = Math.floor(videoPlayer.currentTime % 60);
  let durationMinutes = Math.floor(videoPlayer.duration / 60);
  let durationSeconds = Math.floor(videoPlayer.duration % 60);
  currentDisplay.textContent = `${currentMinutes.toString().padStart(2, "0")}:${currentSeconds.toString().padStart(2, "0")}`;
  durationDisplay.textContent = `${durationMinutes.toString().padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}`;
});

speed.addEventListener("change", function (event) {
  videoPlayer.playbackRate = event.target.value;
});

quality.addEventListener("change", function (event) {
  let currentTime = videoPlayer.currentTime;
  let isPlaying = !videoPlayer.paused;
  videoPlayer.src = `./video_${event.target.value}p.mp4`;
  console.log("720p loaded");
  videoPlayer.load();
  videoPlayer.currentTime = currentTime;
  if (isPlaying) {
    videoPlayer.play();
    playPauseBtn.classList.add("playing");
  }
});
