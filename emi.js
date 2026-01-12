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

const amountRange = document.getElementById("amountRange");
const amountInput = document.getElementById("amountInput");

const rateRange = document.getElementById("rateRange");
const rateInput = document.getElementById("rateInput");

const tenureRange = document.getElementById("tenureRange");
const tenureInput = document.getElementById("tenureInput");

const emiEl = document.getElementById("emi");
const interestEl = document.getElementById("interest");
const totalEl = document.getElementById("total");

/* SYNC RANGE & INPUT */
function sync(range, input) {
    range.addEventListener("input", () => {
        input.value = range.value;
        calculateEMI();
    });

    input.addEventListener("input", () => {
        range.value = input.value;
        calculateEMI();
    });
}

sync(amountRange, amountInput);
sync(rateRange, rateInput);
sync(tenureRange, tenureInput);

/* EMI CALCULATION */
function calculateEMI() {
    let P = parseFloat(amountInput.value);
    let annualRate = parseFloat(rateInput.value);
    let years = parseFloat(tenureInput.value);

    if (!P || !annualRate || !years) {
        emiEl.innerText = "₹0";
        interestEl.innerText = "₹0";
        totalEl.innerText = "₹0";
        return;
    }

    let R = annualRate / 12 / 100;   // Monthly interest rate
    let N = years * 12;              // Total months

    let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    let totalPayment = EMI * N;
    let totalInterest = totalPayment - P;

    emiEl.innerText = formatINR(EMI);
    interestEl.innerText = formatINR(totalInterest);
    totalEl.innerText = formatINR(totalPayment);
}

/* INR FORMAT */
function formatINR(amount) {
    return "₹" + Math.round(amount).toLocaleString("en-IN");
}

/* INITIAL CALCULATION */
calculateEMI();
