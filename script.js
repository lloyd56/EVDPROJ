
const prices = {
    bw: 2,
    color: 4,
    copybw: 1,
    copycolor: 2,
    pen: 10,
    pencil: 8,
    folder: 10
};

function peso(amount) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP"
    }).format(amount);
}

// ORDER FORM: calculate total automatically
const orderService = document.getElementById("orderService");
const orderQty = document.getElementById("orderQty");
const orderTotal = document.getElementById("orderTotal");

function updateOrderTotal() {
    if (!orderService || !orderQty || !orderTotal) return;

    const quantity = Math.max(
        1,
        parseInt(orderQty.value, 10) || 1
    );

    orderTotal.textContent = peso(
        prices[orderService.value] * quantity
    );
}

if (orderService && orderQty) {
    orderService.addEventListener("change", updateOrderTotal);
    orderQty.addEventListener("input", updateOrderTotal);
}

// PRINTING COST CALCULATOR
const calcPages = document.getElementById("calcPages");
const calcTotal = document.getElementById("calcTotal");
const calcBreakdown = document.getElementById("calcBreakdown");

function updateCalculator() {
    if (!calcPages || !calcTotal) return;

    const pages = Math.max(
        1,
        parseInt(calcPages.value, 10) || 1
    );

    const selected = document.querySelector(
        'input[name="printType"]:checked'
    );

    const type = selected ? selected.value : "bw";
    const rate = type === "color" ? prices.color : prices.bw;

    calcTotal.textContent = peso(pages * rate);

    if (calcBreakdown) {
        calcBreakdown.textContent =
            `${pages} pages × ${peso(rate)} per page`;
    }
}

if (calcPages) {
    calcPages.addEventListener("input", updateCalculator);

    document.querySelectorAll(
        'input[name="printType"]'
    ).forEach(input => {
        input.addEventListener("change", updateCalculator);
    });
}

const minusPage = document.getElementById("minusPage");
const plusPage = document.getElementById("plusPage");

if (minusPage) {
    minusPage.addEventListener("click", () => {
        calcPages.value = Math.max(
            1,
            (parseInt(calcPages.value, 10) || 1) - 1
        );
        updateCalculator();
    });
}

if (plusPage) {
    plusPage.addEventListener("click", () => {
        calcPages.value =
            (parseInt(calcPages.value, 10) || 1) + 1;
        updateCalculator();
    });
}

// ORDER FORM DEMONSTRATION
const orderForm = document.getElementById("orderForm");

if (orderForm) {
    orderForm.addEventListener("submit", event => {
        event.preventDefault();
        updateOrderTotal();

        document.getElementById("orderFeedback").textContent =
            "Thank you! Your sample order was reviewed. " +
            "It has not been sent or saved.";
    });
}

// CONTACT FORM DEMONSTRATION
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        document.getElementById("contactFeedback").textContent =
            "Thank you! Your inquiry was checked in this demo, " +
            "but it has not been emailed or saved.";
    });
}

updateOrderTotal();
updateCalculator();
