// ---------- Language toggle ----------
function changeLanguage(lang) {
  document.querySelectorAll('[data-en]').forEach(function (el) {
    var text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });
  try { localStorage.setItem('tro-lang', lang); } catch (e) {}
}

// ---------- Mobile nav ----------
function toggleNav() {
  var nav = document.getElementById('navWrap');
  if (nav) nav.classList.toggle('open');
}

// ---------- Cart badge (persisted across pages) ----------
function getCartCount() {
  try { return parseInt(localStorage.getItem('tro-cart-count') || '0', 10); }
  catch (e) { return 0; }
}
function setCartCount(n) {
  try { localStorage.setItem('tro-cart-count', String(n)); } catch (e) {}
  document.querySelectorAll('.cart-badge').forEach(function (b) { b.textContent = n; });
}
function addToCart(name) {
  setCartCount(getCartCount() + 1);
  alert(name + ' added to cart.');
}
function buyNow(name) {
  alert('Proceeding to buy: ' + name);
}

// ---------- Odisha Yatri reveals ----------
function showTripSuggestion() {
  var box = document.getElementById('tripResults');
  if (box) box.classList.add('show');
}
function showFoodSuggestion() {
  var box = document.getElementById('foodResults');
  if (box) box.classList.add('show');
}

// ---------- Places filter ----------
function filterPlaces(category, btn) {
  document.querySelectorAll('.filters button').forEach(function (b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.filter-group').forEach(function (group) {
    var cat = group.getAttribute('data-category');
    group.hidden = !(category === 'all' || cat === category);
  });
}

// ---------- Rental cost calculator ----------
function calcRental() {
  var price = parseFloat(document.getElementById('calcVehicle').value);
  var days = parseInt(document.getElementById('calcDays').value, 10) || 1;
  var total = price * days;
  var out = document.getElementById('calcResult');
  if (out) {
    out.innerHTML = 'Estimated total: <b>₹' + total.toLocaleString('en-IN') + '</b> for ' + days + ' day' + (days > 1 ? 's' : '');
    out.classList.add('show');
  }
}

// ---------- Back to top ----------
function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var saved = null;
  try { saved = localStorage.getItem('tro-lang'); } catch (e) {}
  var selector = document.getElementById('lang-selector');
  if (saved && selector) {
    selector.value = saved;
    changeLanguage(saved);
  }
  setCartCount(getCartCount());
  initBackToTop();
});
