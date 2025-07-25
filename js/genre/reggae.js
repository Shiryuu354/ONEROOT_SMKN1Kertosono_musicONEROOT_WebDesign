document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".glass-card");

  // Fade in animation
  cards.forEach((card) => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition = "all 0.7s ease";
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));

  // Audio control logic
  const playButtons = document.querySelectorAll(".play-btn");
  let currentAudio = null;
  let currentButton = null;

  playButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".glass-card");
      const audio = card.querySelector("audio");

      if (!audio) {
        console.warn("Audio element not found!");
        return;
      }

      // Debug: check if audio loaded
      console.log("Attempting to play:", audio.src);
      console.log("Audio duration:", audio.duration);

      if (audio === currentAudio && !audio.paused) {
        audio.pause();
        btn.textContent = "▶ Play";
      } else {
        if (currentAudio && !currentAudio.paused) {
          currentAudio.pause();
          if (currentButton) currentButton.textContent = "▶ Play";
        }

        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              btn.textContent = "⏸ Pause";
              currentAudio = audio;
              currentButton = btn;
            })
            .catch((error) => {
              console.error("Playback error:", error);
              alert("Tidak bisa memutar audio. Cek console.");
            });
        }

        audio.onended = () => {
          btn.textContent = "▶ Play";
          currentAudio = null;
          currentButton = null;
        };
      }
    });
  });

  // Emoji buttons
  const likeButtons = document.querySelectorAll(
    ".emoji-buttons button:first-child"
  );
  const addButtons = document.querySelectorAll(
    ".emoji-buttons button:last-child"
  );

  likeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.textContent =
        btn.textContent === "❤️" || btn.textContent === "💖" ? "💘" : "❤️";
    });
  });

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.textContent = "✅";
      setTimeout(() => (btn.textContent = "➕"), 1500);
    });
  });
});
