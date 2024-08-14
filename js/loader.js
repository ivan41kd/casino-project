const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
 loader.classList.add('hide');
 setTimeout(() => {
  loader.remove();
 }, 600);
});
