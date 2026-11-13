let cart = [];

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const itemEl = e.target.parentElement;
        const id = itemEl.getAttribute('data-id');
        const name = itemEl.getAttribute('data-name');
        const price = parseFloat(itemEl.getAttribute('data-price'));

        addToCart(id, name, price);
    });
});

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const cartNav = document.getElementById('cart-nav');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
        cartTotalContainer.innerText = 'R0.00';
        cartNav.innerText = '🛒 Cart (0)';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>R${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <strong>R${(item.price * item.quantity).toFixed(2)}</strong>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotalContainer.innerText = `R${total.toFixed(2)}`;
    cartNav.innerText = `🛒 Cart (${itemCount})`;
}

document.getElementById('order-form').addEventListener('submit', (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        alert('Please add items to your cart before placing an order.');
        return;
    }

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const orderType = document.getElementById('order-type').value;
    const address = document.getElementById('cust-address').value;

    // Format item details text
    let itemsText = '';
    cart.forEach(item => {
        itemsText += `- ${item.name} (x${item.quantity})\n`;
    });

    // Create the message content
    const message = `Hello Langa Complex, I'd like to place an order!\n\n` +
                    `*Name:* ${name}\n` +
                    `*Phone:* ${phone}\n` +
                    `*Method:* ${orderType}\n` +
                    (orderType === 'Delivery' ? `*Address:* ${address}\n` : '') +
                    `\n*Items Ordered:*\n${itemsText}\n` +
                    `*Total:* ${document.getElementById('cart-total').innerText}`;

    // Send order directly to business via WhatsApp API 
    // Replace with your actual business number structure (e.g., 27XXXXXXXXX for South Africa)
    const businessNumber = "27628978457"; 
    const encodedMessage = encodeURIComponent(message);
    window.location.href = "https://wa.me" + businessNumber + "?text=" + encodedMessage;
});
