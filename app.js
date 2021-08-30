const box = document.querySelector('.box');
const a = document.querySelector('a');
const controlIcon = document.querySelector('.control-icon');

const getSong = async () => {
  const res = await fetch('https://dagbareshet.herokuapp.com/kissfm');
  const data = await res.json();
  box.innerHTML = `
            <h2>Now Playing:</h2>
            <h1 id="song">${data.song}</h1>
            <h3 id="singer">${data.singer}</h3>
            <img id="songImg" src="${data.thumbnail}"/>
            ${
              data.videoLink === '#'
                ? '<div style="margin-bottom:4rem;"></div>'
                : `<a href="${data.videoLink}" target="_blank"><img src="./assets/youtubeBtn.png" id="youtube-icon"/></a>`
            }
        `;
};

getSong();
setInterval(getSong, 1000 * 20);

let isPlaying = false;
const radio = new Audio('https://online.kissfm.ua/KissFM_Digital_HD');

controlIcon.addEventListener('click', () => {
  if (!isPlaying) {
    radio.load();
    radio.play();
    isPlaying = !isPlaying;
    controlIcon.innerHTML = `<i class="far fa-stop-circle" id="play" ></i>`;
    controlIcon.classList.add('spin');
    equ.style.display = 'block';
    setTimeout(() => {
      controlIcon.classList.remove('spin');
    }, 500);
  } else {
    radio.pause();
    isPlaying = !isPlaying;
    controlIcon.innerHTML = `<i class="far fa-play-circle" id="stop"></i>`;
    controlIcon.classList.add('spin');
    equ.style.display = 'none';
    setTimeout(() => {
      controlIcon.classList.remove('spin');
    }, 500);
  }
});
