let left = document.querySelector(".left");
let images = document.querySelectorAll(".left img");
let right = document.querySelector(".right");

// images --> dragstart, dragend
// right --> dragleave
// left --> dragover, dragenter, drop

images.forEach((img) => {
  img.addEventListener("dragstart", dragStart);
  img.addEventListener("dragend", dragEnd);
});

left.addEventListener("dragleave", dragLeave);

right.addEventListener("dragover", dragOver);
right.addEventListener("dragenter", dragEnter);
right.addEventListener("drop", dragDrop);

function dragStart(e) {
  e.dataTransfer.setData("img", e.target.outerHTML);
}

function dragEnd(e) {
  if (e.dataTransfer.dropEffect !== "none") {
    e.target.style.opacity = "0";
    e.target.style.pointerEvents = "none";
  }
}
function dragLeave(e) {
  e.preventDefault();
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragDrop(e) {
  e.preventDefault();
  right.innerHTML += e.dataTransfer.getData("img");
}
