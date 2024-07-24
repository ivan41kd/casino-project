const search = document.querySelector('.games__search');
const searchIcon = document.querySelector('.games__search-icon');

searchIcon.addEventListener('click', () => {
  if (!search.classList.contains('active')) {
    search.classList.add('active');
  } else search.classList.remove('active');
});
