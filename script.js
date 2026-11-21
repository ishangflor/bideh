
// =========================================
// CHANGE BETWEEN SCRAPBOOK SPREADS
// =========================================

function goTo(pageId) {
    const currentPage = document.querySelector(".screen.active");
    const nextPage = document.getElementById(pageId);

    if (!nextPage) {
        console.error("Page not found:", pageId);
        return;
    }

    if (currentPage) {
        currentPage.classList.remove("active");
    }

    nextPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================================
// BACKGROUND MUSIC PLAYER
// =========================================

async function toggleMusic() {
    const music = document.getElementById("backgroundMusic");
    const player = document.querySelector(".music-player");
    const button = document.getElementById("musicToggle");

    if (!music || !player || !button) return;

    music.src = "https://ishangflor.github.io/bodeh/music/Can't%20Help%20Falling%20in%20Love.mp3";
music.load();

    const icon = document.getElementById("musicIcon");
    const buttonText = document.getElementById("musicButtonText");
    const status = document.getElementById("musicStatus");

    if (music.paused) {
        try {
            await music.play();

            player.classList.add("is-playing", "playing");
            icon.textContent = "Ⅱ";
            buttonText.textContent = "Pause";
            button.setAttribute("aria-label", "Pause music");
            button.setAttribute("aria-pressed", "true");

            if (status) {
                status.textContent = "playing just for you ♡";
            }

        } catch (error) {
            console.error("Music could not play:", error);

            if (status) {
                status.textContent = "check your music file ♡";
            }
        }

    } else {
        music.pause();

        player.classList.remove("is-playing", "playing");
        icon.textContent = "▶";
        buttonText.textContent = "Play";
        button.setAttribute("aria-label", "Play music");
        button.setAttribute("aria-pressed", "false");

        if (status) {
            status.textContent = "paused for now...";
        }
    }
}


// =========================================
// MUSIC PLAYER EVENT LISTENERS
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("backgroundMusic");

    if (music) {
        music.addEventListener("error", () => {
            const status = document.getElementById("musicStatus");

            if (status) {
                status.textContent = "audio file not found ♡";
            }
        });

        music.addEventListener("ended", () => {
            const player = document.querySelector(".music-player");
            const icon = document.getElementById("musicIcon");
            const text = document.getElementById("musicButtonText");
            const button = document.getElementById("musicToggle");

            if (player) {
                player.classList.remove("is-playing", "playing");
            }

            if (icon) icon.textContent = "▶";
            if (text) text.textContent = "Play";

            if (button) {
                button.setAttribute("aria-label", "Play music");
                button.setAttribute("aria-pressed", "false");
            }
        });
    }

    startBotanicalPetals();
});


// =========================================
// OPEN THE BIRTHDAY ENVELOPE
// =========================================

function openLetter() {
    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("birthdayLetter");
    const button = document.getElementById("openLetterButton");

    if (!envelope || !letter || !button) return;

    envelope.classList.add("open");
    button.textContent = "Your letter is opening ♡";
    button.disabled = true;

    setTimeout(() => {
        letter.classList.add("show");

        letter.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 900);
}


// =========================================
// RETURN TO THE FIRST PAGE
// =========================================

function restartJournal() {
    document.querySelectorAll(".screen").forEach(page => {
        page.classList.remove("active");
    });

    const cover = document.getElementById("cover");

    if (cover) {
        cover.classList.add("active");
    }

    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("birthdayLetter");
    const button = document.getElementById("openLetterButton");

    if (envelope) envelope.classList.remove("open");
    if (letter) letter.classList.remove("show");

    if (button) {
        button.textContent = "Open your letter ♡";
        button.disabled = false;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================================
// PHOTO FALLBACKS
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".photo-slot img, .photo-frame img").forEach(photo => {
        const fallback = photo.parentElement.querySelector(".photo-fallback");

        const showFallback = () => {
            photo.style.display = "none";

            if (fallback) {
                fallback.style.display = "grid";
            }
        };

        const showPhoto = () => {
            photo.style.display = "block";

            if (fallback) {
                fallback.style.display = "none";
            }
        };

        photo.addEventListener("error", showFallback);
        photo.addEventListener("load", showPhoto);

        if (photo.complete) {
            photo.naturalWidth > 0 ? showPhoto() : showFallback();
        }
    });
});


// =========================================
// VINTAGE FALLING PETALS & LEAVES
// =========================================

function startBotanicalPetals() {
    const container = document.querySelector(".botanical-effects") || (() => {
        const layer = document.createElement("div");

        layer.className = "botanical-effects";
        layer.setAttribute("aria-hidden", "true");

        document.body.appendChild(layer);

        return layer;
    })();

    if (container.dataset.started === "true") return;

    container.dataset.started = "true";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    function createFallingPiece() {
        const piece = document.createElement("span");
        const isLeaf = Math.random() < 0.28;

        piece.className = isLeaf
            ? "botanical-piece leaf"
            : "botanical-piece";

        piece.style.left = `${Math.random() * 100}vw`;

        piece.style.setProperty(
            "--petal-width",
            `${7 + Math.random() * 8}px`
        );

        piece.style.setProperty(
            "--petal-height",
            `${11 + Math.random() * 11}px`
        );

        piece.style.setProperty(
            "--fall-duration",
            `${14 + Math.random() * 12}s`
        );

        piece.style.setProperty(
            "--sway",
            `${25 + Math.random() * 75}px`
        );

        piece.style.animationDelay = `${Math.random() * 1.5}s`;

        container.appendChild(piece);

        window.setTimeout(() => {
            piece.remove();
        }, 29000);
    }

    // Start with only a few pieces.
    for (let i = 0; i < 5; i++) {
        window.setTimeout(createFallingPiece, i * 850);
    }

    window.setInterval(createFallingPiece, 1900);
}
