const faqWrapper = document.querySelector('.faq__wrapper-names.mobile');

const faqList = document.querySelector('.faq__names-list');

const faqNames = document.querySelectorAll('.faq__name');

const currentItem = document.querySelector('.faq__name.current');

const faqItems = document.querySelectorAll('.faq__item-wrapper');

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

faqItems.forEach((item) => {
 item.addEventListener('click', () => {
  item.classList.toggle('active');
  const accordionIcon = item.querySelector('.faq__item-icon');
  accordionIcon.classList.toggle('active');
 });
});
