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
    img: "/../img/closer.jpg",
    name: "Closer",
    artist: "The Chainsmokers",
    music: "/../mp3/closer.mp3",
    lyrics: [
      { time: 0, text: "[intro]" },
      { time: 10, text: "Hey, I was doing just fine before I met you" },
      { time: 14, text: "I drink too much and that's an issue, but I'm okay" },
      { time: 20, text: "Hey, you tell your friends it was nice to meet them" },
      { time: 25, text: "But I hope I never see them again" },

      { time: 30, text: "I know it breaks your heart" },
      { time: 32, text: "Moved to the city in a broke-down car" },
      { time: 36, text: "And four years, no calls" },
      { time: 38, text: "Now you're looking pretty in a hotel bar" },
      { time: 40, text: "And I, I, I can't stop" },
      { time: 45, text: "No, I, I, I can't stop" },

      {
        time: 50,
        text: "So, baby, pull me closer in the back seat of your Rover",
      },
      { time: 55, text: "That I know you can't afford" },
      { time: 57, text: "Bite that tattoo on your shoulder" },
      { time: 59, text: "Pull the sheets right off the corner" },
      { time: 62, text: "Of the mattress that you stole" },
      { time: 64, text: "From your roommate back in Boulder" },
      { time: 67, text: "We ain't ever getting older" },

      { time: 78, text: "We ain't ever getting older" },
      { time: 88, text: "We ain't ever getting older" },

      { time: 91, text: "You, look as good as the day I met you" },
      { time: 96, text: "I forget just why I left you, I was insane" },
      { time: 101, text: "Stay, and play that Blink-182 song" },
      { time: 105, text: "That we beat to death in Tucson, okay" },

      { time: 112, text: "I know it breaks your heart" },
      { time: 113, text: "Moved to the city in a broke-down car" },
      { time: 117, text: "And four years, no calls" },
      { time: 119, text: "Now I'm looking pretty in a hotel bar" },
      { time: 121, text: "And I, I, I can't stop" },
      { time: 126, text: "No, I, I, I can't stop" },

      {
        time: 131,
        text: "So, baby, pull me closer in the back seat of your Rover",
      },
      { time: 136, text: "That I know you can't afford" },
      { time: 139, text: "Bite that tattoo on your shoulder" },
      { time: 141, text: "Pull the sheets right off the corner" },
      { time: 144, text: "Of the mattress that you stole" },
      { time: 146, text: "From your roommate back in Boulder" },
      { time: 149, text: "We ain't ever getting older" },

      { time: 158, text: "We ain't ever getting older" },
      { time: 168, text: "We ain't ever getting older" },
     
      {
        time: 171,
        text: "So, baby, pull me closer in the back seat of your Rover",
      },
      { time: 176, text: "That I know you can't afford" },
      { time: 179, text: "Bite that tattoo on your shoulder" },
      { time: 181, text: "Pull the sheets right off the corner" },
      { time: 184, text: "Of the mattress that you stole" },
      { time: 186, text: "From your roommate back in Boulder" },
      { time: 189, text: "We ain't ever getting older" },

      { time: 192, text: "We ain't ever getting older" },
      { time: 194, text: "We ain't ever getting older" },
      { time: 196, text: "No, we ain't ever getting older" },
      { time: 199, text: "We ain't ever getting older" },
      { time: 201, text: "We ain't ever getting older" },
      { time: 204, text: "We ain't ever getting older" },
      { time: 206, text: "We ain't ever getting older" },
      { time: 209, text: "We ain't ever getting older" },
      { time: 219, text: "We ain't ever getting older" },
      { time: 229, text: "We ain't ever getting older" },

      { time: 233, text: "[Outro fade]" },
    ],
  },

  {
    img: "/../img/shaun.jpg",
    name: "Way Back Home",
    artist: "Shaun",
    music: "/../mp3/shaun.mp3",
    lyrics: [
      { time: 0, text: "Remember when I told you" },
      { time: 2, text: "No matter where I go" },
      { time: 4, text: "I'll never leave your side" },
      { time: 6, text: "You will never be alone" },

      { time: 8, text: "Even when we go through changes" },
      { time: 11, text: "Even when we’re old" },
      { time: 13, text: "Remember that I told you" },
      { time: 15, text: "You'll find my way back home" },

      { time: 18, text: "[Instrumental]" },

      { time: 28, text: "I could never let you go" },
      { time: 30, text: "Couldn't run away if I tried" },
      { time: 33, text: "Cause even when I'm all alone" },
      { time: 35, text: "You still got a hold on my mind" },

      { time: 37, text: "And I'll always let you know" },
      { time: 40, text: "That I'm always gonna hold on" },

      { time: 45, text: "And I told you right from the start" },
      { time: 47, text: "You just say the word and I'll go" },
      { time: 49, text: "No, it doesn't matter how far" },
      { time: 52, text: "Cause your love is all that I know" },

      { time: 54, text: "Baby, you just stay where you are" },
      { time: 56, text: "And you know I won't be too long" },
      { time: 59, text: "Hold on, hold on" },

      { time: 63, text: "Remember when I told you" },
      { time: 65, text: "No matter where I go" },
      { time: 68, text: "I'll never leave your side" },
      { time: 70, text: "You will never be alone" },

      { time: 72, text: "Even when we go through changes" },
      { time: 75, text: "Even when we’re old" },
      { time: 77, text: "Remember that I told you" },
      { time: 79, text: "You'll find my way back home" },

      { time: 82, text: "[Instrumental]" },

      { time: 99, text: "Joyonghi jamdeun bangeul yeoreo gieogeul kkeonae deureo" },
      { time: 104, text: "Buseojin sigan wieseo seonmyeonghi neoneun tteoolla" },
      { time: 108, text: "Gil ileun maeumsoge neol gadun chae sara" },
      { time: 113, text: "Geuman geuman" },

      { time: 118, text: "Meomchun sigan sok jamdeun neoreul chajaga" },
      { time: 123, text: "Amuri magado gyeolguk neoui gyeochin geol" },
      { time: 126, text: "Gilgo gin yeohaengeul kkeunnae ijen doraga" },
      { time: 132, text: "Neoraneun jibeuro jigeum dasi way back home" },

      { time: 136, text: "Sesangeul dwijibeo chajeuryeo hae" },
      { time: 140, text: "Ojik neoro wangyeoldoen iyagireul" },
      { time: 146, text: "No, I won't ever lose" },
      { time: 152, text: "As long as you're there" },
      { time: 163, text: "Bichi da kkeojin yeogi nareul anajwo" },

      { time: 173, text: "Nuneul gameumyeon sori eopsi millyeowa" },
      { time: 177, text: "Nuneul gameumyeon sori eopsi millyeowa" },

      { time: 181, text: "Even when we go through changes" },
      { time: 183, text: "Even when we're old" },
      { time: 185, text: "Remember that I told you" },
      { time: 188, text: "I'll find my way back home" },
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