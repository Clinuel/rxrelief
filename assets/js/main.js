// Image carousel: auto-switch every 3 seconds
setInterval(() => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.slide');
    const activeIndex = [...slides].findIndex(s => s.classList.contains('active'));
    slides[activeIndex].classList.remove('active');
    const nextIndex = (activeIndex + 1) % slides.length;
    slides[nextIndex].classList.add('active');
  });
}, 3000);

// Change product quantity (for + and − buttons)
function changeQty(id, delta) {
  const input = document.getElementById(id);
  let value = parseInt(input.value) || 1;
  value += delta;
  input.value = value > 0 ? value : 1;
}

// Show custom modal popup
function showCartPopup(message) {
  let modal = document.getElementById('cart-popup-modal');
  let modalMsg = document.getElementById('cart-popup-message');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cart-popup-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.7)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.innerHTML = `<div style="background:#111;color:white;padding:30px 40px;border-radius:10px;box-shadow:0 0 20px lime;text-align:center;min-width:250px;max-width:90vw;">
      <div id='cart-popup-message' style='font-size:20px;margin-bottom:20px;'></div>
      <button id='cart-popup-close' style='background:lime;color:black;padding:10px 24px;border:none;border-radius:6px;font-size:18px;cursor:pointer;'>OK</button>
    </div>`;
    document.body.appendChild(modal);
    modalMsg = document.getElementById('cart-popup-message');
    document.getElementById('cart-popup-close').onclick = function() {
      modal.style.display = 'none';
    };
  }
  modalMsg.textContent = message;
  modal.style.display = 'flex';
  setTimeout(() => { modal.style.display = 'none'; }, 2000);
}

// Add to cart logic
function addToCart(name, price, qtyId) {
  const qty = parseInt(document.getElementById(qtyId).value) || 1;
  let cart = JSON.parse(localStorage.getItem('rxCart')) || [];
  const idx = cart.findIndex(item => item.name === name);
  if (idx > -1) {
    cart[idx].quantity = (parseInt(cart[idx].quantity) || 1) + qty;
  } else {
    cart.push({ name, price, quantity: qty });
  }
  localStorage.setItem('rxCart', JSON.stringify(cart));
  showCartPopup(`${qty} x ${name} added to cart!`);
  // If on cart page, update cart display
  if (window.location.pathname.endsWith('cart.html')) {
    if (typeof updateCartDisplay === 'function') updateCartDisplay();
  }
}
