// ===== ELEMENTS =====
const showCountdownBtn = document.getElementById("showCountdownBtn");
const countdownSection = document.querySelector(".countdown-section-hidden");
const countdown = document.getElementById("countdown");

const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");

// ===== DATA OBJECTIU (29 DE MAIG) =====
const targetDate = new Date(Date.UTC(2026, 4, 29, 13, 15, 0));

// ===== MOSTRAR COUNTDOWN =====
const introText = document.getElementById("introText");

showCountdownBtn.addEventListener("click", () => {
    // Amaga el text
    introText.classList.add("hidden-text");

    // Mostra el countdown
    countdownSection.style.display = "block";
    countdown.classList.remove("hidden");
    showCountdownBtn.style.display = "none";

    updateCountdown();
    setInterval(updateCountdown, 1000);
});


// ===== FUNCIÓ COUNTDOWN =====
function updateCountdown() {
    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) {
        monthsEl.textContent = "00";
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
    }

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    // Mesos aproximats (no exactes però visuals)
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;

    monthsEl.textContent = format(months);
    daysEl.textContent = format(remainingDays);
    hoursEl.textContent = format(remainingHours);
    minutesEl.textContent = format(remainingMinutes);
    secondsEl.textContent = format(remainingSeconds);
}

function format(value) {
    return value < 10 ? "0" + value : value;
}

// ===== SOBRE → CARTA =====
let opened = false;

const jokeHidden = document.getElementById("jokeHidden");
const pressEnvelopeText = document.getElementById("pressEnvelopeText");

envelope.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    // MOSTRAR "Gracias por regalarme todas tus risas"
    jokeHidden.classList.remove("hidden");

    // AMAGAR "Pulsa el sobre"
    pressEnvelopeText.classList.add("hidden-text");

    envelope.style.transform = "scale(1.2) rotate(-5deg)";
    envelope.style.opacity = "0";

    startHearts();

    setTimeout(() => {
        envelope.style.display = "none";
        letter.classList.remove("hidden");
    }, 600);
});


// ===== HEARTS EFFECT =====
const heartsContainer = document.getElementById("hearts-container");
let heartsInterval;

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    // posició random
    heart.style.left = Math.random() * 100 + "vw";

    // mida random
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + "px";

    // duració random (velocitat)
    const duration = Math.random() * 3 + 4;
    heart.style.animationDuration = duration + "s";

    // rotació random
    heart.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;

    heartsContainer.appendChild(heart);

    // eliminar quan desapareix
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

function startHearts() {
    if (heartsInterval) return; // evita duplicats
    heartsInterval = setInterval(createHeart, 250);
}
