const languageWrapper = document.querySelectorAll('.header__language-wrapper');
if (window.innerWidth <= 872) {
 languageWrapper.forEach((language) => {
  const languageList = language.querySelector('.header__language-list');
  const languageItem = languageList.querySelectorAll('.header__language-item');

  language.addEventListener('click', () => {
   if (!languageList.classList.contains('active')) {
    languageList.classList.add('active');
    languageItem.forEach((item) => {
     item.addEventListener('click', () => {
      const currentLanguage = language.querySelector('.header__language');
      currentLanguage.textContent = item.textContent;
     });
    });
   } else languageList.classList.remove('active');
  });
 });
} else if (window.innerWidth > 1410) {
 const languageWrapper = document.querySelector('.header__language-wrapper');
 const languageList = document.querySelector('.header__language-list');
 const languageItem = languageList.querySelectorAll('.header__language-item');
 languageItem.forEach((item) => {
  item.addEventListener('click', () => {
   const currentLanguage = document.querySelector('.header__item.language');
   currentLanguage.textContent = item.textContent;
  });
 });
}
