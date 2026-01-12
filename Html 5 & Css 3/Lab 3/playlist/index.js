let videoPreview = document.getElementById("videoPreview");
let videoSource = videoPreview.querySelector("source");
let videoTitle = document.querySelector(".videos .preview .info");
let videoList = document.querySelector(".videos .list ul");
let videos = [
  {
    img: "./imgs/video-preview1.jpg",
    title: "Everything About The Virtual Hosts",
    duration: "3:45",
    video: "./video2.mp4",
  },
  {
    img: "./imgs/video-preview2.jpg",
    title: "Understanding CSS Grid Layouts",
    duration: "4:20",
    video: "./video2.mp4",
  },
  {
    img: "./imgs/video-preview3.jpg",
    title: "Mastering JavaScript Promises",
    duration: "2:30",
    video: "./video2.mp4",
  },
  {
    img: "./imgs/video-preview4.jpg",
    title: "Introduction to Responsive Design",
    duration: "5:10",
    video: "./video2.mp4",
  },
  {
    img: "./imgs/video-preview5.jpg",
    title: "Working with REST APIs",
    duration: "3:15",
    video: "./video2.mp4",
  },
  {
    img: "./imgs/video-preview6.jpg",
    title: "Deep Dive into Flexbox",
    duration: "4:05",
    video: "./video2.mp4",
  },
  {
    img: "./imgs/video-preview7.jpg",
    title: "Getting Started with Node.js",
    duration: "6:00",
    video: "./video2.mp4",
  },
  {
    img: "./imgs/video-preview1.jpg",
    title: "Building Modern Web Forms",
    duration: "2:50",
    video: "./video2.mp4",
  },
  {
    img: "./imgs/video-preview2.jpg",
    title: "Exploring the DOM Manipulation",
    duration: "3:40",
    video: "./video2.mp4",
  },
  {
    img: "./imgs/video-preview5.jpg",
    title: "Debugging JavaScript Like a Pro",
    duration: "4:30",
    video: "./video2.mp4",
  },
];

videoList.innerHTML = "";

videos.forEach((video, index) => {
  let li = document.createElement("li");
  li.dataset.img = video.img;
  li.dataset.title = video.title;
  li.dataset.video = video.video;
  li.innerHTML = `
    <img src="${video.img}" alt="" />
    <div>
      <span class="video-title">${video.title}</span>
      <span class="video-duration">${video.duration}</span>
    </div>
  `;
  videoList.appendChild(li);
});

let lisVideo = document.querySelectorAll(".videos .list ul li");

// make first video active by default
if (lisVideo.length > 0) {
  lisVideo[0].classList.add("active");
  videoSource.src = lisVideo[0].dataset.video;
  videoPreview.load();
  videoTitle.textContent = lisVideo[0].dataset.title;
}

lisVideo.forEach((li) => {

  li.addEventListener("click", function (e) {
    lisVideo.forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");

    videoSource.src = this.dataset.video;
    videoPreview.load();
    videoPreview.play();
    videoTitle.textContent = this.dataset.title;
  });
});

videoPreview.addEventListener("click", function () {
  if (this.paused) {
    this.play();
  } else {
    this.pause();
  }
});

videoPreview.addEventListener("dblclick", function () {
  this.requestFullscreen();
});
