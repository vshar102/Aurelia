/* ── Config ─────────────────────────────────────────────────────── */
const API_BASE = 'https://neat-times-move.loca.lt/api';

/* ── Cart Module ────────────────────────────────────────────────── */
const Cart = {
  getCart() { return JSON.parse(localStorage.getItem('aurelia_cart') || '[]'); },
  saveCart(c) { localStorage.setItem('aurelia_cart', JSON.stringify(c)); this.updateBadge(); },
  getCartCount() { return this.getCart().reduce((s, i) => s + i.quantity, 0); },
  addToCart(item) {
    const cart = this.getCart();
    const existing = cart.find(i => i.id === item.id);
    if (existing) { existing.quantity++; } else { cart.push({ ...item, quantity: 1 }); }
    this.saveCart(cart);
    this.flashBadge();
  },
  removeFromCart(id) { this.saveCart(this.getCart().filter(i => i.id !== id)); },
  clearCart() { this.saveCart([]); },
  getTotal() { return this.getCart().reduce((s, i) => s + i.price * i.quantity, 0); },
  updateBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = this.getCartCount();
      el.style.display = this.getCartCount() === 0 ? 'none' : 'flex';
    });
  },
  flashBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.style.transform = 'scale(1.5)';
      setTimeout(() => el.style.transform = 'scale(1)', 250);
    });
  }
};

/* ── Cart Drawer ────────────────────────────────────────────────── */
function buildCartDrawer() {
  const overlay = document.getElementById('cart-overlay');
  const drawer  = document.getElementById('cart-drawer');
  if (!overlay || !drawer) return;

  function openCart() { overlay.classList.add('open'); drawer.classList.add('open'); renderCartDrawer(); }
  function closeCart() { overlay.classList.remove('open'); drawer.classList.remove('open'); }

  document.querySelectorAll('.cart-btn').forEach(b => b.addEventListener('click', openCart));
  overlay.addEventListener('click', closeCart);
  document.getElementById('close-cart')?.addEventListener('click', closeCart);

  function renderCartDrawer() {
    const items = Cart.getCart();
    const container = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');
    if (!container) return;
    if (items.length === 0) {
      container.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
      if (footer) footer.style.display = 'none';
    } else {
      container.innerHTML = items.map(item => `
        <div class="cart-item-row">
          <img src="https://picsum.photos/seed/${item.id}/600/800" alt="${item.name}">
          <div class="cart-item-info">
            <div class="name">${item.name}</div>
            <div class="qty">Qty: ${item.quantity}</div>
            <div class="price">$${(item.price * item.quantity).toLocaleString('en-US', {minimumFractionDigits:2})}</div>
          </div>
          <button class="remove-item" data-id="${item.id}" title="Remove">✕</button>
        </div>`).join('');
      container.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => { Cart.removeFromCart(Number(btn.dataset.id)); renderCartDrawer(); });
      });
      if (footer) {
        footer.style.display = 'block';
        const totalEl = document.getElementById('cart-total-val');
        if (totalEl) totalEl.textContent = '$' + Cart.getTotal().toLocaleString('en-US', {minimumFractionDigits:2});
      }
    }
  }
}

/* ── Scroll Header ──────────────────────────────────────────────── */
function initScrollHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const toggle = () => header.classList.toggle('scrolled', window.scrollY > 20);
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ── Active Nav Link ────────────────────────────────────────────── */
function initActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll('.header-nav a').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
}

/* ── Intersection Observer (Fade-in) ────────────────────────────── */
function initScrollAnimations() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.product-card').forEach(el => io.observe(el));
}

/* ── Product Filter ─────────────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      document.querySelectorAll('.product-card').forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ── Chat Widget ────────────────────────────────────────────────── */
function buildChatWidget() {
  const fab = document.getElementById('chat-fab');
  const win = document.getElementById('chat-window');
  const msgs = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const typing = document.getElementById('typing-indicator');
  if (!fab) return;

  fab.addEventListener('click', () => win.classList.toggle('open'));
  document.getElementById('chat-close')?.addEventListener('click', () => win.classList.remove('open'));

  function appendMsg(text, role) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    appendMsg(text, 'user');
    input.value = '';
    typing.classList.add('show');
    msgs.scrollTop = msgs.scrollHeight;
    try {
      await new Promise(r => setTimeout(r, 1000));
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      typing.classList.remove('show');
      appendMsg(data.reply, 'bot');
    } catch {
      typing.classList.remove('show');
      appendMsg('I apologise — a brief connection issue. Please try again.', 'bot');
    }
  }

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
}

