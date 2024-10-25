const parllaxDiv = document.querySelector('.parallaxDiv');
const images = parllaxDiv ? parllaxDiv.querySelectorAll('img') : [];

const hoverELements = document.querySelectorAll('.hoverElements');

hoverELements.forEach((elem) => {
    elem.addEventListener('mouseover', () => {
        if (cursor) cursor.classList.add('active');
    });
    elem.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('active');
    });
});

// For Reveal 
const revealElements = document.querySelectorAll('.revealElements');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach((elem) => {
        const elementTop = elem.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            elem.classList.add('active');
        } else {
            elem.classList.remove('active');
        }
    });
}

revealOnScroll();

// Call revealOnScroll on page load
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Call revealOnScroll on scroll
window.addEventListener('scroll', revealOnScroll);

const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Cursor
const cursor = document.querySelector('.cursor');

function updateCursorPositions(e) {
    if (cursor) {
        cursor.style.left = `${e.clientX - 4}px`;
        cursor.style.top = `${e.clientY - 4}px`;
    }
}

const handleMouseEvents = (e) => {
    let speed;

    if (isTouchDevice()) {
        speed = 0.2;
    } else {
        speed = 1.4;
    }

    images.forEach((image, index) => {
        const x = (window.innerWidth - e.pageX * speed * (index % 2 === 0 ? -1 : 1)) / 100;
        const y = (window.innerHeight - e.pageY * speed * (index % 2 === 0 ? -1 : 1)) / 100;

        image.style.transform = `translate(${x}px,${y}px)`;
    });

    updateCursorPositions(e);
}

document.addEventListener('mousedown', () => {
    if (cursor) cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    if (cursor) cursor.classList.remove('active');
});

// For Parallax Effect
document.addEventListener('mousemove', handleMouseEvents);

const navbar = document.getElementById('navbar');
const nextHero = document.getElementById('nextHero');
const about_p = document.getElementById('about_p');
const animatedGraph = document.getElementById('animatedGraph');
let typed = false;

const textTypingEffect = (element, text, i = 0) => {
    if (!typed) {
        return;
    }

    element.textContent += text[i];

    if (i === text.length - 1) {
        return;
    }

    setTimeout(() => textTypingEffect(element, text, i + 1), 20);
}

window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;

    if (nextHero) {
        nextHero.style.transform = `translateX(${-(scrollY / 4)}px)`;
    }

    if (scrollY > 100) {
        if (navbar) navbar.classList.add('active');
    } else {
        if (navbar) navbar.classList.remove('active');
    }

    if (animatedGraph) {
        let animatedGraphReveal = animatedGraph.getBoundingClientRect().top;
        let animatedGraphRevealPoint = 100;

        if (animatedGraphReveal < windowHeight - animatedGraphRevealPoint) {
            if (!animatedGraph.classList.contains('active')) {
                animatedGraph.classList.add('active');
                animatedGraph.setAttribute('data', './assets/Graph-Anim.svg');
            }
        } else {
            animatedGraph.classList.remove('active');
            animatedGraph.setAttribute('data', '');
        }
    }

    revealOnScroll();
});

// For Data
function countup(element, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

const counter = document.getElementById('counter');

if (counter) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counter.classList.add('visible');
                countup(counter, 0, 4345256, 2000);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(counter);
}

// For Swiper
var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 2000, // 2 seconds
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});

// For Contact Us
// Alert
const throwAlert = (message) => {
    const alertBox = document.getElementById('alertBox');
    document.getElementById('alertMessage').innerText = message;
    if (alertBox.classList.contains('animAlert')) {
        return
    }
    alertBox.classList.add('animAlert');
    setTimeout(() => {
        alertBox.classList.remove('animAlert')
    }, 3000)
}

const contactForm = document.getElementById('contactForm');


const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_q4xubng', 'template_wiveeyh', '#contactForm')
        .then(() => {
            throwAlert('Message Sent Successfully ✅')
            contactForm.reset();
        }, () => {
            throwAlert('Message Not Sent (Server Error) ❌')
        })
}

contactForm.addEventListener('submit', sendEmail);

// For Navbar
const navul = document.getElementById('navul');
const closeMenu = document.getElementById('closeMenu');
const humburger = document.getElementById('humburger');

if (humburger) {
    humburger.addEventListener('click', () => {
        if (navul) navul.classList.add('activated');
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        if (navul) navul.classList.remove('activated');
    });
}

const handleNavul = () => {
    if (closeMenu) {
        closeMenu.click();
    }
}

// For Lightbox
function openLightbox(id) {
    const lightbox = document.getElementById(id);
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10); // Slight delay to trigger the transition
}

function closeLightbox(id) {
    const lightbox = document.getElementById(id);
    lightbox.classList.remove('show');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 500); // Match the duration of the fade-out transition
}

// Ensure all lightboxes are hidden when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const lightboxes = document.querySelectorAll('.lightbox');
    lightboxes.forEach(lightbox => {
        lightbox.style.display = 'none';
    });
});

// Close lightbox when clicking outside of the lightbox content
document.addEventListener('DOMContentLoaded', function () {
    const lightboxes = document.querySelectorAll('.lightbox');
    lightboxes.forEach(lightbox => {
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) {
                closeLightbox(lightbox.id);
            }
        });
    });
});