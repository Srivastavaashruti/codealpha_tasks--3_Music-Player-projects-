// Songs list
const songs = [
  { title: "Song 1", artist: "Artist 1", file: "music/song1.mp3" },
  { title: "Song 2", artist: "Artist 2", file: "music/song2.mp3" },
  { title: "Song 3", artist: "Artist 3", file: "music/song3.mp3" }
];

// Elements
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeControl = document.getElementById("volume-control");

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
}
loadSong(songs[songIndex]);

// Play / Pause
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next / Previous
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Progress bar update
audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Time display
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`;
  }
}

// Seek functionality
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Volume control
volumeControl.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

// Auto play next song when one ends
audio.addEventListener("ended", nextSong);
