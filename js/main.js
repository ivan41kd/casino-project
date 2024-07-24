const main = document.querySelector('main');
function scrollMain() {
  const mainRect = main.getBoundingClientRect();
  const scrollTop = window.scrollY + 900;
  if (scrollTop > mainRect.height) {
    main.classList.add('fixed');
    if (main.classList.contains('fixed')) {
      document.querySelector('.bg-girls').classList.add('fixed');
    }
  } else {
    document.querySelector('.bg-girls').classList.remove('fixed');
    main.classList.remove('fixed');
  }
}

window.addEventListener('scroll', () => {
  scrollMain();
});
