// Countdown Timer
let timeLeft = 120;
const timerText = document.getElementById("timerText");
const resendSection = document.getElementById("resendSection");
const expiredMsg = document.getElementById("expiredMsg");

const timerInterval = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const s = String(timeLeft % 60).padStart(2, "0");
    timerText.textContent = `${m}:${s}`;
  } else {
    clearInterval(timerInterval);
    expiredMsg.style.display = "none";
    resendSection.style.display = "block";
  }
}, 1000);

function resendOTP() {
  alert("OTP telah dikirim ulang!");
  location.reload(); // bisa diganti dengan AJAX ke PHP
}

// Auto focus OTP input
const inputs = document.querySelectorAll(".otp-box input");

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });
});
