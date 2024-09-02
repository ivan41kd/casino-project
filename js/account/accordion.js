const accordionItem = document.querySelectorAll('.account__accordion-item');

accordionItem.forEach((item) => {
 item.addEventListener('click', () => {
  item.classList.toggle('active');
 });
});
