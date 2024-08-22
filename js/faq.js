const faqWrapper = document.querySelector('.faq__wrapper-names.mobile');

const faqList = document.querySelector('.faq__names-list');

const faqNames = document.querySelectorAll('.faq__name');

const currentItem = document.querySelector('.faq__name.current');

faqNames.forEach((name) => {
 if (
  !name.classList.contains('mobile') &&
  !name.classList.contains('current')
 ) {
  name.addEventListener('click', () => {
   faqNames.forEach((name2) => {
    name2.classList.remove('active');
   });
   name.classList.toggle('active');
  });
 }
});

const setCurrent = (list) => {
 const items = list.querySelectorAll('.faq__name.mobile');
 items.forEach((item) => {
  item.addEventListener('click', () => {
   currentItem.textContent = item.textContent;
  });
 });
};

faqWrapper.addEventListener('click', () => {
 faqWrapper.classList.toggle('opened');
 faqList.classList.toggle('active');
 setCurrent(faqList);
});
