const categoriesItems = document.querySelectorAll('.games__categories-item');

const categoriesWrapper = document.querySelector(
 '.games__categories-list-wrapper.mobile'
);

if (window.innerWidth >= 767) {
 categoriesItems.forEach((item, index) => {
  item.addEventListener('click', () => {
   item.classList.add('selected');
   categoriesItems.forEach((item2) => {
    if (item2 != item) {
     item2.classList.remove('selected');
    }
   });
  });
 });
} else {
 categoriesItems.forEach((item) => {
  item.addEventListener('click', () => {
   categoriesWrapper.classList.toggle('opened');
   const selectedItem = categoriesWrapper.querySelector(
    '.games__categories-item.mobile.active'
   );
   selectedItem.innerText = item.innerText;
   categoriesItems.forEach((item2) => {
    if (
     item2 == item &&
     !item2.classList.contains('active') &&
     !item2.classList.contains('selected')
    ) {
     item2.classList.remove('selected');
     item2.classList.toggle('selected');
     categoriesItems.forEach((item3) => {
      if (item3 != item2) {
       item3.classList.remove('selected');
      }
     });
    }
   });
  });
 });
}
