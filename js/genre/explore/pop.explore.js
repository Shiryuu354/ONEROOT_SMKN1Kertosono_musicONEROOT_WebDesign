document.addEventListener('DOMContentLoaded', () => {
  let currentAudio = null;
  let currentButton = null;

  const playButtons = document.querySelectorAll('.play-btn');

  playButtons.forEach(button => {
    button.addEventListener('click', () => {
      const audioSrc = button.getAttribute('data-audio');

      // Jika tombol yang sama diklik lagi
      if (currentButton === button) {
        if (currentAudio.paused) {
          currentAudio.play();
          button.textContent = '⏸ Pause';
        } else {
          currentAudio.pause();
          button.textContent = '▶ Play';
        }
        return;
      }

      // Pause audio sebelumnya
      if (currentAudio) {
        currentAudio.pause();
        currentButton.textContent = '▶ Play';
      }

      // Mainkan audio baru
      currentAudio = new Audio(audioSrc);
      currentAudio.play();
      button.textContent = '⏸ Pause';
      currentButton = button;

      currentAudio.addEventListener('ended', () => {
        button.textContent = '▶ Play';
        currentAudio = null;
        currentButton = null;
      });
    });
  });
});
