// Get the video element and all required UI elements
const video = document.querySelector('.player__video');
const playButton = document.querySelector('.toggle');
const volumeSlider = document.querySelector('[name="volume"]');
const playbackSpeed = document.querySelector('[name="playbackRate"]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');

// Function to toggle play/pause when play button is clicked
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Function to update the play button icon based on video state
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  playButton.textContent = icon;
}

// Function to handle skipping forward/backward
function skip() {
  const skipAmount = parseFloat(this.dataset.skip);
  video.currentTime += skipAmount;
}

// Function to handle volume change
function handleVolumeChange() {
  video.volume = this.value;
}

// Function to handle playback speed change
function handlePlaybackRateChange() {
  video.playbackRate = this.value;
}

// Function to update progress bar based on video progress
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Function to scrub the video when progress bar is clicked/dragged
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeed.addEventListener('input', handlePlaybackRateChange);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
