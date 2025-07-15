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
