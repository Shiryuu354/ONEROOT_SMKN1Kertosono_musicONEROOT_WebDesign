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
    img: "/../img/garth.jpg",
    name: "Friends in Low Places",
    artist: "Garth Brooks",
    music: "/../mp3/friends.mp3",
    lyrics: [
        { time: 0, text: "intro..." },
        { time: 9, text: "Blame it all on my roots" },
        { time: 12, text: "I showed up in boots" },
        { time: 14, text: "And ruined your black tie affair" },
        { time: 18, text: "The last one to know" },
        { time: 20, text: "The last one to show" },
        { time: 22, text: "I was the last one you thought you'd see there" },
        { time: 26, text: "And I saw the surprise" },
        { time: 29, text: "And the fear in his eyes" },
        { time: 31, text: "When I took his glass of champagne" },
        { time: 35, text: "And I toasted you" },
        { time: 37, text: "Said, 'Honey, we may be through'" },
        { time: 40, text: "But you'll never hear me complain" },
        { time: 44, text: "'Cause I've got friends in low places" },
        { time: 48, text: "Where the whiskey drowns and the beer chases" },
        { time: 52, text: "My blues away" },
        { time: 57, text: "And I'll be okay" },
        { time: 62, text: "I'm not big on social graces" },
        { time: 66, text: "Think I'll slip on down to the oasis" },
        { time: 70, text: "Oh, I got friends" },
        { time: 74, text: "In low places" },
        { time: 97, text: "Well I guess I was wrong" },
        { time: 99, text: "I just don't belong" },
        { time: 102, text: "But then, I've been there before" },
        { time: 106, text: "Everything's all right" },
        { time: 108, text: "I'll just say goodnight" },
        { time: 110, text: "And I'll show myself to the door" },
        { time: 115, text: "Hey, I didn't mean" },
        { time: 117, text: "To cause a big scene" },
        { time: 119, text: "Just give me a hour and then" },
        { time: 124, text: "Well, I'll be as high" },
        { time: 125, text: "As that ivory tower" },
        { time: 129, text: "That you're livin' in" },
        { time: 133, text: "'Cause I've got firends in low places" },
        { time: 137, text: "Where the whiskey drowns and the beer chases" },
        { time: 141, text: "My blues away" },
        { time: 146, text: "And I'll be okay" },
        { time: 150, text: "I'm not big on social graces" },
        { time: 154, text: "Think I'll slip on down to the oasis" },
        { time: 159, text: "Oh, I got friends" },
        { time: 162, text: "In low places" },
        { time: 168, text: "'Cause I've got friends in low places" },
        { time: 172, text: "Where the whiskey drowns and the beer chases" },
        { time: 176, text: "My blues away" },
        { time: 181, text: "And I'll be okay" },
        { time: 185, text: "I'm not big on social graces" },
        { time: 189, text: "Think I'll slip on down to the oasis" },
        { time: 194, text: "Oh, I got friends" },
        { time: 198, text: "In low places" },
        { time: 204, text: "'Cause I've got friends in low places" },
        { time: 207, text: "Where the whiskey drowns and the beer chases" },
        { time: 212, text: "My blues away" },
        { time: 217, text: "And I'll be okay" },
        { time: 221, text: "I'm not big on social graces" },
        { time: 225, text: "Think I'll slip on down to the oasis" },
        { time: 230, text: "Oh, I got friends" },
        { time: 233, text: "In low places" },
        { time: 239, text: "'Cause I've got friends in low places" },
        { time: 243, text: "Where the whiskey drowns and the beer chases" },
        { time: 247, text: "My blues away" },
        { time: 252, text: "And I'll be okay" },
        { time: 256, text: "..." },
    ],
  },
  {
    img: "/../img/patsy.jpg",
    name: "Crazy",
    artist: "Patsy Cline",
    music: "/../mp3/crazy.mp3",
    lyrics: [
        { time: 0, text: "intro..." },
        { time: 14, text: "Crazy, I'm crazy for feeling so lonely" },
        { time: 26, text: "I'm crazy, crazy for feeling so blue" },
        { time: 41, text: "I knew you'd love me as long as you wanted" },
        { time: 53, text: "And then someday you'd leave me for somebody new" },

        { time: 67, text: "Worry, why do I let myself worry?" },
        { time: 80, text: "Wondering what in the world did I do?" },

        { time: 93, text: "Oh, crazy for thinking that my love could hold you" },
        { time: 108, text: "I'm crazy for trying and crazy for crying" },
        { time: 115, text: "And I'm crazy for loving you" },

        { time: 124, text: "Crazy for thinking that my love could hold you" },
        { time: 136, text: "I'm crazy for trying and crazy for crying" },
        { time: 144, text: "And I'm crazy for loving you" },
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