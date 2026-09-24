const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");

function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

openMenu.addEventListener("click", openSidebar);

closeMenu.addEventListener("click", closeSidebar);

overlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeSidebar();
    }
});


const paths = document.querySelectorAll(".path");

const presentationTitle =
    document.getElementById("presentationTitle");

const presentationText =
    document.getElementById("presentationText");

const presentationButton =
    document.getElementById("presentationButton");


const pathContent = {

    work: {
        title: "Español para el trabajo",
        text: "Aprende a comunicarte con confianza en reuniones, escribir emails y desenvolverte en situaciones profesionales utilizando español real."
    },

    conversation: {
        title: "Español conversacional",
        text: "Practica conversaciones reales, expresiones naturales y situaciones cotidianas para ganar confianza y hablar con mayor fluidez."
    },

    student: {
        title: "Español para estudiantes",
        text: "Construye una base sólida y aprende de una forma adaptada a tu nivel, tus estudios y los objetivos que quieres alcanzar."
    }

};


paths.forEach(path => {

    path.addEventListener("click", () => {

        paths.forEach(item => {
            item.classList.remove("active");
        });

        path.classList.add("active");

        const type = path.dataset.type;

        presentationTitle.textContent =
            pathContent[type].title;

        presentationText.textContent =
            pathContent[type].text;

    });

});


const sidebarItems =
    document.querySelectorAll(".sidebar-item");

sidebarItems.forEach(item => {

    item.addEventListener("click", () => {

        sidebarItems.forEach(button => {
            button.classList.remove("selected");
        });

        item.classList.add("selected");

    });

});


const reviewTrack =
    document.getElementById("reviewTrack");

const reviews =
    document.querySelectorAll(".review");

const reviewDots =
    document.getElementById("reviewDots");

const nextReview =
    document.getElementById("nextReview");

const prevReview =
    document.getElementById("prevReview");

let reviewPosition = 0;


function getVisibleReviews() {

    if (window.innerWidth <= 650) {
        return 1;
    }

    if (window.innerWidth <= 900) {
        return 2;
    }

    return 3;
}


function getMaximumPosition() {

    return Math.max(
        0,
        reviews.length - getVisibleReviews()
    );

}


function createReviewDots() {

    reviewDots.innerHTML = "";

    const total =
        getMaximumPosition() + 1;

    for (let i = 0; i < total; i++) {

        const dot =
            document.createElement("button");

        dot.type = "button";

        dot.className = "review-dot";

        dot.setAttribute(
            "aria-label",
            `Ir a reseña ${i + 1}`
        );

        dot.addEventListener("click", () => {

            reviewPosition = i;

            updateReviews();

        });

        reviewDots.appendChild(dot);

    }

}


function updateReviews() {

    const visible =
        getVisibleReviews();

    const gap = 14;

    const cardWidth =
        `calc((100% - ${(visible - 1) * gap}px) / ${visible})`;

    reviews.forEach(review => {

        review.style.flexBasis = cardWidth;

    });

    const move =
        reviewPosition *
        (
            100 / visible +
            ((gap / window.innerWidth) * 100)
        );

    reviewTrack.style.transform =
        `translateX(-${move}%)`;


    const dots =
        document.querySelectorAll(".review-dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === reviewPosition
        );

    });

}


nextReview.addEventListener("click", () => {

    reviewPosition++;

    if (
        reviewPosition >
        getMaximumPosition()
    ) {
        reviewPosition = 0;
    }

    updateReviews();

});


prevReview.addEventListener("click", () => {

    reviewPosition--;

    if (reviewPosition < 0) {
        reviewPosition =
            getMaximumPosition();
    }

    updateReviews();

});


const reviewWindow =
    document.getElementById("reviewWindow");

let touchStartX = 0;
let touchEndX = 0;


reviewWindow.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.touches[0].clientX;

    },
    { passive: true }
);


reviewWindow.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].clientX;

        const distance =
            touchEndX - touchStartX;

        if (Math.abs(distance) < 40) {
            return;
        }

        if (distance < 0) {

            reviewPosition++;

            if (
                reviewPosition >
                getMaximumPosition()
            ) {
                reviewPosition = 0;
            }

        } else {

            reviewPosition--;

            if (reviewPosition < 0) {
                reviewPosition =
                    getMaximumPosition();
            }

        }

        updateReviews();

    },
    { passive: true }
);


const videoThumbnails =
    document.querySelectorAll(".video-thumbnail");

videoThumbnails.forEach(video => {

    video.addEventListener("click", () => {

        video.classList.add("clicked");

        setTimeout(() => {
            video.classList.remove("clicked");
        }, 250);

    });

});


const presentationVisual =
    document.querySelector(".presentation-visual");

presentationVisual.addEventListener("click", () => {

    presentationVisual.classList.add("clicked");

    setTimeout(() => {
        presentationVisual.classList.remove("clicked");
    }, 250);

});


const freeTrialButton =
    document.getElementById("freeTrialButton");

freeTrialButton.addEventListener("click", () => {

    document
        .getElementById("freeTrialButton")
        .classList.add("clicked");

    setTimeout(() => {

        freeTrialButton.classList.remove(
            "clicked"
        );

    }, 250);

});


window.addEventListener("resize", () => {

    if (
        reviewPosition >
        getMaximumPosition()
    ) {
        reviewPosition =
            getMaximumPosition();
    }

    createReviewDots();
    updateReviews();

});


createReviewDots();

updateReviews();