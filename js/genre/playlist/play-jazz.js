let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");
let lyricsContainer = document.getElementById("lyrics");

let currentLyricIndex = 0;
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "/../img/Yura-Yunita.jpg",
    name: "Cinta Dan Rahasia",
    artist: "Yura Yunita",
    music: "/../mp3/yuraCinta.mp3",
    lyrics: [
      { time: 0, text: "[Intro]]" },
      { time: 10, text: "Terakhir ku tatap mata indahmu" },
      { time: 16, text: "Di bawah bintang-bintang" },
      { time: 21, text: "Terbelah hatiku antara cinta dan rahasia" },

      { time: 29, text: "Ku cinta padamu" },
      { time: 34, text: "Namun kau milik sahabatku, dilema hatiku" },
      { time: 44, text: "Andai ku bisa berkata sejujurnya" },

      { time: 54, text: "Jangan kau pilih dia" },
      { time: 63, text: "Pilihlah aku yang mampu mencintamu" },
      { time: 69, text: "Lebih dari dia" },

      { time: 74, text: "Bukan ku ingin merebutmu dari sahabatku" },
      { time: 86, text: "Namun kau tahu cinta tak bisa" },
      { time: 92, text: "Tak bisa kau salahkan" },

      { time: 98, text: "Oh ku cinta padamu" },
      { time: 104, text: "Namun kau milik sahabatku, dilema hatiku" },
      { time: 114, text: "Andai ku bisa berkata sejujurnya" },

      { time: 123, text: "Jangan kau pilih dia" },
      { time: 133, text: "Pilihlah aku yang mampu mencintamu lebih dari dia" },
      { time: 143, text: "Bukan ku ingin merebutmu dari sahabatku" },
      {
        time: 156,
        text: "Namun kau tahu cinta tak bisa, tak bisa kau salahkan",
      },

      { time: 188, text: "Jangan (jangan) kau pilih dia (kau pilih dia)" },
      {
        time: 198,
        text: "Pilihlah aku (pilihlah aku) yang mampu mencintamu lebih dari dia",
      },
      { time: 208, text: "Bukan (huuu) ku ingin merebutmu dari sahabatku" },
      {
        time: 220,
        text: "Namun kau tahu cinta tak bisa, tak bisa kau salahkan",
      },

      { time: 236, text: "Tak bisa kau salahkan" },
      { time: 246, text: "Tak bisa kau salahkan..." },
    ],
  },
  {
    img: "/../img/jaz.jpg",
    name: "Dari Mata",
    artist: "Jaz",
    music: "/../mp3/dariMata.mp3",
    lyrics: [
      { time: 0, text: "[Intro]" },
      { time: 14, text: "Matamu melemahkanku" },
      { time: 18, text: "Saat pertama kali kulihatmu" },
      { time: 22, text: "Dan jujur, ku tak pernah merasa" },
      { time: 26, text: "Ku tak pernah merasa begini" },
      { time: 31, text: "Matamu melemahkanku" },
      { time: 35, text: "Saat pertama kali kulihatmu" },
      { time: 41, text: "Dan jujur, ku tak pernah merasa" },
      { time: 44, text: "Ku tak pernah merasa begini" },

      { time: 49, text: "Oh, mungkin inikah cinta pandangan yang pertama?" },
      { time: 55, text: "Kar'na apa yang kurasa ini tak biasa" },
      { time: 59, text: "Jika benar ini cinta, mulai dari mana? (Dari mana?)" },
      { time: 66, text: "Oh, dari mana?" },

      { time: 68, text: "Dari matamu, matamu, ku mulai jatuh cinta" },
      { time: 74, text: "Ku melihat-melihat ada bayangnya" },
      { time: 78, text: "Dari mata, kau buatku jatuh" },
      { time: 81, text: "Jatuh, terus jatuh ke hati (jatuh ke hati)" },

      { time: 86, text: "Dari matamu, matamu, ku mulai jatuh cinta" },
      { time: 92, text: "Ku melihat, melihat ada bayangnya" },
      { time: 97, text: "Dari mata, kau buatku jatuh" },
      { time: 99, text: "Jatuh, terus jatuh ke hati" },

      { time: 105, text: "Matamu melemahkanku" },
      { time: 108, text: "Saat pertama kali kulihatmu" },
      { time: 112, text: "Dan jujur, ku tak pernah merasa" },
      { time: 115, text: "Ku tak pernah merasa begini" },

      { time: 121, text: "Oh, mungkin inikah cinta pandangan yang pertama? (Yang pertama)" },
      { time: 127, text: "Kar'na apa yang kurasa ini tak biasa" },
      { time: 131, text: "Jika benar ini cinta, mulai dari mana? (Dari mana?)" },
      { time: 138, text: "Oh, dari mana?" },

      { time: 140, text: "Dari matamu, matamu, ku mulai jatuh cinta" },
      { time: 147, text: "Ku melihat, melihat ada bayangnya" },
      { time: 151, text: "Dari mata, kau buatku jatuh" },
      { time: 153, text: "Jatuh, terus jatuh ke hati (jatuh ke hati)" },

      { time: 158, text: "Dari matamu, matamu, ku mulai jatuh cinta" },
      { time: 164, text: "Ku melihat, melihat ada bayangnya" },
      { time: 168, text: "Dari mata, kau buatku jatuh" },
      { time: 171, text: "Jatuh, terus jatuh ke hati" },

      { time: 177, text: "Dari mata, kau buatku jatuh" },
      { time: 180, text: "Jatuh, terus" },

      { time: 182, text: "Dari matamu, matamu, ku mulai jatuh cinta (jatuh ke hati)" },
      { time: 188, text: "Ku melihat, melihat ada bayangnya (melihat ada bayangnya, oh)" },

      { time: 192, text: "Dari mata, kau buatku jatuh" },
      { time: 195, text: "Jatuh, terus jatuh ke hati (jatuh ke hati)" },

      { time: 200, text: "Dari matamu, matamu, ku mulai jatuh cinta" },
      { time: 205, text: "Ku melihat, melihat ada bayangnya" },

      { time: 210, text: "Dari mata, kau buatku jatuh" },
      { time: 212, text: "Jatuh, terus" },

      { time: 215, text: "Dari mata, kau buatku jatuh" },
      { time: 218, text: "Jatuh ke hati" },

      { time: 223, text: "Ho-ho-ho-oh" },

  ],
  }
];

