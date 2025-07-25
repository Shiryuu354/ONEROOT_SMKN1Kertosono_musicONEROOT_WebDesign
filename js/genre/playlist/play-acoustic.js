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
    img: "/../img/ed.jpg",
    name: "Photograph (Acoustic)",
    artist: "Ed Sheeran",
    music: "/../mp3/Photograph.mp3",
    lyrics: [
      { time: 0, text: "intro..." },
      { time: 16, text: "Loving can hurt" },
      { time: 20, text: "Loving can hurt sometimes" },
      { time: 25, text: "But it's the only thing that I know" },
      { time: 33, text: "When it gets hard" },
      { time: 37, text: "You know it can get hard sometimes" },
      { time: 41, text: "It is the only thing that makes us feel alive" },

      { time: 51, text: "We keep this love in a photograph" },
      { time: 55, text: "We made these memories for ourselves" },
      { time: 58, text: "Where our eyes are never closing" },
      { time: 60, text: "Our hearts were never broken" },
      { time: 62, text: "And time's forever frozen still" },

      { time: 66, text: "So you can keep me" },
      { time: 69, text: "Inside the pocket of your ripped jeans" },
      { time: 73, text: "Holding me close until our eyes meet" },
      { time: 77, text: "You won't ever be alone" },
      { time: 81, text: "Wait for me to come home" },

      { time: 86, text: "Loving can heal" },
      { time: 91, text: "Loving can mend your soul" },
      { time: 95, text: "And it's the only thing that I know, know" },
      { time: 106, text: "I swear it will get easier" },
      { time: 104, text: "Remember that with every piece of ya" },
      {
        time: 112,
        text: "And it's the only thing we take with us when we die",
      },

      { time: 121, text: "We keep this love in a photograph" },
      { time: 125, text: "We made these memories for ourselves" },
      { time: 128, text: "Where our eyes are never closing" },
      { time: 130, text: "Our hearts were never broken" },
      { time: 132, text: "And time's forever frozen still" },

      { time: 136, text: "So you can keep me" },
      { time: 139, text: "Inside the pocket of your ripped jeans" },
      { time: 144, text: "Holding me close until our eyes meet" },
      { time: 148, text: "You won't ever be alone" },

      { time: 153, text: "And if you hurt me" },
      { time: 156, text: "That's okay baby, only words bleed" },
      { time: 160, text: "Inside these pages you just hold me" },
      { time: 164, text: "And I won't ever let you go" },

      { time: 168, text: "Wait for me to come home" },
      { time: 172, text: "Wait for me to come home" },
      { time: 176, text: "Wait for me to come home" },
      { time: 180, text: "Wait for me to come home" },

      { time: 185, text: "Oh you can fit me" },
      { time: 189, text: "Inside the necklace you got when you were sixteen" },
      { time: 193, text: "Next to your heartbeat where I should be" },
      { time: 197, text: "Keep it deep within your soul" },

      { time: 202, text: "And if you hurt me" },
      { time: 205, text: "That's okay baby, only words bleed" },
      { time: 209, text: "Inside these pages you just hold me" },
      { time: 213, text: "And I won't ever let you go" },

      { time: 218, text: "When I'm away" },
      { time: 221, text: "I will remember how you kissed me" },
      { time: 226, text: "Under the lamppost back on Sixth Street" },
      { time: 230, text: "Hearing you whisper through the phone" },
      { time: 235, text: "Wait for me to come home" },
    ],
  },

  {
    img: "/../img/let.jpg",
    name: "Let Her Go (Acoustic)",
    artist: "Passenger",
    music: "/../mp3/Let Her Go.mp3",
    lyrics: [
      { time: 0, text: "Intro..." },
      { time: 12, text: "Well you only need the light when it's burning low" },
      { time: 16, text: "Only miss the sun when it starts to snow" },
      { time: 20, text: "Only know you love her when you let her go" },
      { time: 26, text: "Only know you've been high when you're feeling low" },
      { time: 30, text: "Only hate the road when you're missing home" },
      { time: 34, text: "Only know you love her when you let her go" },
      { time: 40, text: "And you let her go" },

      { time: 54, text: "Staring at the bottom of your glass" },
      { time: 57, text: "Hoping one day you'll make a dream last" },
      { time: 60, text: "But dreams come slow and they go so fast" },

      { time: 67, text: "You see her when you close your eyes" },
      { time: 70, text: "Maybe one day you'll understand why" },
      { time: 74, text: "Everything you touch surely dies" },

      { time: 80, text: "But you only need the light when it's burning low" },
      { time: 84, text: "Only miss the sun when it starts to snow" },
      { time: 88, text: "Only know you love her when you let her go" },
      { time: 94, text: "Only know you've been high when you're feeling low" },
      { time: 98, text: "Only hate the road when you're missing home" },
      { time: 102, text: "Only know you love her when you let her go" },

      { time: 109, text: "Your staring at the ceiling in the dark" },
      { time: 112, text: "Same old empty feeling in your heart" },
      { time: 116, text: "Love comes slow and it goes so fast" },

      { time: 123, text: "Well you see her when you fall asleep" },
      { time: 126, text: "But to never to touch and never to keep" },
      {
        time: 129,
        text: "'Cause you loved her too much and you dived too deep",
      },

      { time: 137, text: "Well you only need the light when it's burning low" },
      { time: 140, text: "Only miss the sun when it starts to snow" },
      { time: 144, text: "Only know you love her when you let her go" },
      { time: 150, text: "Only know you've been high when you're feeling low" },
      { time: 154, text: "Only hate the road when you're missing home" },
      { time: 158, text: "Only know you love her when you let her go" },
      { time: 165, text: "And you let her go" },

      { time: 167, text: "Ooh ooh ooh no" },
      { time: 173, text: "And you let her go" },
      { time: 174, text: "Ooh ooh ooh no" },
      { time: 180, text: "Just and you let her go" },

      { time: 192, text: "Well you only need the light when it's burning low" },
      { time: 197, text: "Only miss the sun when it starts to snow" },
      { time: 200, text: "Only know you love her when you let her go" },
      { time: 207, text: "Only know you've been high when you're feeling low" },
      { time: 211, text: "Only hate the road when you're missing home" },
      { time: 215, text: "Only know you love her when you let her go" },

      { time: 223, text: "And you let her go" },
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