const header = document.querySelector('.header');

const burgerIcon = document.querySelector('.header__burger-icon');
const burgerMenu = document.querySelector('.header__menu.burger');
const burgerClose = document.querySelector('.header__burger-close');
const burgerList = document.querySelectorAll('.header__menu-list');

function scrollHeader(scroll) {
  scroll > 0 ? header.classList.add('fixed') : header.classList.remove('fixed');
}
function openBurger() {
  burgerMenu.classList.add('active');
  document.body.classList.add('scroll-disabled');
}

function closeBurger() {
  burgerMenu.classList.remove('active');
  document.body.classList.remove('scroll-disabled');
}
window.addEventListener('scroll', () => {
  const scroll = this.scrollY;
  scrollHeader(scroll);
});

burgerIcon.addEventListener('click', () => {
  openBurger();
});
burgerClose.addEventListener('click', () => {
  closeBurger();
});

burgerList.forEach((item) => {
  const dropdownMenu = item.querySelector('.header__menu-item-list');
  if (!burgerMenu.classList.contains('active')) {
    dropdownMenu.classList.remove('active');
  }
  item.addEventListener('click', () => {
    if (burgerMenu.classList.contains('active')) {
      dropdownMenu.classList.toggle('active');
    }
    burgerList.forEach((item2) => {
      item2.addEventListener('click', () => {
        if (item2 != item) {
          dropdownMenu.classList.remove('active');
        }
      });
    });
  });
});
