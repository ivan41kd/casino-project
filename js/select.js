import { data } from './countries.js';
import { methods } from './methods.js';

const createItems = (itemsData, selectList, isMethodList) => {
 selectList.innerHTML = '';

 itemsData.forEach((item) => {
  const listItemWrapper = document.createElement('div');
  listItemWrapper.className = 'main__form-select-list-item-wrapper';

  const listItem = document.createElement('li');
  listItem.className = 'main__form-select-list-item';

  if (isMethodList) {
   listItem.textContent = item.method;
  } else {
   listItem.textContent = item.country;
  }

  listItemWrapper.append(listItem);
  selectList.append(listItemWrapper);

  listItemWrapper.addEventListener('click', () => {
   const formSelect = selectList
    .closest('.main__form-select-wrapper')
    .querySelector('.main__form-select');
   const label = formSelect.querySelector('.main__form-label');
   label.classList.add('top');

   const itemHtml = formSelect.querySelector('.main__form-select-current');
   selectList
    .closest('.main__form-select-list-wrapper')
    .classList.remove('active');

   if (formSelect.classList.contains('invalid')) {
    formSelect.classList.remove('invalid');
   }

   itemHtml.textContent = listItem.textContent;
  });
 });
};

const searchItem = (letter, selectList, itemsData, isMethodList) => {
 const filteredData = itemsData.filter((item) => {
  const value = isMethodList ? item.method : item.country;
  return value.toLowerCase().includes(letter.toLowerCase());
 });

 createItems(filteredData, selectList, isMethodList);

 if (!selectList.hasChildNodes()) {
  const notFound = document.createElement('div');
  notFound.className = 'main__not-found';
  notFound.innerHTML = `<img class='main__not-found-img' src='./img/form/nothing-found.svg'/>
                            <p class='main__not-found-text'>Nothing found</p>`;
  selectList.append(notFound);
 }
};

const initializeForms = () => {
 document
  .querySelectorAll('.main__form-select-wrapper')
  .forEach((formWrapper) => {
   const formSelect = formWrapper.querySelector('.main__form-select');
   const selectListWrapper = formWrapper.querySelector(
    '.main__form-select-list-wrapper'
   );
   const selectList = selectListWrapper.querySelector(
    '.main__form-select-list'
   );
   const selectInput = formWrapper.querySelector('.main__form-select-input');

   const isMethodList = selectList.classList.contains('method');
   const itemsData = isMethodList ? methods : data;

   createItems(itemsData, selectList, isMethodList);

   formSelect.addEventListener('click', () => {
    selectListWrapper.parentElement.classList.toggle('active');
    selectListWrapper.classList.toggle('active');
   });
   if (selectInput) {
    selectInput.addEventListener('input', () => {
     if (selectInput.value !== '') {
      searchItem(selectInput.value, selectList, itemsData, isMethodList);
     } else {
      createItems(itemsData, selectList, isMethodList);
     }
    });
   }

   document.addEventListener('click', (event) => {
    if (!formWrapper.contains(event.target)) {
     selectListWrapper.parentElement.classList.remove('active');
     selectListWrapper.classList.remove('active');
    }
   });
  });
};

document.addEventListener('DOMContentLoaded', initializeForms);
