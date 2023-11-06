document.addEventListener("DOMContentLoaded", function () {
    const generateOrderNumberButton = document.getElementById("generateOrderNumber");
    const orderNumberSpan = document.getElementById("orderNumber");

    generateOrderNumberButton.addEventListener("click", function () {
        const orderNumber = generateOrderNumber();
        orderNumberSpan.textContent = orderNumber;
    });

    function generateOrderNumber() {
        // Generate a random order number 
        return "ORD-" + Math.floor(Math.random() * 10000);
    }
});
