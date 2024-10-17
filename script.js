const parllaxDiv = document.querySelector('.parallaxDiv');
const images = parllaxDiv.querySelectorAll('img');

const hoverELements = document.querySelectorAll('.hoverElements');

hoverELements.forEach((elem)=>{
    elem.addEventListener('mouseover',()=>{
        cursor.classList.add('active');
    })
    elem.addEventListener('mouseleave',()=>{
        cursor.classList.remove('active')
    })
})



//For Reveal 
const revealElements = document.querySelectorAll('.revealElements');

const revealOnScroll = ()=>{
    const windowHeight = window.innerHeight;

    revealElements.forEach((elem)=>{
        const elementTop = elem.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            elem.classList.add('active');
        }else{
            elem.classList.remove('active');
        }
    })
}


revealOnScroll()

const isTouchDevice = ()=>{
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

//Cursor
const cursor = document.querySelector('.cursor');

function updateCursorPositions(e) {
     cursor.style.left = `${e.clientX - 4}px`    
     cursor.style.top = `${e.clientY - 4}px`    
}


const handleMouseEvents = (e)=>{
    let speed;

    if (isTouchDevice()) {
        speed = 0.2;
    }else{
        speed = 1.4
    }

    images.forEach((image,index)=>{
        const x = (window.innerWidth - e.pageX * speed * (index % 2 === 0? -1: 1)) / 100;
        const y = (window.innerHeight - e.pageY * speed * (index % 2 === 0? -1: 1)) / 100;

        image.style.transform = `translate(${x}px,${y}px)`;
    })

    updateCursorPositions(e)
}


document.addEventListener('mousedown',()=>{
    cursor.classList.add('active');
})

document.addEventListener('mouseup',()=>{
    cursor.classList.remove('active');
})



//For Parallax Effect
document.addEventListener('mousemove',handleMouseEvents);



const navbar = document.getElementById('navbar');
const nextHero = document.getElementById('nextHero');
const about_p = this.document.getElementById('about_p');
const animatedGraph = this.document.getElementById('animatedGraph');
let typed = false;


const textTypingEffect = (element, text, i =0)=>{
    if (!typed) {
        return
    }

    element.textContent += text[i];

    if (i === text.length -1) {
        return;
    }

    setTimeout(()=> textTypingEffect(element,text,i+1),20)
}

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;

    nextHero.style.transform = `translateX(${-(scrollY / 4)}px)`;
    
    if (scrollY > 100) {
        navbar.classList.add('active')
    }else{
       navbar.classList.remove('active')
    }

    let windowHeight = window.innerHeight;
    let aboutParaReveal = about_p.getBoundingClientRect().top;
    let aboutParaRevealPoint = 140;

    if (aboutParaReveal < windowHeight - aboutParaRevealPoint) {
        if (!typed) {
            typed = true;
            textTypingEffect(about_p,"Implementing and supporting technologies that enable organizations to deliver on their mandate is how we enable them to evolve.")
        }
    }else{
        typed = false;
        about_p.textContent = '';
    }


    let animatedGraphReveal = animatedGraph.getBoundingClientRect().top;
    let animatedGraphRevealPoint = 100;

    if (animatedGraphReveal < windowHeight - animatedGraphRevealPoint) {
        if (!animatedGraph.classList.contains('active')) {
            animatedGraph.classList.add('active');
            animatedGraph.setAttribute('data','./assets/Graph-Anim.svg');
        }
    }else{
        animatedGraph.classList.remove('active');
        animatedGraph.setAttribute('data','');
    }

    revealOnScroll()
})



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


//For Contact Us 


//Alert
const throwAlert = (message)=>{
    const alertBox = document.getElementById('alertBox');
    document.getElementById('alertMessage').innerText = message;
    if (alertBox.classList.contains('animAlert')) {
        return
    }
    alertBox.classList.add('animAlert');
    setTimeout(()=>{
        alertBox.classList.remove('animAlert')
    },3000)
}

const contactForm = document.getElementById('contactForm');


const sendEmail = (e)=>{
    e.preventDefault();

    emailjs.sendForm('service_q4xubng','template_wiveeyh','#contactForm')
    .then(()=>{
        throwAlert('Message Sent Successfully ✅')
        contactForm.reset();
    },()=>{
        throwAlert('Message Not Sent (Server Error) ❌')
    })
}

contactForm.addEventListener('submit',sendEmail);


// For Navbar 

const navul = document.getElementById('navul');
const closeMenu = document.getElementById('closeMenu');
const humburger = document.getElementById('humburger');

humburger.addEventListener('click',()=>{
    navul.classList.add('activated');
})

closeMenu.addEventListener('click',()=>{
    navul.classList.remove('activated');
})

const handleNavul = ()=>{
    closeMenu.click();
}

document.addEventListener('DOMContentLoaded', function() {
    const purposeContainer = document.getElementById('purpose-container');
    const missionContainer = document.getElementById('mission-container');
    let isPurposeVisible = true;

    setInterval(() => {
        if (isPurposeVisible) {
            purposeContainer.classList.remove('fade-in');
            purposeContainer.classList.add('fade-out');
            missionContainer.classList.remove('fade-out');
            missionContainer.classList.add('fade-in');
            setTimeout(() => {
                purposeContainer.style.display = 'none';
                missionContainer.style.display = 'block';
            }, 1000); // Match the duration of the fade-out animation
        } else {
            missionContainer.classList.remove('fade-in');
            missionContainer.classList.add('fade-out');
            purposeContainer.classList.remove('fade-out');
            purposeContainer.classList.add('fade-in');
            setTimeout(() => {
                missionContainer.style.display = 'none';
                purposeContainer.style.display = 'block';
            }, 1000); // Match the duration of the fade-out animation
        }
        isPurposeVisible = !isPurposeVisible;
    }, 5000); // Change every 3 seconds
});

// document.addEventListener('DOMContentLoaded', function () {
//     const texts = document.querySelectorAll('.text-change');
//     const playButton = document.querySelector('.playButton');
//     const textStay = document.querySelector('.text-stay');
//     let currentIndex = 0;

//     // Add transition for smooth resizing
//     playButton.style.transition = 'width 0.5s, height 0.5s';

//     function adjustPlayButtonSize() {
//         const currentText = texts[currentIndex];
//         const combinedWidth = textStay.scrollWidth + currentText.scrollWidth;
//         playButton.style.width = `${combinedWidth}px`;
//     }

//     setInterval(() => {
//         const currentText = texts[currentIndex];
//         const nextIndex = (currentIndex + 1) % texts.length;
//         const nextText = texts[nextIndex];

//         currentText.classList.remove('fade-in');
//         currentText.classList.add('fade-out');
//         nextText.classList.remove('fade-out');
//         nextText.classList.add('fade-in');

//         setTimeout(() => {
//             currentText.style.display = 'none';
//             nextText.style.display = 'inline-block';
//             currentIndex = nextIndex;
//             adjustPlayButtonSize(); // Adjust the size after the text change
//         }, 1000); // Match the duration of the fade-out animation
//     }, 2000); // Change every 2 seconds

//     // Initial size adjustment
//     adjustPlayButtonSize();

//     // Adjust size on window resize
//     window.addEventListener('resize', adjustPlayButtonSize);
// });