loadTrack(track_index);

function loadTrack(index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[index].img + ")";
  track_name.textContent = music_list[index].name;
  track_artist.textContent = music_list[index].artist;
  now_playing.textContent = `Playing music ${index + 1} of ${music_list.length}`;

  updateTimer = setInterval(setUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);

  random_bg_color();
  loadLyrics(index);
}

function loadLyrics(index) {
  lyricsContainer.innerHTML = "";
  currentLyricIndex = 0;

  const lyrics = music_list[index].lyrics || [];

  lyrics.forEach((line, i) => {
    const div = document.createElement("div");
    div.className = "lyric-line";
    div.id = "line-" + i;
    div.textContent = line.text;
    lyricsContainer.appendChild(div);
  });
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}
function repeatTrack() {
  loadTrack(track_index);
  playTrack();
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fas fa-pause"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fas fa-play"></i>';
}

function nextTrack() {
  if (isRandom) {
    track_index = Math.floor(Math.random() * music_list.length);
  } else {
    track_index = (track_index + 1) % music_list.length;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  track_index = (track_index - 1 + music_list.length) % music_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  if (!isNaN(curr_track.duration)) {
    let seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime % 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration % 60);

    curr_time.textContent = `${format(currentMinutes)}:${format(currentSeconds)}`;
    total_duration.textContent = `${format(durationMinutes)}:${format(durationSeconds)}`;

    updateLyrics(curr_track.currentTime);
  }
}

function format(n) {
  return n < 10 ? "0" + n : n;
}

function random_bg_color() {
  const hex = "0123456789abcdef";
  const randomHex = () =>
    "#" + Array.from({ length: 6 }, () => hex[Math.floor(Math.random() * 16)]).join("");
  const gradient = `linear-gradient(to right, ${randomHex()}, ${randomHex()})`;
  document.body.style.background = gradient;
}

function updateLyrics(currentTime) {
  const lyrics = music_list[track_index].lyrics || [];

  for (let i = 0; i < lyrics.length; i++) {
    if (
      currentTime >= lyrics[i].time &&
      (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)
    ) {
      if (currentLyricIndex !== i) {
        document.querySelectorAll(".lyric-line").forEach((el) =>
          el.classList.remove("active")
        );

        const activeLine = document.getElementById("line-" + i);
        if (activeLine) {
          activeLine.classList.add("active");
          activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        currentLyricIndex = i;
      }
      break;
    }
  }
}