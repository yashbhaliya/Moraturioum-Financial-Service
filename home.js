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
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
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

const form = document.getElementById("contactForm");
const inputs = form.querySelectorAll("input, select");
const alertBox = document.querySelector(".alert");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    inputs.forEach(input => {
        const error = input.parentElement.querySelector(".error");

        if (input.type !== "checkbox" && input.value.trim() === "") {
            error.style.display = "block";
            valid = false;
        } else if (error) {
            error.style.display = "none";
        }
    });

    alertBox.style.display = valid ? "none" : "block";
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Get all form elements
    const form = this;
    const inputs = form.querySelectorAll("input, select");
    const alertBox = form.querySelector(".alert");

    // Reset errors
    alertBox.style.display = "none";
    form.querySelectorAll(".error").forEach(err => err.style.display = "none");

    inputs.forEach(input => {
        const formGroup = input.closest(".form-group");
        const errorMsg = formGroup ? formGroup.querySelector(".error") : null;

        // TEXT & SELECT REQUIRED
        if ((input.type === "text" || input.tagName === "SELECT" || input.type === "email") && input.value.trim() === "") {
            if (errorMsg) errorMsg.style.display = "block";
            isValid = false;
        }

        // PHONE NUMBER VALIDATION
        if (input.previousElementSibling?.innerText === "Phone Number") {
            const phonePattern = /^[0-9]{10}$/;
            if (!phonePattern.test(input.value.trim())) {
                errorMsg.innerText = "Enter a valid 10-digit phone number.";
                errorMsg.style.display = "block";
                isValid = false;
            }
        }

        // EMAIL VALIDATION
        if (input.type === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value.trim())) {
                errorMsg.innerText = "Enter a valid email address.";
                errorMsg.style.display = "block";
                isValid = false;
            }
        }
    });

    // CHECKBOX VALIDATION
    const checkbox = form.querySelector(".checkbox input");
    if (!checkbox.checked) {
        alertBox.innerText = "Please authorize us by checking the checkbox.";
        alertBox.style.display = "block";
        isValid = false;
    }

    // FINAL RESULT
    if (!isValid) {
        alertBox.style.display = "block";
        return;
    }

    // SUCCESS (you can replace this with API call)
    alert("Form submitted successfully!");
    form.reset();
});
