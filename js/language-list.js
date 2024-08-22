const languageWrapper = document.querySelectorAll('.header__language-wrapper');
if (window.innerWidth < 1410) {
 languageWrapper.forEach((language) => {
  const languageList = language.querySelector('.header__language-list');
  const languageItem = languageList.querySelectorAll('.header__language-item');

  language.addEventListener('click', () => {
   if (!languageList.classList.contains('active')) {
    languageList.classList.add('active');
    languageItem.forEach((item) => {
     item.addEventListener('click', () => {
      const currentLanguage = language.querySelector('.header__language');
      const currentLanguage2 = language.querySelector('.header__item.language');
      if (currentLanguage2) {
       currentLanguage2.textContent = item.textContent;
      }
      if (currentLanguage) {
       currentLanguage.textContent = item.textContent;
      }
     });
    });
   } else languageList.classList.remove('active');
  });
 });
} else if (window.innerWidth > 1410) {
 const languageList = document.querySelector('.header__language-list');
 const languageItem = languageList.querySelectorAll('.header__language-item');
 languageItem.forEach((item) => {
  item.addEventListener('click', () => {
   const currentLanguage = document.querySelector('.header__item.language');
   currentLanguage.textContent = item.textContent;
  });
 });
}
