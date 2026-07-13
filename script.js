const products = [
  {
    id: 1,
    category: 'Shoes',
    name: 'Velocity Runner',
    description: 'Lightweight cushioning and a stable ride for fast training sessions.',
    price: 2490,
    image: 'รูปกีฬา/รองเท้า1.jpg',
  },
  {
    id: 2,
    category: 'Shoes',
    name: 'Court Pro',
    description: 'Responsive grip and sleek support for indoor and outdoor play.',
    price: 2890,
    image: 'รูปกีฬา/รองเท้า2.jpg',
  },
  {
    id: 3,
    category: 'Shoes',
    name: 'Sprint Flex',
    description: 'Flexible forefoot comfort for explosive movement and easy recovery.',
    price: 2190,
    image: 'รูปกีฬา/รองเท้า3.jpg',
  },
  {
    id: 4,
    category: 'Sports Socks',
    name: 'Cloud Cushion Socks',
    description: 'Soft compression and breathable fabric for all-day comfort.',
    price: 290,
    image: 'รูปกีฬา/ถุงเท้ากีฬา1.jpg',
  },
  {
    id: 5,
    category: 'Sports Socks',
    name: 'Aero Grip Socks',
    description: 'Anti-slip arches that stay secure through every sprint and squat.',
    price: 320,
    image: 'รูปกีฬา/ถุงเท้ากีฬา2.jpg',
  },
  {
    id: 6,
    category: 'Sports Socks',
    name: 'Training Duo',
    description: 'A comfort-packed pair built for gym sessions and casual wear.',
    price: 350,
    image: 'รูปกีฬา/ถุงเท้ากีฬา3.jpg',
  },
  {
    id: 7,
    category: 'Sports Eyewear',
    name: 'Shield Vision',
    description: 'UV protection and a secure fit for outdoor training and cycling.',
    price: 1890,
    image: 'รูปกีฬา/แว่นกีฬา1.jpg',
  },
  {
    id: 8,
    category: 'Sports Eyewear',
    name: 'Peak Focus',
    description: 'Streamlined lenses designed to minimize glare and sharpen performance.',
    price: 2190,
    image: 'รูปกีฬา/แว่นกีฬา2.jpg',
  },
  {
    id: 9,
    category: 'Sports Eyewear',
    name: 'Trail Pro',
    description: 'Impact-resistant design with a sporty finish for every adventure.',
    price: 1990,
    image: 'รูปกีฬา/แว่นกีฬา3.jpg',
  },
  {
    id: 10,
    category: 'Sports Bags',
    name: 'Arena Backpack',
    description: 'Spacious compartments and reinforced straps for gear organization.',
    price: 1690,
    image: 'รูปกีฬา/กระเป๋ากีฬา1.jpg',
  },
  {
    id: 11,
    category: 'Sports Bags',
    name: 'Match Tote',
    description: 'A compact bag with smart pockets for essentials and hydration.',
    price: 1490,
    image: 'รูปกีฬา/กระเป๋ากีฬา2.jpg',
  },
  {
    id: 12,
    category: 'Sports Bags',
    name: 'Training Duffel',
    description: 'Roomy, durable, and ready for weekend training or travel.',
    price: 1790,
    image: 'รูปกีฬา/กระเป๋ากีฬา3.jpg',
  },
];

const state = {
  cart: [],
  paymentMethod: 'TrueMoney',
};

const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const subtotalValue = document.getElementById('subtotalValue');
const totalValue = document.getElementById('totalValue');
const paymentLabel = document.getElementById('paymentLabel');
const cartToggle = document.getElementById('cartToggle');
const checkoutToggle = document.getElementById('checkoutToggle');
const cartPanel = document.querySelector('.cart-panel');
const closeCart = document.getElementById('closeCart');
const categoryGrid = document.getElementById('categoryGrid');

function formatPrice(value) {
  return `฿${value.toLocaleString()}`;
}

function filterProducts(category) {
  return category === 'All' ? products : products.filter((product) => product.category === category);
}

