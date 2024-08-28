const languageWrappers = document.querySelectorAll('.header__language-wrapper');

function updateLanguageText(languageWrapper, newText) {
 const currentLanguage = languageWrapper.querySelector(
  '.header__item.language'
 );
 const currentLanguage2 = languageWrapper.querySelector('.header__language');

 if (currentLanguage) {
  currentLanguage.textContent = newText;
  currentLanguage.classList.remove('active');
 } else if (currentLanguage2) {
  currentLanguage2.textContent = newText;
 }
}

const handleLanguageClick = (languageWrapper) => {
 const languageListWrapper = languageWrapper.querySelector(
  '.header__language-list-wrapper'
 );
 const languageItems = languageWrapper.querySelectorAll(
  '.header__language-item'
 );

 if (languageListWrapper.classList.contains('active')) {
  languageListWrapper.classList.remove('active');
 } else {
  languageListWrapper.classList.toggle('active');
  languageItems.forEach((item) => {
   item.addEventListener('click', () => {
    updateLanguageText(languageWrapper, item.textContent);
    languageListWrapper.classList.remove('active');
   });
  });
 }
};

const closeAllLanguageLists = () => {
 languageWrappers.forEach((languageWrapper) => {
  const languageListWrapper = languageWrapper.querySelector(
   '.header__language-list-wrapper'
  );
  languageListWrapper.classList.remove('active');
 });
};

languageWrappers.forEach((languageWrapper) => {
 if (window.innerWidth < 1410) {
  languageWrapper.addEventListener('click', (event) => {
   event.stopPropagation();
   handleLanguageClick(languageWrapper);
  });
 } else {
  const languageItems = languageWrapper.querySelectorAll(
   '.header__language-item'
  );
  languageItems.forEach((item) => {
   item.addEventListener('click', () => {
    updateLanguageText(languageWrapper, item.textContent);
    closeAllLanguageLists();
   });
  });
 }
});

document.addEventListener('click', (event) => {
 const isClickInside = Array.from(languageWrappers).some((languageWrapper) =>
  languageWrapper.contains(event.target)
 );

 if (!isClickInside) {
  closeAllLanguageLists();
 }
});
