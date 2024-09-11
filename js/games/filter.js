const filterItems = document.querySelectorAll('.games__filter-item');
const categoriesList = document.querySelector('.games__categories-list.filter');
const filterListMobile = document.querySelector('.games__filter-list.mobile');
const currentItem = document.querySelector('.games__filter-current');
const resetAllMobile = filterListMobile.querySelector(
 '.games__filter-reset.mobile'
);

// Массив для хранения исходных позиций элементов (только для десктопной версии)
const originalOrder = Array.from(filterItems).map((item) => ({
 element: item,
 index: [...categoriesList.children].indexOf(item),
}));

// Функция для перемещения активного элемента в начало или возврата его на место (для десктопа)
const activeItem = (item) => {
 const reset = categoriesList.querySelector('.games__filter-reset');

 item.addEventListener('click', () => {
  // Игнорируем элементы с классом mobile
  if (item.classList.contains('mobile')) return;

  // Тоггл класса active
  if (item.classList.toggle('active')) {
   // Если элемент активен, перемещаем его в начало списка
   categoriesList.prepend(item);
  } else {
   // Если элемент не активен, возвращаем его на исходную позицию
   const original = originalOrder.find((el) => el.element === item);
   const siblings = Array.from(categoriesList.children).filter(
    (el) => el !== item
   );

   // Вставляем элемент на исходное место
   if (original) {
    const nextSibling = siblings[original.index];
    if (nextSibling) {
     categoriesList.insertBefore(item, nextSibling);
    } else {
     categoriesList.appendChild(item);
    }
   }
  }
 });

 // Логика сброса при клике на кнопку reset (для десктопа)
 reset.addEventListener('click', () => {
  filterItems.forEach((item2) => {
   // Игнорируем элементы с классом mobile
   if (item2.classList.contains('mobile')) return;

   item2.classList.remove('active');

   // Возвращаем каждый элемент на исходную позицию
   const original = originalOrder.find((el) => el.element === item2);
   const siblings = Array.from(categoriesList.children).filter(
    (el) => el !== item2
   );

   if (original) {
    const nextSibling = siblings[original.index];
    if (nextSibling) {
     categoriesList.insertBefore(item2, nextSibling);
    } else {
     categoriesList.appendChild(item2);
    }
   }
  });
 });
};

// Функция для сброса всех фильтров (для десктопа)
const resetItems = () => {
 const reset = categoriesList.querySelector('.games__filter-reset');

 reset.classList.add('active');

 reset.addEventListener('click', () => {
  filterItems.forEach((item2) => {
   // Игнорируем элементы с классом mobile
   if (item2.classList.contains('mobile')) return;

   item2.classList.remove('active');

   // Возвращаем каждый элемент на исходную позицию
   const original = originalOrder.find((el) => el.element === item2);
   const siblings = Array.from(categoriesList.children).filter(
    (el) => el !== item2
   );

   if (original) {
    const nextSibling = siblings[original.index];
    if (nextSibling) {
     categoriesList.insertBefore(item2, nextSibling);
    } else {
     categoriesList.appendChild(item2);
    }
   }
  });
 });
};

// Применяем логику активного элемента и сброса только к элементам, не являющимся мобильными
filterItems.forEach((item) => {
 if (!item.classList.contains('mobile')) {
  activeItem(item);
  resetItems();
 }
});

// Логика для работы с фильтрами на мобильной версии
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
   const filteredArr = [...new Set(filterArr)]; // Убираем дубликаты
   document.querySelector('.games__current').textContent = filteredArr;

   resetAllMobile.classList.add('active');
  });
 });
});

// Логика сброса фильтров на мобильной версии
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
 filterArr.length = 0; // Очищаем массив фильтров
});
