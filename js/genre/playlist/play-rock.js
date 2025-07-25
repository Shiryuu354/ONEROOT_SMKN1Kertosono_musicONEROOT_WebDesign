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
    img: "/../img/queen.jpg",
    name: "Bohemian Rhapsody",
    artist: "Queen",
    music: "/../mp3/bohemian.mp3",
    lyrics: [
      { time: 0, text: "Is this the real life? Is this just fantasy?" },
      { time: 3, text: "Caught in a landslide, No escape from reality" },
      { time: 6, text: "Open your eyes, Look up to the skies and see," },
      { time: 9, text: "I'm just a poor boy, I need no sympathy" },
      {
        time: 12,
        text: "Because I'm easy come, easy go, Little high, little low",
      },
      {
        time: 15,
        text: "Any way the wind blows doesn't really matter to me, to me",
      },
      { time: 18, text: "Mama, just killed a man, Put a gun against his head" },
      { time: 21, text: "Pulled my trigger, now he's dead" },
      { time: 24, text: "Mama, life had just begun" },
      { time: 27, text: "But now I've gone and thrown it all away" },
      { time: 30, text: "Mama, ooh, Didn't mean to make you cry" },
      { time: 33, text: "If I'm not back again this time tomorrow" },
      { time: 36, text: "Carry on, carry on as if nothing really matters" },
      { time: 39, text: "Too late, my time has come" },
      {
        time: 42,
        text: "Sends shivers down my spine, body's aching all the time",
      },
      { time: 45, text: "Goodbye, ev'rybody, I've got to go" },
      { time: 48, text: "Gotta leave you all behind and face the truth" },
      { time: 51, text: "Mama, ooh, I don't want to die" },
      { time: 54, text: "Sometimes wish I'd never been born at all" },
      { time: 57, text: "I see a little silhouetto of a man" },
      { time: 60, text: "Scaramouche, Scaramouche, will you do the Fandango" },
      {
        time: 63,
        text: "Thunderbolt and lightning, very, very fright'ning me",
      },
      { time: 66, text: "Galileo. Galileo. Galileo. Galileo, Galileo figaro" },
      { time: 69, text: "Magnifico." },
      { time: 72, text: "I'm just a poor boy, nobody loves me" },
      { time: 75, text: "He's just a poor boy from a poor family" },
      { time: 78, text: "Spare him his life from this monstrosity" },
      { time: 81, text: "Easy come, easy go, will you let me go" },
      { time: 84, text: "Bismillah! No, we will not let you go" },
      { time: 87, text: "Let him go! Bismillah, we will not let you go" },
      { time: 90, text: "Let him go! Bismillah, we will not let you go" },
      { time: 93, text: "Let me go. Will not let you go" },
      { time: 96, text: "Let me go. Will not let you go. Let me go. Ah" },
      { time: 99, text: "No, no, no, no, no, no, no." },
      { time: 102, text: "Oh mama mia, mama mia. Mama mia, let me go" },
      {
        time: 105,
        text: "Beelzebub has a devil put aside for me, for me, for me",
      },
      { time: 108, text: "So you think you can stone me and spit in my eye" },
      { time: 111, text: "So you think you can love me and leave me to die" },
      { time: 114, text: "Oh, baby, can't do this to me, baby" },
      {
        time: 117,
        text: "Just gotta get out, just gotta get right outta here",
      },
      { time: 120, text: "Nothing really matters, Anyone can see" },
      { time: 123, text: "Nothing really matters" },
      { time: 126, text: "Nothing really matters to me" },
      { time: 129, text: "Any way the wind blows" },
    ],
  },
  {
    img: "/../img/kangen.jpg",
    name: "Kangen",
    artist: "Dewa 19",
    music: "/../mp3/kangen.mp3",
    lyrics: [
      { time: 0, text: "intro..." },
      { time: 15, text: "Kut'rima suratmu" },
      { time: 17, text: "T'lah kubaca dan aku mengerti" },
      { time: 22, text: "Betapa merindunya dirimu" },
      { time: 26, text: "Akan hadirnya diriku" },
      { time: 30, text: "Di dalam hari-harimu" },
      { time: 33, text: "Bersama lagi" },
      { time: 38, text: "Kautanyakan padaku" },
      { time: 41, text: "Kapan aku akan kembali lagi" },
      { time: 45, text: "Katamu kau tak kuasa" },
      { time: 48, text: "Melawan gejolak di dalam dada" },
      { time: 53, text: "Yang membara menahan rasa" },
      { time: 57, text: "Pertemuan kita nanti" },
      { time: 62, text: "Saat bersama dirimu" },

      { time: 67, text: "Semua kata rindumu" },
      { time: 69, text: "Semakin membuatku tak berdaya" },
      { time: 75, text: "Menahan rasa ingin jumpa" },
      { time: 80, text: "Percayalah padaku aku pun rindu kamu" },
      { time: 84, text: "Ku akan pulang" },
      { time: 87, text: "Melepas semua kerinduan" },
      { time: 93, text: "Yang terpendam" },

      { time: 113, text: "Kautuliskan padaku kata cinta" },
      { time: 118, text: "Yang manis dalam suratmu" },
      { time: 120, text: "Kaukatakan padaku" },
      { time: 123, text: `"Saat ini kuingin hangat pelukmu"` },
      { time: 128, text: "Dan belai lembut kasihmu" },
      { time: 131, text: "Takkan kulupa s'lamanya" },
      { time: 137, text: "Saat kau ada di sisiku" },

      { time: 142, text: "Semua kata rindumu" },
      { time: 144, text: "Semakin membuatku tak berdaya" },
      { time: 150, text: "Menahan rasa ingin jumpa" },
      { time: 154, text: "Percayalah padaku aku pun rindu kamu" },
      { time: 160, text: "Ku akan pulang" },
      { time: 163, text: "Melepas semua kerinduan" },
      { time: 168, text: "Yang terpendam" },

      { time: 173, text: "Jangan katakan cinta" },
      { time: 176, text: "Menambah beban rasa" },
      { time: 180, text: "Sudah simpan saja sedihmu itu" },
      { time: 186, text: "Ku akan datang" },

      { time: 226, text: "Semua kata rindumu" },
      { time: 228, text: "Semakin membuatku tak berdaya" },
      { time: 233, text: "Menahan rasa ingin jumpa" },
      { time: 239, text: "Percayalah padaku aku pun rindu kamu" },
      { time: 244, text: "Ku akan pulang" },
      { time: 247, text: "Melepas semua kerinduan" },
      { time: 252, text: "Yang terpendam" },

      { time: 260, text: "Semua kata rindumu" },
      { time: 262, text: "Semakin membuatku tak berdaya" },
      { time: 268, text: "Menahan rasa ingin jumpa" },
      { time: 272, text: "Percayalah padaku aku pun rindu kamu" },
      { time: 278, text: "Ku akan pulang" },
      { time: 281, text: "Melepas semua kerinduan" },
      { time: 286, text: "Yang terpendam" },
    ],
  },
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
  now_playing.textContent = `Playing music ${index + 1} of ${
    music_list.length
  }`;

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

    curr_time.textContent = `${format(currentMinutes)}:${format(
      currentSeconds
    )}`;
    total_duration.textContent = `${format(durationMinutes)}:${format(
      durationSeconds
    )}`;

    updateLyrics(curr_track.currentTime);
  }
}

function format(n) {
  return n < 10 ? "0" + n : n;
}

function random_bg_color() {
  const hex = "0123456789abcdef";
  const randomHex = () =>
    "#" +
    Array.from({ length: 6 }, () => hex[Math.floor(Math.random() * 16)]).join(
      ""
    );
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
        document
          .querySelectorAll(".lyric-line")
          .forEach((el) => el.classList.remove("active"));

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
