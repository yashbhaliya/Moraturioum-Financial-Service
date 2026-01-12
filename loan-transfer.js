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



// Currency Formatter (Indian)
const formatINR = amount =>
    "₹" + amount.toLocaleString("en-IN");

// EMI Formula
function calculateEMI(principal, rate, years) {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    if (monthlyRate === 0) return principal / months;

    return (
        principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)
    ) / (Math.pow(1 + monthlyRate, months) - 1);
}

// Sync Range & Input
function sync(range, input) {
    range.addEventListener("input", () => {
        input.value = range.value;
        calculate();
    });

    input.addEventListener("input", () => {
        range.value = input.value;
        calculate();
    });
}

// Get Elements
const loanAmount = document.getElementById("loanAmount");
const loanAmountInput = document.getElementById("loanAmountInput");

const currentRate = document.getElementById("currentRate");
const currentRateInput = document.getElementById("currentRateInput");

const currentTenure = document.getElementById("currentTenure");
const currentTenureInput = document.getElementById("currentTenureInput");

const newRate = document.getElementById("newRate");
const newRateInput = document.getElementById("newRateInput");

const newTenure = document.getElementById("newTenure");
const newTenureInput = document.getElementById("newTenureInput");

const fees = document.getElementById("fees");
const feesInput = document.getElementById("feesInput");

// Results
const currentEmiEl = document.getElementById("currentEmi");
const newEmiEl = document.getElementById("newEmi");
const monthlySavingsEl = document.getElementById("monthlySavings");
const netBenefitsEl = document.getElementById("netBenefits");
const feesResultEl = document.getElementById("feesResult");
const grossBenefitsEl = document.getElementById("grossBenefits");

// Sync all fields
sync(loanAmount, loanAmountInput);
sync(currentRate, currentRateInput);
sync(currentTenure, currentTenureInput);
sync(newRate, newRateInput);
sync(newTenure, newTenureInput);
sync(fees, feesInput);

// Main Calculation
function calculate() {
    const P = +loanAmount.value;
    const oldRate = +currentRate.value;
    const oldYears = +currentTenure.value;
    const newRateVal = +newRate.value;
    const newYears = +newTenure.value;
    const fee = +fees.value;

    const currentEMI = calculateEMI(P, oldRate, oldYears);
    const newEMI = calculateEMI(P, newRateVal, newYears);

    const savings = currentEMI - newEMI;
    const grossBenefit = savings * 12 * newYears;
    const netBenefit = grossBenefit - fee;

    currentEmiEl.textContent = formatINR(Math.round(currentEMI));
    newEmiEl.textContent = formatINR(Math.round(newEMI));
    monthlySavingsEl.textContent = formatINR(Math.max(0, Math.round(savings)));
    grossBenefitsEl.textContent = formatINR(Math.max(0, Math.round(grossBenefit)));
    netBenefitsEl.textContent = formatINR(Math.max(0, Math.round(netBenefit)));
    feesResultEl.textContent = formatINR(fee);
}

// Initial run
calculate();