/* ── Page: Shop (index.html) ────────────────────────────────────── */
async function initShopPage() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  try {
    const res = await fetch(`${API_BASE}/products`);
    const products = await res.json();
    grid.innerHTML = products.map(p => `
      <article class="product-card" data-category="${p.category}" aria-label="${p.name}">
        <div class="img-wrap"><img src="${p.image_url}" alt="${p.name}" loading="lazy"></div>
        <div class="product-info">
          <div class="product-category">${p.category}</div>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-footer">
            <span class="product-price">$${p.price.toLocaleString('en-US', {minimumFractionDigits:2})}</span>
            <button class="add-cart-btn"
              data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">
              Add to Cart
            </button>
          </div>
        </div>
      </article>`).join('');

    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Cart.addToCart({ id: Number(btn.dataset.id), name: btn.dataset.name, price: Number(btn.dataset.price) });
        btn.textContent = '✓ Added';
        setTimeout(() => btn.textContent = 'Add to Cart', 1500);
      });
    });
    initScrollAnimations();
    initFilters();
  } catch {
    grid.innerHTML = '<p style="color:var(--color-muted);text-align:center;padding:3rem;">Unable to load products. Please ensure the backend is running.</p>';
  }
}

/* ── Page: Contact (contact.html) ───────────────────────────────── */
function initContactPage() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const alert = document.getElementById('form-alert');
    const btn   = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Sending…';
    try {
      const res = await fetch(`${API_BASE}/contact-submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          subject: form.subject.value,
          message: form.message.value
        })
      });
      const data = await res.json();
      form.style.display = 'none';
      document.getElementById('contact-success').style.display = 'block';
      document.getElementById('success-msg').textContent = data.message;
    } catch {
      alert.textContent = 'A connection error occurred. Please try again.';
      alert.className = 'form-alert error visible';
    } finally {
      btn.disabled = false; btn.textContent = 'Send Enquiry';
    }
  });
}

/* ── Page: Checkout (checkout.html) ─────────────────────────────── */
function initCheckoutPage() {
  const container = document.getElementById('order-items');
  if (!container) return;
  const cart = Cart.getCart();

  if (cart.length === 0) {
    document.getElementById('checkout-main').innerHTML = `
      <div class="empty-cart-state">
        <h2>Your cart is empty</h2>
        <p style="color:var(--color-muted);margin-bottom:2rem;">Return to the collection and discover something extraordinary.</p>
        <a href="index.html" class="btn-primary">Explore Collection</a>
      </div>`;
    document.getElementById('checkout-sidebar').style.display = 'none';
    return;
  }

  const subtotal = Cart.getTotal();
  const shipping = 35;
  const total = subtotal + shipping;

  container.innerHTML = cart.map(item => `
    <div class="order-item">
      <img src="https://picsum.photos/seed/${item.id}/600/800" alt="${item.name}">
      <div class="order-item-info">
        <div class="name">${item.name}</div>
        <div class="qty">Quantity: ${item.quantity}</div>
        <div class="item-price">$${(item.price * item.quantity).toLocaleString('en-US', {minimumFractionDigits:2})}</div>
      </div>
    </div>`).join('');

  document.getElementById('sum-subtotal').textContent = '$' + subtotal.toLocaleString('en-US', {minimumFractionDigits:2});
  document.getElementById('sum-shipping').textContent = '$' + shipping.toFixed(2);
  document.getElementById('sum-total').textContent = '$' + total.toLocaleString('en-US', {minimumFractionDigits:2});

  const payBtn = document.getElementById('pay-btn');
  payBtn?.addEventListener('click', async () => {
    payBtn.classList.add('loading'); payBtn.disabled = true;
    try {
      const res = await fetch(`${API_BASE}/process-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total })
      });
      const data = await res.json();
      if (data.status === 'success') {
        Cart.clearCart();
        const overlay = document.getElementById('order-confirm-overlay');
        document.getElementById('order-id').textContent = data.order_id;
        overlay.classList.add('show');
      }
    } catch {
      payBtn.classList.remove('loading'); payBtn.disabled = false;
      alert('Payment could not be processed. Please check your connection.');
    }
  });
}

/* ── Bootstrap ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  initScrollHeader();
  initActiveNav();
  buildCartDrawer();
  buildChatWidget();

  const page = document.body.dataset.page;
  if (page === 'shop')     initShopPage();
  if (page === 'contact')  initContactPage();
  if (page === 'checkout') initCheckoutPage();
});
