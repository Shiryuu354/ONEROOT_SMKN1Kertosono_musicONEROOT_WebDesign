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
    img: "/../img/eminem.jpg",
    name: "Lose Yourself",
    artist: "Eminem",
    music: "/../mp3/lose-yourself.mp3",
    lyrics: [
      { time: 0, text: "[Intro]" },
      { time: 34, text: "Look, if you had one shot or one opportunity" },
      { time: 44, text: "To seize everything you ever wanted in one moment" },
      { time: 49, text: "Would you capture it or just let it slip?" },
      { time: 52, text: "Yo" },

      { time: 54, text: "His palms are sweaty, knees weak, arms are heavy" },
      {
        time: 57,
        text: "There's vomit on his sweater already, mom's spaghetti",
      },
      {
        time: 59,
        text: "He's nervous, but on the surface, he looks calm and ready",
      },
      { time: 62, text: "To drop bombs, but he keeps on forgetting" },
      { time: 65, text: "What he wrote down, the whole crowd goes so loud" },
      { time: 68, text: "He opens his mouth, but the words won't come out" },
      { time: 70, text: "He's chokin', how? Everybody's jokin' now" },
      { time: 73, text: "The clock's run out, time's up, over, blaow" },
      { time: 76, text: "Snap back to reality, ope, there goes gravity" },
      { time: 79, text: "Ope, there goes Rabbit, he choked, he's so mad" },
      {
        time: 81,
        text: "But he won't give up that easy, no, he won't have it",
      },
      {
        time: 85,
        text: "He knows his whole back's to these ropes, it don't matter",
      },
      {
        time: 87,
        text: "He's dope, he knows that, but he's broke, he's so stagnant",
      },
      {
        time: 90,
        text: "He knows when he goes back to this mobile home, that's when it's",
      },
      { time: 93, text: "Back to the lab again, yo, this old rhapsody" },
      {
        time: 96,
        text: "Better go capture this moment and hope it don't pass him",
      },

      { time: 99, text: "You better lose yourself in the music" },
      {
        time: 101,
        text: "The moment, you own it, you better never let it go (Go)",
      },
      {
        time: 104,
        text: "You only get one shot, do not miss your chance to blow",
      },
      { time: 107, text: "This opportunity comes once in a lifetime, yo" },
      { time: 110, text: "You better lose yourself in the music" },
      {
        time: 112,
        text: "The moment, you own it, you better never let it go (Go)",
      },
      {
        time: 115,
        text: "You only get one shot, do not miss your chance to blow",
      },
      { time: 118, text: "This opportunity comes once in a lifetime, yo" },
      { time: 119, text: "You better" },

      {
        time: 121,
        text: "His soul's escaping through this hole that is gaping",
      },
      { time: 124, text: "This world is mine for the taking, make me king" },
      { time: 127, text: "As we move toward a new world order" },
      { time: 129, text: "A normal life is boring, but superstardom's" },
      { time: 132, text: "Close to post-mortem, it only grows harder" },
      { time: 135, text: "Homie grows hotter, he blows, it's all over" },
      { time: 138, text: "These hoes is all on him, coast-to-coast shows" },
      { time: 141, text: "He's known as the Globetrotter, lonely roads" },
      {
        time: 143,
        text: "God only knows he's grown farther from home, he's no father",
      },
      { time: 146, text: "He goes home and barely knows his own daughter" },
      { time: 149, text: "But hold your nose 'cause here goes the cold water" },
      {
        time: 151,
        text: "These hoes don't want him no mo', he's cold product",
      },
      { time: 155, text: "They moved on to the next schmoe who flows" },
      { time: 157, text: "He nose-dove and sold nada, and so the soap opera" },
      { time: 161, text: "Is told, it unfolds, I suppose it's old, partner" },
      {
        time: 163,
        text: "But the beat goes on, da-da-dom, da-dom, dah-dah-dah-dah",
      },

      { time: 165, text: "You better lose yourself in the music" },
      {
        time: 168,
        text: "The moment, you own it, you better never let it go (Go)",
      },
      {
        time: 171,
        text: "You only get one shot, do not miss your chance to blow",
      },
      { time: 174, text: "This opportunity comes once in a lifetime, yo" },
      { time: 177, text: "You better lose yourself in the music" },
      {
        time: 179,
        text: "The moment, you own it, you better never let it go (Go)",
      },
      {
        time: 182,
        text: "You only get one shot, do not miss your chance to blow",
      },
      { time: 185, text: "This opportunity comes once in a lifetime, yo" },
      { time: 188, text: "You better" },

      { time: 189, text: "No more games, I'ma change what you call rage" },
      {
        time: 191,
        text: "Tear this motherfuckin' roof off like two dogs caged",
      },
      {
        time: 194,
        text: "I was playin' in the beginning, the mood all changed",
      },
      {
        time: 196,
        text: "I've been chewed up and spit out and booed off stage",
      },
      {
        time: 199,
        text: "But I kept rhymin' and stepped right in the next cypher",
      },
      { time: 202, text: "Best believe somebody's payin' the Pied Piper" },
      { time: 205, text: "All the pain inside amplified by the" },
      { time: 208, text: "Fact that I can't get by with my nine-to-" },
      {
        time: 211,
        text: "Five and I can't provide the right type of life for my family",
      },
      {
        time: 216,
        text: "'Cause, man, these goddamn food stamps don't buy diapers",
      },
      {
        time: 218,
        text: "And there's no movie, there's no Mekhi Phifer, this is my life",
      },
      {
        time: 222,
        text: "And these times are so hard, and it's gettin' even harder",
      },
      { time: 225, text: "Tryna feed and water my seed, plus teeter-totter" },
      { time: 227, text: "Caught up between bein' a father and a prima donna" },
      {
        time: 230,
        text: "Baby-mama drama, screamin' on her, too much for me to wanna",
      },
      {
        time: 233,
        text: "Stay in one spot, another day of monotony's gotten me",
      },
      { time: 236, text: "To the point I'm like a snail, I've got" },
      { time: 238, text: "To formulate a plot or end up in jail or shot" },
      {
        time: 241,
        text: "Success is my only motherfuckin' option, failure's not",
      },
      { time: 245, text: "Mom, I love you, but this trailer's got" },
      { time: 247, text: "To go, I cannot grow old in Salem's Lot" },
      { time: 249, text: "So here I go, it's my shot, feet, fail me not" },
      { time: 252, text: "This may be the only opportunity that I got" },

      { time: 255, text: "You better lose yourself in the music" },
      {
        time: 257,
        text: "The moment, you own it, you better never let it go (Go)",
      },
      {
        time: 260,
        text: "You only get one shot, do not miss your chance to blow",
      },
      { time: 263, text: "This opportunity comes once in a lifetime, yo" },
      { time: 266, text: "You better lose yourself in the music" },
      {
        time: 268,
        text: "The moment, you own it, you better never let it go (Go)",
      },
      {
        time: 271,
        text: "You only get one shot, do not miss your chance to blow",
      },
      { time: 275, text: "This opportunity comes once in a lifetime, yo" },
      { time: 278, text: "You better" },

      { time: 279, text: "You can do anything you set your mind to, man" },
      { time: 281, text: "[Outro]" },
    ],
  },

  {
    img: "/../img/lagu-hiphop.jpg",
    name: "Cintamu Sepahit Topi Miring",
    artist: "Jogja Hip Hop Foundation",
    music: "/../mp3/cintamustm.mp3",
    lyrics: [
      { time: 0, text: "[Intro]" },
      { time: 9, text: "Sengkuni leda-lede" },
      { time: 12, text: "Mimpin baris ngarep dhewe" },
      { time: 15, text: "Eh barisane menggok" },
      { time: 17, text: "Sengkuni kok malah ndheprok" },
      { time: 20, text: "Nong eh nong ji nong ro" },

      { time: 29, text: "Senja di desa Baron" },
      { time: 31, text: "Matahari tenggelam di dalam kemaron" },
      { time: 33, text: "Lembu betina lari melompat-lompat" },
      { time: 36, text: "Dikejar-kejar anaknya yang kecil meloncat" },

      { time: 39, text: "Senja lucu dengan kasih sayang ibu dan anak" },
      { time: 41, text: "Langit senja mengandung sapi beranak" },
      { time: 43, text: "Terpesona Ranto melihat" },
      { time: 45, text: "Ia tertawa bergelak" },

      { time: 46, text: "Dan berubah jadi Ranto Gudel" },
      { time: 48, text: "Sang pelawak Dadi Marmoyo" },
      { time: 49, text: "Di panggung ketoprak" },
      { time: 51, text: "Ranto Gudel meminum arak" },

      { time: 53, text: "Terendam di dalam ciu" },
      { time: 56, text: "Birahinya berubah jadi biru" },
      { time: 58, text: "Diajaknya Nyai Dasima bercinta" },
      { time: 60, text: "Dengan cinta sepahit topi Miringnya" },

      { time: 63, text: "Layar dibuka turun hujan gembukan" },
      { time: 66, text: "Dewi Mlenuk jembuk datang" },
      { time: 68, text: "Membawa seguling roti cakwe" },
      { time: 71, text: "Marmoyo rebah terguling tidur" },

      { time: 74, text: "Di pangkuan Nyai Dasima" },
      { time: 76, text: "Yang sekeras ciu cangkol buah dadanya" },
      { time: 78, text: "Ke mana Ranto Gudel pergi" },
      { time: 80, text: "Panggung selalu harum dengan arak yang wangi" },

      { time: 83, text: "Di Sriwedari jadi petruk" },
      { time: 86, text: "Garengnya diajak mabuk" },
      { time: 88, text: "Begongnya menggeloyor" },
      { time: 90, text: "Semar jualan ciu cangkol" },

      { time: 93, text: "Dengan terang lampu semprong" },
      { time: 96, text: "Pak Mloyo memukul kenong" },
      { time: 98, text: "Nong ji nong ro nong ji nong" },
      { time: 100, text: "Sengkuni leda-lede" },

      { time: 103, text: "Mimpin baris ngarep dhewe" },
      { time: 104, text: "Eh barisane menggok" },
      { time: 107, text: "Sengkuni kok malah ndheprok" },
      { time: 109, text: "Nong eh nong ji nong ro" },

      { time: 119, text: "Giginya ompong menggerong" },
      { time: 120, text: "Ranto Gudel Mendehem nyungsep" },
      { time: 122, text: "Thuyul gundhul ke sana sini mengempit gendul" },
      { time: 124, text: "Gendruwo thela-thelo tampak loyo" },

      { time: 127, text: "Jlangkong jalannya miring-miring eh dhoyong" },
      { time: 129, text: "Belum selesai menabuh" },
      { time: 130, text: "Nong ji nong ro" },
      { time: 131, text: "Pak Mloyo terguling ke Bengawan Solo" },

      { time: 134, text: "Dengan irama alunan nong ji nong ro" },
      { time: 136, text: "Pak Mloyo pulang jalannya geloyoran" },
      { time: 138, text: "Sengkuni leda-lede" },
      { time: 140, text: "Mimpin baris ngarep dhewe" },

      { time: 143, text: "Eh barisane menggok" },
      { time: 146, text: "Sengkuni kok malah ndheprok" },
      { time: 149, text: "Ranto Gudel meminum arak bekonang" },
      { time: 151, text: "Mengantar gadis pulang berdandan bidan" },

      { time: 153, text: "Roknya putih bajunya putih" },
      { time: 156, text: "Serba putih lebih daripada peri" },
      { time: 159, text: "Tiba di pinggir kali" },
      { time: 160, text: "Ranto Gudel diajak belok ke kiri" },

      { time: 162, text: "Dhemit elek a’u tenan" },
      { time: 165, text: "Ngumpat Ranto Gudel geram" },
      { time: 167, text: "Ia marah terendam arak bekonang" },
      { time: 169, text: "Hampir saja aku bercinta dengan setan" },

      { time: 172, text: "Cinta manusia seperti Umbul Beking" },
      { time: 174, text: "Dulu bening sekarang keruh" },
      { time: 176, text: "Ranto Gudel dengan empat istrinya" },
      { time: 178, text: "Tak pernah abadi cintanya" },

      { time: 179, text: "Sengkuni leda-lede" },
      { time: 181, text: "Mimpin baris ngarep dhewe" },
      { time: 183, text: "Eh barisane menggok" },
      { time: 186, text: "Sengkuni kok malah ndheprok" },

      { time: 189, text: "Nong eh nong ji nong ro" },
      { time: 198, text: "Memang enak jadi wedhus daripada manusia" },
      { time: 200, text: "Bila mati dikubur di gundukan tanah" },
      { time: 203, text: "Kepalanya dikencingi wedhus yang merumput" },

      { time: 205, text: "Nasib manusia hanya sengsara" },
      { time: 208, text: "Oh mengapa kita mesti bersusah" },
      { time: 210, text: "Coba hiduplah seperti Ki Joko Lelur" },
      { time: 213, text: "Siangnya melamun me-minum limun" },

      { time: 215, text: "Malam beranjak bangun minum berminum" },
      { time: 218, text: "Lapen ciu cangkol arak bekonang dituang" },
      { time: 220, text: "Botol cangkol dipasangnya setiap sudut rumah" },
      { time: 223, text: "Apa guna tuk takut tikus-tikus rupanya" },

      { time: 225, text: "Oh mengenang bayangan di masa tuanya" },
      { time: 227, text: "Ciu cangkol hanyalah spiritus tuk usir tikus" },
      { time: 230, text: "Padahal dulu ku meminumnya sampai mampus" },
      { time: 232, text: "Sengkuni leda-lede" },

      { time: 235, text: "Mimpin baris ngarep dhewe" },
      { time: 238, text: "Eh barisane menggok" },
      { time: 240, text: "Sengkuni kok malah ndheprok" },
      { time: 243, text: "Nong eh nong ji nong ro" },

      { time: 252, text: "Sengkuni leda-lede" },
      { time: 254, text: "Mimpin baris ngarep dhewe" },
      { time: 258, text: "Eh barisane menggok" },
      { time: 260, text: "Sengkuni kok malah ndheprok" },
      { time: 263, text: "Nong eh nong ji nong ro" },
      { time: 273, text: "[Outro]" },
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