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

const cards = document.querySelectorAll(".mv-card");

    cards.forEach(card => {
        const icon = card.querySelector(".mv-icon");
        const heading = card.querySelector("h2");
        const paragraph = card.querySelector("p");

        // Initial state
        paragraph.style.display = "none";

        card.addEventListener("mouseenter", () => {
            icon.style.display = "none";
            heading.style.display = "none";
            paragraph.style.display = "block";
        });

        card.addEventListener("mouseleave", () => {
            icon.style.display = "flex";
            heading.style.display = "block";
            paragraph.style.display = "none";
        });
    });