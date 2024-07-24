const weedBackground = document.querySelector('.weed-background');

function scrollWeed() {
  if (main.classList.contains('fixed')) {
    weedBackground.classList.add('fixed');
  } else {
    weedBackground.classList.remove('fixed');
  }
}
window.addEventListener('scroll', () => {
  scrollWeed();
});
