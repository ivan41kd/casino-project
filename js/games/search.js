const search = document.querySelector('.games__search');
const searchIcon = document.querySelector('.games__search-icon');

search.addEventListener('click', () => {
  if (!search.classList.contains('active')) {
    search.classList.add('active');
    search.addEventListener('mouseleave', () => {
      search.classList.remove('active');
    });
  }
});