function renderProductCards(productList) {
  productsGrid.innerHTML = productList
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-info">
            <div class="product-meta">
              <span class="eyebrow">${product.category}</span>
              <span class="price">${formatPrice(product.price)}</span>
            </div>
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <div class="qty-control">
              <button type="button" data-action="decrease" data-id="${product.id}">−</button>
              <input type="number" min="1" value="1" data-qty-input data-id="${product.id}" />
              <button type="button" data-action="increase" data-id="${product.id}">+</button>
            </div>
            <button class="add-to-cart" type="button" data-add-to-cart data-id="${product.id}">Add to cart</button>
          </div>
        </article>
      `
    )
    .join('');
}

function renderProducts(category = 'All') {
  renderProductCards(filterProducts(category));
}

function renderCart() {
  if (!state.cart.length) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty. Add a few essentials to get started.</div>';
    cartBadge.textContent = '0';
    subtotalValue.textContent = formatPrice(0);
    totalValue.textContent = formatPrice(0);
    return;
  }

  cartBadge.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  subtotalValue.textContent = formatPrice(subtotal);
  totalValue.textContent = formatPrice(subtotal);

  cartItems.innerHTML = state.cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-top">
            <div>
              <h5>${item.name}</h5>
              <p>${formatPrice(item.price)} each</p>
            </div>
            <strong>${formatPrice(item.price * item.quantity)}</strong>
          </div>
          <div class="cart-actions">
            <div class="qty-control">
              <button type="button" data-cart-decrease data-id="${item.id}">−</button>
              <input type="number" min="1" value="${item.quantity}" data-cart-qty data-id="${item.id}" />
              <button type="button" data-cart-increase data-id="${item.id}">+</button>
            </div>
            <button class="remove-btn" type="button" data-remove-item data-id="${item.id}">Remove</button>
          </div>
        </div>
      `
    )
    .join('');
}

function applyCategoryFilter(category) {
  document.querySelectorAll('.category-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.category === category);
  });
  renderProducts(category);
}

function addToCart(productId, quantity) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({ ...product, quantity });
  }

  renderCart();
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }
  renderCart();
}

function setPaymentMethod(method) {
  state.paymentMethod = method;
  paymentLabel.textContent = method;
  document.querySelectorAll('.payment-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.method === method);
  });
}

function openCartPanel() {
  cartPanel.classList.add('is-open');
  renderCart();
}

productsGrid.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add-to-cart]');
  if (addButton) {
    const id = Number(addButton.dataset.id);
    const input = productsGrid.querySelector(`[data-qty-input][data-id="${id}"]`);
    const quantity = Math.max(1, Number(input.value || 1));
    addToCart(id, quantity);
    return;
  }

  const stepButton = event.target.closest('[data-action]');
  if (!stepButton) return;

  const id = Number(stepButton.dataset.id);
  const input = productsGrid.querySelector(`[data-qty-input][data-id="${id}"]`);
  if (!input) return;

  if (stepButton.dataset.action === 'increase') {
    input.value = Number(input.value || 1) + 1;
  } else if (stepButton.dataset.action === 'decrease') {
    input.value = Math.max(1, Number(input.value || 1) - 1);
  }
});

categoryGrid.addEventListener('click', (event) => {
  const selectedCard = event.target.closest('.category-card');
  if (!selectedCard) return;
  applyCategoryFilter(selectedCard.dataset.category);
});

cartItems.addEventListener('click', (event) => {
  const decreaseButton = event.target.closest('[data-cart-decrease]');
  if (decreaseButton) {
    updateCartQuantity(Number(decreaseButton.dataset.id), -1);
    return;
  }

  const increaseButton = event.target.closest('[data-cart-increase]');
  if (increaseButton) {
    updateCartQuantity(Number(increaseButton.dataset.id), 1);
    return;
  }

  const removeButton = event.target.closest('[data-remove-item]');
  if (removeButton) {
    state.cart = state.cart.filter((item) => item.id !== Number(removeButton.dataset.id));
    renderCart();
  }
});

cartItems.addEventListener('change', (event) => {
  const qtyInput = event.target.closest('[data-cart-qty]');
  if (!qtyInput) return;

  const id = Number(qtyInput.dataset.id);
  const item = state.cart.find((entry) => entry.id === id);
  if (!item) return;

  item.quantity = Math.max(1, Number(qtyInput.value || 1));
  renderCart();
});

document.querySelectorAll('.payment-btn').forEach((button) => {
  button.addEventListener('click', () => setPaymentMethod(button.dataset.method));
});

cartToggle.addEventListener('click', openCartPanel);
checkoutToggle.addEventListener('click', () => {
  openCartPanel();
  setPaymentMethod(state.paymentMethod);
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('is-open');
});

renderProducts();
renderCart();
setPaymentMethod('TrueMoney');


cartItems.addEventListener('change', (event) => {
  const qtyInput = event.target.closest('[data-cart-qty]');
  if (!qtyInput) return;

  const id = Number(qtyInput.dataset.id);
  const item = state.cart.find((entry) => entry.id === id);
  if (!item) return;

  item.quantity = Math.max(1, Number(qtyInput.value || 1));
  renderCart();
});

document.querySelectorAll('.payment-btn').forEach((button) => {
  button.addEventListener('click', () => setPaymentMethod(button.dataset.method));
});

cartToggle.addEventListener('click', () => {
  cartPanel.classList.add('is-open');
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('is-open');
});

renderProducts();
renderCart();
setPaymentMethod('TrueMoney');
