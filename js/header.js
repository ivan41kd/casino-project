const header = document.querySelector('.header.main-header');

const burgerIcon = document.querySelectorAll('.header__burger-icon');
const burgerMenu = header.querySelector('.header__menu.burger');
const burgerClose = header.querySelector('.header__burger-close');
const burgerList = header.querySelectorAll('.header__menu-list');
const burgerMobileItemWrapper = header.querySelectorAll(
 '.header__burger-mobile-item-wrapper'
);
const burgerContent = header.querySelector('.header__burger-wrapper');
const burgerAccount = header.querySelector('.header__burger-account-wrapper');
const burgerAccountButtons = header.querySelector(
 '.header__burger-account-bottom-wrapper'
);
const burgerItemList = header.querySelector(
 '.header__item-list-wrapper.burger'
);
const burgerLogOut = header.querySelector('.header__burger-account-logout');

const userWrapper = header.querySelector('.header__user-wrapper');
const userWrapperMobile = header.querySelector('.header__user-wrapper.mobile');

const modalAccount = document.querySelector('.modal-account');

const loginSignupWrapper = header.querySelector(
 '.header__signup-login-wrapper'
);

const buttonBurgerWrapper = header.querySelector('.header__button-wrapper');

const logout = header.querySelector('.header__logout');

const authenticated = localStorage.getItem('isAuthenticated');

const burgerProfileButton = header.querySelector(
 '.header__burger-account-profile'
);

const scrollHeader = (scroll) => {
 scroll > 0 ? header.classList.add('fixed') : header.classList.remove('fixed');
};

const openBurger = () => {
 burgerMenu.classList.add('active');
 burgerContent.style.opacity = 1;
 burgerContent.style.transition = 'opacity 5s';

 document.body.classList.add('scroll-disabled');
};

const closeBurger = () => {
 burgerMenu.classList.remove('active');
 burgerContent.style.opacity = 0;
 burgerContent.style.transition = 'opacity 1s';
 document.body.classList.remove('scroll-disabled');
};

const checkLogin = (value) => {
 value == 'true' && value != null
  ? loginSignupWrapper.remove()
  : userWrapper.remove();
 if (value == 'true' && value != null) {
  burgerContent.classList.add('logged');
  buttonBurgerWrapper.remove();
  burgerItemList.classList.toggle('logged');
 } else {
  modalAccount.remove();
  burgerAccount.remove();
  burgerAccountButtons.remove();
  userWrapperMobile.remove();
 }
};

window.addEventListener('scroll', () => {
 const scroll = this.scrollY;
 scrollHeader(scroll);
});

logout.addEventListener('click', () => {
 localStorage.removeItem('isAuthenticated');
 location.reload();
});
burgerLogOut.addEventListener('click', () => {
 localStorage.removeItem('isAuthenticated');
 location.reload();
});
burgerIcon.forEach((icon) => {
 icon.addEventListener('click', () => {
  openBurger();
 });
});
burgerClose.addEventListener('click', () => {
 closeBurger();
});

burgerProfileButton.addEventListener('click', () => {
 closeBurger();
 if (!modalAccount.classList.contains('active')) {
  openModalAccount();
 }
});

if (burgerMobileItemWrapper && window.innerWidth <= 768) {
 burgerMobileItemWrapper.forEach((item) => {
  const headerName = item.querySelector('.header__burger-mobile-item-name');
  const dropdownMenu = item.querySelector(
   '.header__burger-mobile-list-wrapper'
  );
  if (!burgerMenu.classList.contains('active')) {
   headerName.classList.remove('active');
   dropdownMenu.classList.remove('active');
  }
  item.addEventListener('click', () => {
   if (burgerMenu.classList.contains('active')) {
    headerName.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
   }
   burgerMobileItemWrapper.forEach((item2) => {
    item2.addEventListener('click', () => {
     if (item2 != item) {
      dropdownMenu.classList.remove('active');
     }
    });
   });
  });
 });
}

checkLogin(authenticated);
