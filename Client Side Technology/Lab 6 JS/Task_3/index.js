const track = document.querySelector(".gallery-track");
const images = document.querySelectorAll(".gallery img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let curIdx = 0;
const visibleCnt = 4;
const imgWidth = 210;
const mxIdx = images.length - visibleCnt;

prevBtn.addEventListener("click", function () {
  curIdx--;
  if (curIdx < 0) curIdx = 0;
  updateGallery();
});

nextBtn.addEventListener("click", function () {
  curIdx++;
  if (curIdx > mxIdx) curIdx = mxIdx;
  updateGallery();
});

function updateGallery() {
  track.style.transform = `translateX(-${curIdx * imgWidth}px)`;
}

track.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
