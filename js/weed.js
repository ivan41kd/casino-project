window.addEventListener('scroll', () => {
 const weed = document.querySelector('.weed-background');
 if (header.classList.contains('fixed')) {
  weed.classList.add('fixed');
 } else {
  weed.classList.remove('fixed');
 }
});
