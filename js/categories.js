const categoriesItems = document.querySelectorAll('.games__categories-item');

// function selectItem(items){

// }

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
