window.addEventListener('scroll', () => {
 const weed = document.querySelector('.weed-background.main-weed');
 if (header.classList.contains('fixed')) {
  weed.classList.add('fixed');
 } else {
  weed.classList.remove('fixed');
 }
});
