const faqItems = document.querySelectorAll('.faq__item-wrapper');

faqItems.forEach((item) => {
 item.addEventListener('click', () => {
  item.classList.toggle('active');
  const accordionIcon = item.querySelector('.faq__item-icon');
  accordionIcon.classList.toggle('active');
 });
});
