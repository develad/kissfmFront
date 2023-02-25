const box = document.querySelector(".box");
const song = document.querySelector(".song");
const _song = document.querySelector("#song");
const _singer = document.querySelector("#singer");
const loading = document.querySelector(".loading");
const a = document.querySelector("a");
const controlIcon = document.querySelector(".control-icon");
const videoLink = document.querySelector(".videoLink");
const videoLinkBox = document.querySelector(".videoLinkBox");
const favBtn = document.querySelector("#favBtn");
const favBox = document.querySelector(".favBox");
const randomSongs = document.querySelector(".randomSongs");
const randomBtn = document.querySelector("#randomBtn");

// const setFavBox = () => {
//   const favs = JSON.parse(localStorage.getItem("favlist"));
//   favs === null
//     ? (favBox.innerHTML = `<h1>No Favs</h1>`)
//     : favs.map((item, index) => {
//         favBox.innerHTML += `
//         <div class="favItem" data-info=${index}>
//         <p>${item.song} - ${item.singer}</p>
//         <img src=${item.thumbnail} width="200px" />
//         </div>
//     `;
//       });
//   const favItem = document.querySelectorAll(".favItem");
//   [...favItem].forEach((item) => {
//     item.addEventListener("click", () => {
//       console.log(item.dataset.info);
//       const filteredArr = [...favItem].filter(
//         (s) => s.dataset.info !== item.dataset.info,
//       );
//       console.log(filteredArr);
//       localStorage.setItem("favlist", JSON.stringify([...filteredArr]));

//       // console.log([...favItem].slice(+item.dataset.info));
//     });
//   });
// };

// setFavBox();

let info;
favBtn.addEventListener("click", () => {
  // console.log(info);
  const tmp = JSON.parse(localStorage.getItem("favlist"));
  // console.log(tmp);
  const indexFav =
    tmp !== null ? tmp.findIndex((item) => item.title === info.title) : -2;
  if (indexFav === -1 && tmp !== null) {
    favBtn.innerHTML = "Added !";
    localStorage.setItem("favlist", JSON.stringify([...tmp, info]));
    setTimeout(() => {
      favBtn.innerHTML = "Add to Favorite";
    }, 1000);
  } else if (indexFav === -2 && tmp === null) {
    favBtn.innerHTML = "Added !";
    localStorage.setItem("favlist", JSON.stringify([info]));
    setTimeout(() => {
      favBtn.innerHTML = "Add to Favorite";
    }, 1000);
  }

  renderFavs();
});

const renderFavs = () => {
  favBox.innerHTML = "";
  const favlist = JSON.parse(localStorage.getItem("favlist"));
  console.log(favlist);
  if (favlist) {
    favlist.reverse().map(
      (item) =>
        (favBox.innerHTML += `
      <div class="favItem">
        <p>${item.song}</p>
        <p>${item.singer}</p>
        <img src="${item.thumbnail}"/>
        <a href="${item.videoLink}" target="_blank"><p><span><i class="fab fa-youtube"></i></i></span>YouTube Link<p/></a>
      </div>
    `),
    );
  } else {
    favBox.innerHTML = `<h1 style="grid-column: 1 / -1;text-align: center;">Empty list</h1>`;
  }
};

renderFavs();

const getSong = async () => {
  // console.log(videoLink);
  const res = await fetch("https://burgundy-wildebeest-toga.cyclic.app/kissfm");
  const data = await res.json();
  // console.log(data);
  info = data;

  loading.style.display = "none";
  song.style.display = "block";
  _song.innerHTML = data.song;
  _singer.innerHTML = data.singer;
  a.style.filter = "none";
  a.innerHTML = `<img id="songImg" src="${data.thumbnail}" />`;

  videoLinkBox.href = data.videoLink;
  // if (data.videoLink !== "#") {
  //   const videoLinkBox = document.querySelector(".videoLinkBox");
  //   videoLink.addEventListener("click", () => {
  //     if (isPlaying === true) {
  //       radio.pause();
  //       isPlaying = !isPlaying;
  //       controlIcon.innerHTML = `<i class="far fa-play-circle" id="stop"></i>`;
  //       controlIcon.classList.add("spin");
  //       equ.style.display = "none";
  //       setTimeout(() => {
  //         controlIcon.classList.remove("spin");
  //       }, 500);
  //     }
  //   });
  // }
};

getSong();
setInterval(getSong, 1000 * 10);

let isPlaying = false;
const radio = new Audio("https://online.kissfm.ua/KissFM_Digital_HD");

controlIcon.addEventListener("click", () => {
  if (!isPlaying) {
    radio.load();
    radio.play();
    isPlaying = !isPlaying;
    controlIcon.innerHTML = `<i class="far fa-stop-circle" id="play" ></i>`;
    controlIcon.classList.add("spin");
    equ.style.display = "block";
    setTimeout(() => {
      controlIcon.classList.remove("spin");
    }, 500);
  } else {
    radio.pause();
    isPlaying = !isPlaying;
    controlIcon.innerHTML = `<i class="far fa-play-circle" id="stop"></i>`;
    controlIcon.classList.add("spin");
    equ.style.display = "none";
    setTimeout(() => {
      controlIcon.classList.remove("spin");
    }, 500);
  }
});

const getRandomSongs = async () => {
  // console.log(videoLink);
  const res = await fetch(
    "https://burgundy-wildebeest-toga.cyclic.app/kissfmRandomSongs",
  );
  const data = await res.json();
  console.log(data);
  randomSongs.innerHTML = "";
  data.randomSongs.map(
    (item) =>
      (randomSongs.innerHTML += `
    <div class="favItem">
      <p>${item.song}</p>
      <p>${item.singer}</p>
      <img src="${item.thumbnail}"/>
      <a href="${item.videoLink}" target="_blank"><p><span><i class="fab fa-youtube"></i></i></span>YouTube Link<p/></a>
    </div>
  `),
  );
};

getRandomSongs();

randomBtn.addEventListener("click", getRandomSongs);
