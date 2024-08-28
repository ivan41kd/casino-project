import { data } from './countries.js';
const selectListWrapper = document.querySelector(
 '.main__form-select-list-wrapper.country'
);
const selectList = selectListWrapper.querySelector('.main__form-select-list');

const formSelect = document.querySelector('.main__form-select');

const selectInput = document.querySelector('.main__form-select-input');

const createItems = ({ country }) => {
 const listItemWrapper = document.createElement('div');
 listItemWrapper.className = 'main__form-select-list-item-wrapper';

 const listItem = document.createElement('li');
 listItem.className = 'main__form-select-list-item';
 listItem.textContent = country;
 listItemWrapper.append(listItem);
 selectList.append(listItemWrapper);
 listItemWrapper.addEventListener('click', () => {
  const label = formSelect.querySelector('.main__form-label');
  label.classList.add('top');
  const itemHtml = document.querySelector('.main__form-select-current');

  itemHtml.textContent = country;
 });
};

const searchItem = (letter) => {
 selectList.innerHTML = '';

 data.forEach((item) => {
  const country = item.country.toLowerCase();
  const arg = letter.toLowerCase();

  if (country.includes(arg)) {
   createItems(item);
  }
 });
 if (!selectList.hasChildNodes()) {
  const notFound = document.createElement('div');
  notFound.className = 'main__not-found';
  notFound.innerHTML = `<img class='main__not-found-img' src='./img/form/nothing-found.svg'/> <p class='main__not-found-text'>Nothing found</p>`;
  selectList.append(notFound);
 }
};
formSelect.addEventListener('click', () => {
 selectListWrapper.classList.toggle('active');
});

data.forEach((item) => {
 createItems(item);
});

selectInput.addEventListener('input', () => {
 if (selectInput.value != '') {
  searchItem(selectInput.value);
 } else {
  selectList.innerHTML = '';
  data.forEach((item) => {
   createItems(item);
  });
 }
});
