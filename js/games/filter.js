const filterItems = document.querySelectorAll('.games__filter-item');
const categoriesList = document.querySelector('.games__categories-list.filter');

const filterListMobile = document.querySelector('.games__filter-list.mobile');

const currentItem = document.querySelector('.games__filter-current');

const resetAllMobile = filterListMobile.querySelector(
 '.games__filter-reset.mobile'
);

const activeItem = (item) => {
 const reset = categoriesList.querySelector('.games__filter-reset');
 item.addEventListener('click', () => {
  item.classList.toggle('active');
  reset.addEventListener('click', () => {
   filterItems.forEach((item2) => {
    item2.classList.remove('active');
   });
  });
 });
};

const resetItems = () => {
 const reset = categoriesList.querySelector('.games__filter-reset');
 reset.classList.add('active');
 reset.addEventListener('click', () => {
  filterItems.forEach((item2) => {
   item2.classList.remove('active');
  });
 });
};

filterItems.forEach((item) => {
 if (!item.classList.contains('mobile')) {
  activeItem(item);
  resetItems();
 }
});

const filterArr = [];
currentItem.addEventListener('click', () => {
 const listWrapper = document.querySelector(
  '.games__filter-list-wrapper.mobile'
 );
 listWrapper.classList.toggle('opened');
 const filterList = filterListMobile.querySelector('.games__categories-list');
 filterList.classList.toggle('opened');
 const filterItem = filterList.querySelectorAll('.games__filter-item.mobile');
 filterItem.forEach((item) => {
  item.addEventListener('click', () => {
   item.classList.add('active');

   const currentFilter = filterListMobile.querySelector(
    '.games__filter-current'
   );
   if (currentFilter.classList.contains('default')) {
    currentFilter.classList.remove('default');
   }

   filterArr.push(item.textContent);
   const filteredArr = [...new Set(filterArr)];
   document.querySelector('.games__current').textContent = filteredArr;

   resetAllMobile.classList.add('active');
  });
 });
});

resetAllMobile.addEventListener('click', () => {
 const filterList = filterListMobile.querySelector('.games__categories-list');
 const filterItem = filterList.querySelectorAll('.games__filter-item.mobile');
 filterItem.forEach((item) => {
  item.classList.remove('active');
 });

 const currentFilter = filterListMobile.querySelector('.games__filter-current');
 document.querySelector('.games__current').textContent = 'All providers';
 currentFilter.classList.add('default');
 resetAllMobile.classList.remove('active');
 filterArr.length = 0;
});
