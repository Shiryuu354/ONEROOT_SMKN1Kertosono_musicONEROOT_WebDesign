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
        img : '/../img/love-story.jpg',
        name : 'Love Story',
        artist : 'Taylor Swift',
        music : '/../mp3/Love Story.mp3',
        lyrics : [
          { time: 0, text: "[Intro]" },
          { time: 16, text: "We were both young when I first saw you" },
          { time: 20, text: "I close my eyes and the flashback starts" },
          { time: 23, text: "I'm standing there on a balcony in summer air" },
          { time: 32, text: "See the lights, see the party, the ball gowns" },
          { time: 36, text: "See you make your way through the crowd" },
          { time: 40, text: "And say hello" },
          { time: 44, text: "Little did I know" },

          { time: 48, text: "That you were Romeo, you were throwing pebbles" },
          { time: 52, text: "And my daddy said, 'Stay away from Juliet'" },
          { time: 56, text: "And I was crying on the staircase" },
          { time: 58, text: "Begging you, 'Please don't go'" },
          { time: 63, text: "And I said" },

          { time: 65, text: "Romeo, take me somewhere we can be alone" },
          { time: 68, text: "I'll be waiting, all there's left to do is run" },
          { time: 72, text: "You'll be the prince and I'll be the princess" },
          { time: 77, text: "It's a love story, baby, just say, 'Yes'" },

          { time: 85, text: "So I sneak out to the garden to see you" },
          { time: 89, text: "We keep quiet 'cause we're dead if they knew" },
          { time: 93, text: "So close your eyes" },
          { time: 95, text: "Escape this town for a little while" },

          { time: 101, text: "Cause you were Romeo, I was a scarlet letter" },
          { time: 105, text: "And my daddy said, 'Stay away from Juliet'" },
          { time: 108, text: "But you were everything to me" },
          { time: 111, text: "I was begging you, 'Please don't go'" },
          { time: 115, text: "And I said" },

          { time: 116, text: "Romeo, take me somewhere we can be alone" },
          { time: 121, text: "I'll be waiting, all there's left to do is run" },
          { time: 124, text: "You'll be the prince and I'll be the princess" },
          { time: 129, text: "It's a love story, baby, just say, 'Yes'" },

          { time: 133, text: "Romeo, save me, they're trying to tell me how to feel" },
          { time: 138, text: "This love is difficult, but it's real" },
          { time: 141, text: "Don't be afraid, we'll make it out of this mess" },
          { time: 145, text: "It's a love story, baby, just say, 'Yes'" },

          { time: 152, text: "(Oh-oh)" },
          { time: 165, text: "I got tired of waiting" },
          { time: 169, text: "Wondering if you were ever coming around" },
          { time: 173, text: "My faith in you is fading" },
          { time: 177, text: "When I met you on the outskirts of town" },
          { time: 181, text: "And I said" },

          { time: 182, text: "Romeo, save me, I've been feeling so alone" },
          { time: 186, text: "I keep waiting for you, but you never come" },
          { time: 190, text: "Is this in my head? I don't know what to think" },
          { time: 194, text: "He knelt to the ground and pulled out a ring and said" },

          { time: 198, text: "Marry me, Juliet" },
          { time: 200, text: "You'll never have to be alone" },
          { time: 202, text: "I love you and that's all I really know" },
          { time: 206, text: "I talked to your dad, go pick out a white dress" },
          { time: 210, text: "It's a love story, baby, just say, 'Yes'" },

          { time: 217, text: "(Oh-oh-oh-oh)" },
          { time: 221, text: "(Oh-oh-oh-oh)" },

          { time: 226, text: "'Cause we were both young when I first saw you" },
        ],
    },
    {
        img : '/../img/lyodra.jpg',
        name : 'Sang Dewi',
        artist : 'Lyodra',
        music : '/../mp3/Sang Dewi.mp3',
        lyrics: [
          { time: 0, text: "[intro]" },
          { time: 17, text: "Walaupun jiwaku pernah terluka" },
          { time: 23, text: "Hingga nyaris bunuh diri" },
          { time: 28, text: "Wanita mana yang sanggup hidup sendiri" },
          { time: 36, text: "Di dunia ini" },
          { time: 41, text: "Walaupun t’lah kututup mata hati" },
          { time: 47, text: "Begitupun telingaku" },
          { time: 51, text: "Namun bila di kala cinta memanggilmu" },
          { time: 59, text: "Dengarlah ini" },

          { time: 63, text: "Walaupun dirimu tak bersayap" },
          { time: 70, text: "Ku akan percaya" },
          { time: 75, text: "Kau mampu terbang bawa diriku" },
          { time: 82, text: "Tanpa takut dan ragu" },

          { time: 98, text: "Walaupun mulutku pernah bersumpah" },
          { time: 105, text: "Sudi lagi jatuh cinta" },
          { time: 109, text: "Wanita seperti dirikupun ternyata" },
          { time: 116, text: "Mudah menyerah" },

          { time: 121, text: "Walaupun kau bukan titisan dewa" },
          { time: 128, text: "Ku takkan kecewa" },
          { time: 133, text: "Karena kau jadikanku sang dewi" },
          { time: 140, text: "Dalam taman surgawi" },

          { time: 177, text: "Walaupun dirimu tak bersayap" },
          { time: 186, text: "Ku akan percaya" },
          { time: 190, text: "Kau mampu terbang bawa diriku" },
          { time: 197, text: "Tanpa takut dan ragu" },

          { time: 202, text: "Walaupun kau bukan titisan dewa" },
          { time: 209, text: "Ku takkan kecewa" },
          { time: 214, text: "Karena kau jadikanku sang dewi" },
          { time: 220, text: "Dalam taman surgawi" },

          { time: 228, text: "[Outro]" },
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