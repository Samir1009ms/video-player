const video = document.querySelector(".video");
const pauseBtn = document.querySelector(".pause");
const prewBtn = document.querySelector(".prew");
const nextBtn = document.querySelector(".next");
const ses = document.querySelector(".ses");
const range = document.querySelector(".range");
const videoName = document.querySelector(".video-name");
const valueBtn = document.querySelectorAll("[data-value]");
let listIndex = 0;

const middle = document.querySelector(".middle");

const list = [
  "Donald_Duck_The_Hockey",
  "Tom_And_Jerry_1",
  "Tom_And_Jerry_2",
  "Tom_And_Jerry_3",
];

let say = 0;
videoadd(list[listIndex]);

function videoadd(index) {
  videoName.innerHTML = index;
  video.src = `video/${index}.mp4`;
  middle.src = `video/${index}.mp4`;
}

pauseBtn.addEventListener("click", playpause);
function playpause() {
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
}

nextBtn.addEventListener("click", right);

function right() {
  if (listIndex === list.length - 1) {
    listIndex = 0;
  } else {
    listIndex++;
  }
  // console.log(say);
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
// range.addEventListener("input", () => {
//   video.currentTime = range.value;
// });

const vaxt = document.querySelector(".vaxt");
const gedenvaxt = document.querySelector(".gedenvaxt");

video.addEventListener("loadeddata", () => {
  // range.max = video.duration;
  let vsaniye = parseInt(video.duration % 60);
  let vdeqiqe = parseInt(video.duration / 60) % 60;
  let vsaat = parseInt(video.duration / 600);
  vaxt.textContent = vsaat + ":" + vdeqiqe + ":" + vsaniye;
});

video.addEventListener("timeupdate", () => { });

let volume = document.querySelector(".ses");
let saygac = 0;
function vol() {
  if (saygac === 0) {
    video.volume = 0;
    ses.classList.add("fa-volume-off");
    ses.classList.remove("fa-volume-high");

    saygac++;
  } else {
    video.volume = 1;
    ses.classList.add("fa-volume-high");
    ses.classList.remove("fa-volume-off");
    saygac--;

  }
}
volume.addEventListener("click", vol)

video.addEventListener(
  "timeupdate",
  () => {
    // range.value = video.currentTime;
    let Vsaniye = parseInt(video.currentTime % 60);
    let Vdeqiqe = parseInt(video.currentTime / 60) % 60;
    let Vsaat = parseInt(video.currentTime / 600);
    gedenvaxt.textContent = Vsaat + ":" + Vdeqiqe + ":" + Vsaniye;

    if (gedenvaxt.textContent === vaxt.textContent) {
      right();
    }
  },
  false
);

//! yeni ders
const p = document.querySelector(".p");
const vaxtgosterici = document.querySelector(".vaxtgosterici");

function yuklenme(event) {
  const { duration, currentTime } = event.srcElement;
  let videotime = (currentTime / duration) * 100;
  p.style.width = `${videotime}%`;
  // vaxtgosterici.style.width = `${videotime}%`;
}
video.addEventListener("timeupdate", yuklenme);

valueBtn.forEach((deyer) => {
  deyer.addEventListener("click", control);
});

function control(deyer) {
  video.currentTime += Number(this.dataset.value);
  deyer = "ArrowRight";
}

const ireli = document.querySelector(".fa-angles-right");
const geri = document.querySelector(".fa-angles-left");

document.addEventListener("keydown", (x) => {
  if (x.code === "Space") {
    playpause();
  }
  if (x.code === "ArrowRight" && x.ctrlKey) {
    video.currentTime += Number(ireli.dataset.value);
    console.log("jj");
  }
  if (x.code === "ArrowLeft" && x.ctrlKey) {
    video.currentTime += Number(geri.dataset.value);
  }
  if (x.code === "KeyM" && x.ctrlKey) {
    vol()
  }
});

const idare = document.querySelector(".video-control");
let boolean = false;
idare.addEventListener("mouseup", () => convector(false));
idare.addEventListener("mousedown", () => convector(true));
idare.addEventListener("click", times);
idare.addEventListener("mousemove", (event) => boolean && times(event));

function convector(gelendeyer) {
  boolean = gelendeyer;
}

function times(event) {
  const videodeyer = (event.offsetX / idare.offsetWidth) * video.duration;
  video.currentTime = videodeyer;

  // console.log(video.duration);
}

const zaman = document.querySelector(".zaman");
idare.addEventListener("mousemove", (event) => {
  const videotime = parseInt(
    (event.offsetX / idare.offsetWidth) * video.duration
  );
  // vaxtgosterici.currentTime = videotime;
  let san = parseInt(videotime % 60);
  let deq = parseInt((videotime / 60) % 60);
  let sat = parseInt(videotime / 600);
  let blok = sat + ":" + deq + ":" + san;
  zaman.textContent = blok;

  //* balaca video start
  const videodeyer2 = (event.offsetX / idare.offsetWidth) * middle.duration;
  middle.currentTime = videodeyer2;
  let dur = parseInt(middle.duration / 2);
  let dat = parseInt(middle.currentTime);
  //  console.log(dur)
  //  console.log(dat);
  if (dur < dat) {
    middle.setAttribute("style", "right:0px");
    zaman.setAttribute("style", "right:20px");
  } else {
    middle.setAttribute("style", "right:-80px");
    zaman.setAttribute("style", "right:-60px");
  }

  //* balaca video end
  vaxtgosterici.style.width = `${event.offsetX}px`;
  // middle.currentTime=blok
  // console.log("San",event.offsetX);
  // console.log(blok);
  // zaman.setAttribute("style","display:block")
  zaman.classList.remove("hidden");
  middle.classList.remove("hidden");
  timelens();
});
function timelens() {
  const videotimee = (video.currentTime / video.duration) * 100;
  // p.style.width = `${videotime}%`;
  // console.log("gelendeyer",videotimee)
}

idare.addEventListener("mouseout", () => {
  // console.log("sas");
  // zaman.setAttribute("style","display:none")
  zaman.classList.add("hidden");
  middle.classList.add("hidden");
});


const container = document.querySelector(".top-container")
const max = document.querySelector(".fa-expand")
let number = 0
max.addEventListener("click", () => {

  if (number === 0) {
    container.classList.add('max');
    number++
    max.classList.remove('fa-expand');
    max.classList.add('fa-compress');
    container.classList.remove("mixminaze")
    mixminaze.classList.remove('fa-up-right-from-square');
    mixminaze.classList.add('fa-share-from-square');
    videoContainer.classList.remove("videoo")
    ireli.setAttribute("style","display:")
  geri.setAttribute("style","display:")

  } else {
    container.classList.remove('max');
    number--
    max.classList.remove('fa-compress');
    max.classList.add('fa-expand');
    ireli.setAttribute("style","display:")
  geri.setAttribute("style","display:")
  }

})

const mixminaze =document.querySelector(".fa-share-from-square")
const footerLeft =document.querySelector(".footer-left")
const videoContainer=document.querySelector(".video-container")
// let mixnum=0
// mixminaze.addEventListener("click",()=>{
// if(mixnum===0){
//   mixminaze.classList.remove('fa-share-from-square');
//   mixminaze.classList.add('fa-up-right-from-square');
//   container.classList.add("mixminaze")
//   footerLeft.classList.add("min-left")
//   ireli.setAttribute("style","display:none")
//   geri.setAttribute("style","display:none")
//   max.classList.remove('fa-compress');
//     max.classList.add('fa-expand');
//     videoContainer.classList.add("videoo")
//   mixnum++
// }
// else{
//   mixminaze.classList.remove('fa-up-right-from-square');
//   mixminaze.classList.add('fa-share-from-square');
//   container.classList.remove("mixminaze")
//   footerLeft.classList.add("min-left")
//   ireli.setAttribute("style","display:")
//   geri.setAttribute("style","display:")
//   videoContainer.classList.remove("videoo")

//   mixnum--
// }

// })

mixminaze.addEventListener("click",togglePictureInPicture)

function togglePictureInPicture() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (document.pictureInPictureEnabled) {
    video.requestPictureInPicture();
  }
}