const video = document.querySelector(".video");
const pauseBtn = document.querySelector(".pause");
const prewBtn = document.querySelector(".prew");
const nextBtn = document.querySelector(".next");
const ses = document.querySelector(".ses");
const range = document.querySelector(".range");
const videoName = document.querySelector(".video-name");

const list = [
  "Donald_Duck_The_Hockey",
  "Tom_And_Jerry_1",
  "Tom_And_Jerry_2",
  "Tom_And_Jerry_3",
];

let listIndex = 0;
let say = 0;
videoadd(list[listIndex]);

function videoadd(index) {
  videoName.innerHTML = index;
  video.src = `video/${index}.mp4`;
}

pauseBtn.addEventListener("click", () => {
  if (say === 0) {
    pauseBtn.classList.remove("fa-play");
    pauseBtn.classList.add("fa-pause");
    video.play();
    say++;
  } else {
    pauseBtn.classList.add("fa-play");
    pauseBtn.classList.remove("fa-pause");
    video.pause();
    say--;
  }
});

nextBtn.addEventListener("click", right);

function right() {
  if (listIndex === list.length - 1) {
    listIndex = 0;
  } else {
    listIndex++;
  }
  console.log(say);
  videoadd(list[listIndex]);
  if (say === 1) {
    video.play();
  }
}

prewBtn.addEventListener("click", () => {
  if (listIndex === 0) {
    listIndex = list.length - 1;
  } else {
    listIndex--;
  }
  videoadd(list[listIndex]);
  if (say === 1) {
    video.play();
  }
});
range.addEventListener("input", () => {
  video.currentTime = range.value;
});

const vaxt = document.querySelector(".vaxt");
const gedenvaxt = document.querySelector(".gedenvaxt");

video.addEventListener("loadeddata", () => {
  range.max = video.duration;
  let vsaniye = parseInt(video.duration % 60);
  let vdeqiqe = parseInt(video.duration / 60) % 60;
  let vsaat = parseInt(video.duration / 600);
  vaxt.textContent = vsaat + ":" + vdeqiqe + ":" + vsaniye;
});

video.addEventListener("timeupdate", () => {});

const volume = document.querySelector(".ses");
let saygac = 0;
volume.addEventListener("click", () => {
  if (saygac === 0) {
    video.volume = 0;
    ses.classList.add("fa-volume-off")
    ses.classList.remove("fa-volume-high")
    saygac++;
  } else {
    video.volume = 1;
    ses.classList.add("fa-volume-high")
    ses.classList.remove("fa-volume-off")
    saygac--;
  }
});

video.addEventListener(
  "timeupdate",
  () => {
    range.value = video.currentTime;
    let Vsaniye = parseInt(video.currentTime % 60);
    let Vdeqiqe = parseInt(video.currentTime / 60) % 60;
    let Vsaat = parseInt(video.currentTime / 600);
    gedenvaxt.textContent = Vsaat + ":" + Vdeqiqe + ":" + Vsaniye;

    if (gedenvaxt.textContent === vaxt.textContent) {
      setTimeout(() => {
        right();
      }, 200);
    }
  },
  false
);
