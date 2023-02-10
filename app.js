const box = document.querySelector('.box');
const a = document.querySelector('a');
const controlIcon = document.querySelector('.control-icon');
const videoLink = document.querySelector('.videoLink');

const getSong = async () => {
  const res = await fetch('https://burgundy-wildebeest-toga.cyclic.app/kissfm');
  const data = await res.json();
  box.innerHTML = `
            <h2>Now Playing:</h2>
            <h1 id="song">${data.song}</h1>
            <h3 id="singer">${data.singer}</h3>
            ${
              data.videoLink === '#'
                ? `<img id="songImg" src="${data.thumbnail}"/>`
                : `<a href="${data.videoLink}" target="_blank" class="videoLink">
            <img id="songImg" src="${data.thumbnail}"/>
            </a>`
            }
            ${
              data.videoLink === '#'
                ? '<div style="margin-bottom:4rem;"></div>'
                : `<a class="videoLink" href="${data.videoLink}" target="_blank"><img src="./assets/youtubeBtn.png" id="youtube-icon"/></a>`
            }
        `;
  if (data.videoLink !== '#') {
    const videoLink = document.querySelector('.videoLink');
    videoLink.addEventListener('click', () => {
      if (isPlaying === true) {
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
  }
};

getSong();
setInterval(getSong, 1000 * 10);

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
