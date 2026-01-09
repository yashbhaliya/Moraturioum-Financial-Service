// SERVICES DROPDOWN
const servicesItem = document.querySelector(".services > a");
const servicesDropdown = document.querySelector(".services-dropdown");
const servicesArrow = servicesItem.querySelector("i");

// CALCULATORS DROPDOWN
const calculatorsItem = document.querySelector(".calculators > a");
const calculatorsDropdown = document.querySelector(".calculators-dropdown");
const calculatorsArrow = calculatorsItem.querySelector("i");

// Toggle Services
servicesItem.addEventListener("click", function (e) {
    e.preventDefault();

    servicesDropdown.classList.toggle("show");
    servicesArrow.classList.toggle("rotate");

    // Close calculators if open
    calculatorsDropdown.classList.remove("show");
    calculatorsArrow.classList.remove("rotate");
});

// Toggle Calculators
calculatorsItem.addEventListener("click", function (e) {
    e.preventDefault();

    calculatorsDropdown.classList.toggle("show");
    calculatorsArrow.classList.toggle("rotate");

    // Close services if open
    servicesDropdown.classList.remove("show");
    servicesArrow.classList.remove("rotate");
});

// Close dropdowns when clicking outside
document.addEventListener("click", function (e) {
    if (!e.target.closest(".services") && !e.target.closest(".calculators")) {
        servicesDropdown.classList.remove("show");
        calculatorsDropdown.classList.remove("show");
        servicesArrow.classList.remove("rotate");
        calculatorsArrow.classList.remove("rotate");
    }
});

// MOBILE MENU TOGGLE
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-container ul');

toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// CLOSE MOBILE MENU
const menuToggle = document.querySelector('.menu-toggle');
const closeBtn = document.querySelector('.close-menu');
const navList = document.querySelector('.nav-container ul');

// Open Sidebar
menuToggle.addEventListener('click', () => {
    navList.classList.add('active');
});

// Close Sidebar
closeBtn.addEventListener('click', () => {
    navList.classList.remove('active');
});

// Close Sidebar if clicking outside the menu
document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
        navList.classList.remove('active');
    }
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

// Auto-slide every 7 seconds
setInterval(() => {
    plusSlides(1);
}, 7000);

const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let index = 0;

    function showSlide(i) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[i].classList.add("active");
        dots[i].classList.add("active");
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            showSlide(index);
        });
    });

    setInterval(nextSlide, 4000);   

    const counters = document.querySelectorAll(".stat-card h3");

    const speed = 250; // smaller = faster

    const startCounter = (counter) => {
        const target = parseFloat(counter.getAttribute("data-target"));
        let count = 0;

        const increment = target / speed;

        const updateCount = () => {
            count += increment;

            if (count < target) {
                counter.innerText =
                    Number.isInteger(target)
                        ? Math.floor(count) + "+"
                        : count.toFixed(1) + "+";
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + "+";
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
