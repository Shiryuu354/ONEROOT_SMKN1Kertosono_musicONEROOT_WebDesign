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
    img: "/../img/uptown-funk.jpg",
    name: "Uptown Funk",
    artist: "Mark Ronson (feat. Bruno Mars)",
    music: "/../mp3/uptown.mp3",
    lyrics: [
      { time: 0, text: "Doh" },
      { time: 2, text: "Doh-doh-doh, doh-doh-doh, doh-doh" },
      { time: 5, text: "Doh-doh-doh, doh-doh-doh, doh-doh" },
      { time: 8, text: "Doh-doh-doh, doh-doh-doh, doh-doh" },
      { time: 11, text: "Doh-doh-doh, doh-doh (Aw, ow)" },

      { time: 14, text: "This hit, that ice cold" },
      { time: 17, text: "Michelle Pfeiffer, that white gold" },
      { time: 20, text: "This one for them hood girls" },
      { time: 23, text: "Them good girls, straight masterpieces" },
      { time: 26, text: "Stylin', wilin', livin' it up in the city" },
      { time: 29, text: "Got Chucks on with Saint Laurent" },
      { time: 32, text: "Gotta kiss myself, I'm so pretty" },

      { time: 35, text: "I'm too hot (Hot damn)" },
      { time: 37, text: "(Doh)" },
      { time: 39, text: "Uh, call the police and the fireman" },
      { time: 42, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 45, text: "I'm too hot (Hot damn)" },
      { time: 47, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 50, text: "Make a dragon wanna retire, man" },
      { time: 53, text: "I'm too hot (Hot damn)" },
      { time: 55, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 58, text: "Say my name, you know who I am" },
      { time: 61, text: "I'm too hot (Hot damn)" },
      { time: 64, text: "(Doh-doh-doh, doh-doh, doh, doh)" },
      { time: 67, text: "And my band 'bout that money, break it down" },

      { time: 70, text: "Girls hit your hallelujah (Woo)" },
      { time: 73, text: "Girls hit your hallelujah (Woo)" },
      { time: 76, text: "Girls hit your hallelujah (Woo)" },
      { time: 79, text: "'Cause uptown funk gon' give it to you (Woo)" },
      { time: 82, text: "('Cause uptown funk gon' give it to you)" },
      { time: 85, text: "'Cause uptown funk gon' give it to you" },
      { time: 88, text: "Saturday night and we in the spot" },
      { time: 91, text: "Don't believe me, just watch, come on" },

      { time: 94, text: "Doh" },
      { time: 96, text: "Doh-doh-doh, doh-doh-doh, doh-doh (Ya)" },
      { time: 99, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 102, text: "Don't believe me, just watch, uh" },
      { time: 105, text: "Doh-doh-doh, doh-doh-doh, doh-doh (Ya)" },
      { time: 108, text: "(Doh-doh-doh, doh-doh–)" },
      { time: 111, text: "Don't believe me, just watch, uh" },
      { time: 114, text: "Don't believe me, just watch, uh" },
      { time: 117, text: "Don't believe me, just watch" },
      { time: 120, text: "Don't believe me, just watch" },
      { time: 123, text: "Hey, hey, hey, oh" },

      { time: 126, text: "Stop, wait a minute" },
      { time: 129, text: "Fill my cup, put some liquor in it" },
      { time: 132, text: "Take a sip, sign the check" },
      { time: 135, text: "Julio, get the stretch" },
      { time: 138, text: "Ride to Harlem, Hollywood, Jackson, Mississippi" },
      { time: 141, text: "If we show up, we gon' show out" },
      { time: 144, text: "Smoother than a fresh jar of Skippy" },

      { time: 147, text: "I'm too hot (Hot damn)" },
      { time: 150, text: "(Doh)" },
      { time: 153, text: "Call the police and the fireman" },
      { time: 156, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 159, text: "I'm too hot (Hot damn)" },
      { time: 162, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 165, text: "Make a dragon wanna retire, man" },
      { time: 168, text: "I'm too hot (Too hot, hot damn, hot damn)" },
      { time: 171, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 174, text: "Bitch, say my name, you know who I am" },
      { time: 177, text: "I'm too hot (Hot damn)" },
      { time: 180, text: "(Doh-doh-doh, doh-doh, doh, doh)" },
      { time: 183, text: "Uh, and my band 'bout that money, break it down" },

      { time: 186, text: "Girls hit your hallelujah (Woo)" },
      { time: 189, text: "Girls hit your hallelujah (Woo)" },
      { time: 192, text: "Girls hit your hallelujah (Woo)" },
      { time: 195, text: "'Cause uptown funk gon' give it to you (Woo)" },
      { time: 198, text: "('Cause uptown funk gon' give it to you)" },
      { time: 201, text: "'Cause uptown funk gon' give it to you" },
      { time: 204, text: "Saturday night and we in the spot" },
      { time: 207, text: "Don't believe me, just watch, come on" },

      { time: 210, text: "Doh" },
      { time: 212, text: "Doh-doh-doh, doh-doh-doh, doh-doh (Ya)" },
      { time: 215, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 218, text: "Don't believe me, just watch, uh" },
      { time: 221, text: "Doh-doh-doh, doh-doh-doh, doh-doh (Ya)" },
      { time: 224, text: "(Doh-doh-doh, doh-doh–)" },
      { time: 227, text: "Don't believe me, just watch, uh" },
      { time: 230, text: "Don't believe me, just watch, uh" },
      { time: 233, text: "Don't believe me, just watch" },
      { time: 236, text: "Don't believe me, just watch" },
      { time: 239, text: "Hey, hey, hey, oh" },

      { time: 242, text: "(Doh)" },
      { time: 244, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 247, text: "Before we leave" },
      { time: 250, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 253, text: "Lemme tell y'all a lil' something" },
      { time: 256, text: "Uptown funk you up, uptown funk you up" },
      { time: 259, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 262, text: "Uptown funk you up, uptown funk you up, uh" },
      { time: 265, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 268, text: "I said, uptown funk you up, uptown funk you up, uh" },
      { time: 271, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 274, text: "Uptown funk you up, uptown funk you up, come on" },
      { time: 277, text: "(Doh-doh-doh, doh-doh, doh, doh)" },
      { time: 280, text: "Dance, jump on it" },
      { time: 283, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 286, text: "If you sexy, then flaunt it" },
      { time: 289, text: "If you freaky, then own it" },
      { time: 292, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 295, text: "Don't brag about it, come show me, come on" },
      { time: 298, text: "Dance, jump on it" },
      { time: 301, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 304, text: "If you sexy, then flaunt it" },
      { time: 307, text: "Well, it's Saturday night and we in the spot" },
      { time: 310, text: "Don't believe me, just watch, come on" },

      { time: 313, text: "Doh" },
      { time: 315, text: "Doh-doh-doh, doh-doh-doh, doh-doh (Ya)" },
      { time: 318, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 321, text: "Don't believe me, just watch, uh" },
      { time: 324, text: "Doh-doh-doh, doh-doh-doh, doh-doh (Ya)" },
      { time: 327, text: "(Doh-doh-doh, doh-doh–)" },
      { time: 330, text: "Don't believe me, just watch, uh" },
      { time: 333, text: "Don't believe me, just watch, uh" },
      { time: 336, text: "Don't believe me, just watch" },
      { time: 339, text: "Don't believe me, just watch" },
      { time: 342, text: "Hey, hey, hey, oh" },

      { time: 345, text: "Uptown funk you up (Woo, come on)" },
      { time: 348, text: "(Doh)" },
      { time: 351, text: "Uptown funk you up (Hey, say what?)" },
      { time: 354, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 357, text: "Uptown funk you up (Hey)" },
      { time: 360, text: "(Doh-doh-doh, doh)" },
      { time: 363, text: "Uptown funk you up (Come on)" },
      { time: 366, text: "(Doh)" },
      { time: 369, text: "Uptown funk you up (Woo, come on)" },
      { time: 372, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 375, text: "Uptown funk you up (Hey, say what?)" },
      { time: 378, text: "Uptown funk you up (Hey)" },
      { time: 381, text: "Uptown funk you up (Come on)" },
      { time: 384, text: "(Doh)" },
      { time: 387, text: "Uptown funk you up (Woo, come on)" },
      { time: 390, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 393, text: "Uptown funk you up (Hey, say what?)" },
      { time: 396, text: "Uptown funk you up (Hey)" },
      { time: 399, text: "(Doh-doh-doh, doh)" },
      { time: 402, text: "Uptown funk you up (Come on)" },
      { time: 405, text: "(Doh)" },
      { time: 408, text: "Uptown funk you up (Ah)" },
      { time: 411, text: "(Doh-doh-doh, doh-doh-doh, doh-doh)" },
      { time: 414, text: "Uptown funk you up (Say what?)" },
      { time: 417, text: "Uptown funk you up" },
      { time: 420, text: "Aw, ow" },
    ],
  },
  {
    img: "/../img/james-brown.jpg",
    name: "Papa Got a Brand New Bag",
    artist: "James Brown",
    music: "/../mp3/papa.mp3",
    lyrics: [
      { time: 0, text: "[Intro]" },
      { time: 2, text: "Come here, sister..." },
      { time: 3, text: "Papa's in the swing" },
      { time: 5, text: "He ain't too hip, now" },
      { time: 7, text: "But he's got a brand new bag" },

      { time: 9, text: "He's doing the Jerk" },
      { time: 11, text: "He's doing the Fly" },
      { time: 13, text: "Don't play him cheap" },
      { time: 15, text: "'Cause you know he ain't shy" },

      { time: 18, text: "He's doing the Monkey, the Mashed Potatoes" },
      { time: 22, text: "Jump back, Jack, see you later, alligator" },

      { time: 25, text: "Come here, sister" },
      { time: 27, text: "Papa's in the swing" },
      { time: 29, text: "He ain't too hip now" },
      { time: 31, text: "But he's got a brand new bag" },

      { time: 34, text: "He's doing the twist, just like this" },
      { time: 38, text: "He's doing the Fly every day and every night" },
      { time: 42, text: "The thing—like the Boomerang" },
      { time: 45, text: "Hey, come on" },

      { time: 47, text: "Hey! Hey!" },
      { time: 48.5, text: "Come on!" },
      { time: 50, text: "Hey!" },
      { time: 52, text: "Do the monkey now" },

      { time: 54, text: "Come on!" },
      { time: 56, text: "Hey, hey!" },
      { time: 58, text: "Do the twist!" },
      { time: 60, text: "Papa’s got a brand new bag!" },

      { time: 62, text: "[Instrumental / Break]" },
      { time: 78, text: "It’s the James Brown show!" },

      { time: 83, text: "Come on!" },
      { time: 85, text: "Come on!" },
      { time: 87, text: "Come on!" },
      { time: 89, text: "Hey hey!" },
      { time: 91, text: "Papa’s got a brand new bag!" },
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