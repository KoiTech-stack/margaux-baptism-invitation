// =====================================
// OPEN INVITATION
// =====================================

const openButton = document.getElementById("openInvitation");
const cover = document.getElementById("cover");

if (openButton && cover) {
    openButton.addEventListener("click", () => {
        cover.classList.add("hide");
        setTimeout(() => {
            cover.style.display = "none";
        }, 1200);
    });
}

// =====================================
// COUNTDOWN TIMER
// =====================================

const eventDate = new Date(
    "August 9, 2026 10:30:00"
).getTime();

const countdown = document.querySelector(".countdown");
function updateCountdown(){
    if(!countdown) return;

    const now = Date.now();

    const distance = eventDate - now;

    if(distance <= 0){
        countdown.innerHTML = `
            <div class="celebration-message">
                <h2>
                    🎉 Today is Margaux's Holy Baptism!
                </h2>
                <p>
                    Thank you for celebrating this wonderful day with us.
                </p>
            </div>
        `;
        clearInterval(countdownTimer);
        return;
    }

    const days = Math.floor(
        distance / 86400000
    );

    const hours = Math.floor(
        (distance % 86400000) / 3600000
    );

    const minutes = Math.floor(
        (distance % 3600000) / 60000
    );

    const seconds = Math.floor(
        (distance % 60000) / 1000
    );

    const elements = {
        days,
        hours,
        minutes,
        seconds
    };

    Object.entries(elements).forEach(([id,value])=>{
        const element = document.getElementById(id);
        if(element){
            element.textContent = value;
        }
    });
}

updateCountdown();
const countdownTimer = setInterval(
    updateCountdown,
    1000
);

// =====================================
// SCROLL FADE ANIMATION
// =====================================

const animatedItems = document.querySelectorAll(
    ".info-card, .photo-section, .closing, .gift-card"
);
const observer = new IntersectionObserver(
(entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
            entry.target.style.opacity = "1";
            entry.target.style.transform =
                "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
},
{
    threshold:0.15
});
animatedItems.forEach(item=>{
    item.style.opacity = "0";
    item.style.transform =
        "translateY(40px)";
    item.style.transition =
        "1s ease";
    observer.observe(item);
});

// =====================================
// BABY PHOTO SLIDESHOW
// =====================================

const babySlides =
    document.querySelectorAll(".baby-slide");

const babyDots =
    document.querySelectorAll(".dot");

let currentBaby = 0;
function showBabyPhoto(index){
    if(!babySlides.length) return;
    babySlides.forEach(slide=>{
        slide.classList.remove("active");
    });
    babyDots.forEach(dot=>{
        dot.classList.remove("active");
    });
    babySlides[index].classList.add("active");
    if(babyDots[index]){
        babyDots[index].classList.add("active");
    }
}

if(babySlides.length){
    showBabyPhoto(0);
    setInterval(()=>{
        currentBaby++;
        if(currentBaby >= babySlides.length){
            currentBaby = 0;
        }
        showBabyPhoto(currentBaby);
    },4000);
}

// =====================================
// MOBILE SWIPE GALLERY
// =====================================

const babyGallery =
    document.querySelector(".baby-gallery");
let touchStartX = 0;
let touchEndX = 0;

if(babyGallery && babySlides.length){
    babyGallery.addEventListener(
        "touchstart",
        event=>{
            touchStartX =
                event.changedTouches[0].screenX;
        },
        {passive:true}
    );

    babyGallery.addEventListener(
        "touchend",
        event=>{
            touchEndX =
                event.changedTouches[0].screenX;
            handleSwipe();
        },
        {passive:true}
    );
}

function handleSwipe(){
    const distance =
        touchEndX - touchStartX;
    if(distance < -50){
        currentBaby++;
        if(currentBaby >= babySlides.length){
            currentBaby = 0;
        }
        showBabyPhoto(currentBaby);
    }
    if(distance > 50){
        currentBaby--;
        if(currentBaby < 0){
            currentBaby =
                babySlides.length - 1;
        }
        showBabyPhoto(currentBaby);
    }
}