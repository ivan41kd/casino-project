const faqItems = document.querySelectorAll('.faq__item-wrapper');

const accordionItem = document.querySelectorAll('.account__accordion-item');

if (faqItems) {
 faqItems.forEach((item) => {
  item.addEventListener('click', () => {
   item.classList.toggle('active');
   const accordionIcon = item.querySelector('.faq__item-icon');
   accordionIcon.classList.toggle('active');
  });
 });
}

accordionItem.forEach((item) => {
 item.addEventListener('click', () => {
  item.classList.toggle('active');
 });
});
