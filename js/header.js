const header = document.querySelector('.header');

function scrollHeader(scroll) {
  scroll > 0 ? header.classList.add('fixed') : header.classList.remove('fixed');
}
window.addEventListener('scroll', () => {
  const scroll = this.scrollY;
  scrollHeader(scroll);
});
