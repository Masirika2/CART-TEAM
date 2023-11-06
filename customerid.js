// script.js
document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cartItems");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const usernameInput = document.getElementById("username");
    const loginBtn = document.getElementById("loginBtn");
    const orderNumber = document.getElementById("orderNumber");

    const cart = [];

    // Add items to the cart
    function addToCart(item) {
        cart.push(item);
        renderCart();
    }

    // Render the cart
    function renderCart() {
        cartItems.innerHTML = "";
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item} (Item ${index + 1})`;
            cartItems.appendChild(li);
        });
    }

    // Generate a random order number
    function generateOrderNumber() {
        const randomNum = Math.floor(Math.random() * 1000);
        const orderNum = `A${String(randomNum).padStart(3, '0')}`;
        return orderNum;
    }

    // Event listener for the "Checkout" button
    checkoutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
            const orderNum = generateOrderNumber();
            orderNumber.textContent = orderNum;
        } else {
            alert("Your cart is empty. Please add items before checking out.");
        }
    });

    // Event listener for the "Login" button
    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (username === "") {
            alert("Please enter a valid username.");
        } else {
            alert(`Welcome, ${username}!`);
        }
    });
});
