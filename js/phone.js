import { data } from './countries.js';

mask('.main__form-input.phone');

const selectListWrapper = document.querySelector('.main__form-phone');
const selectList = selectListWrapper.querySelector(
 '.main__form-select-list.phone'
);
const formPhoneWrapper = document.querySelector('.main__form-phone-wrapper');
const input = document.querySelector('.main__form-input.phone');

const phoneList = document.querySelector('.main__form-phone-list-wrapper');

const searchInput = phoneList.querySelector('.main__form-select-input');

const createItems = ({ country, code, flag }) => {
 const listItemWrapper = document.createElement('div');
 const listItem = document.createElement('li');
 const listFlag = document.createElement('img');
 listItemWrapper.className = 'main__form-select-list-item-wrapper';
 listItem.className = 'main__form-select-list-item phone';
 listFlag.className = 'main__form-phone-flag';

 listFlag.src = flag;

 listItem.textContent = `${code} ${country}`;
 listItem.prepend(listFlag);

 if (country === 'Russia') {
  listItemWrapper.classList.add('default');
 }

 listItemWrapper.append(listItem);
 selectList.append(listItemWrapper);

 listItem.addEventListener('click', () => {
  input.parentElement.classList.remove('verified');
  const value = listItem.textContent.replace(new RegExp(/[^\d]/, 'ig'), '');
  input.value = '+' + value;

  const existingFlag = formPhoneWrapper.querySelector('.main__form-phone-flag');
  if (!existingFlag) {
   const newFlag = document.createElement('img');
   newFlag.src = listFlag.getAttribute('src');
   newFlag.className = 'main__form-phone-flag';
   formPhoneWrapper.prepend(newFlag);
  } else {
   existingFlag.src = listFlag.getAttribute('src');
  }
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

const setDefaultCountryFlag = () => {
 const russia = data.find((country) => country.country === 'Russia');
 if (russia) {
  const existingFlag = formPhoneWrapper.querySelector('.main__form-phone-flag');

  if (!existingFlag) {
   const newFlag = document.createElement('img');
   newFlag.src = russia.flag;
   newFlag.className = 'main__form-phone-flag';
   formPhoneWrapper.prepend(newFlag);
  } else {
   existingFlag.src = russia.flag;
  }

  input.value = russia.code;
 }
};

formPhoneWrapper.addEventListener('click', () => {
 document.querySelector('.main__form-dropdown-icon').classList.toggle('active');
 phoneList.classList.toggle('active');
});

data.forEach((item) => {
 createItems(item);
});

setDefaultCountryFlag();

searchInput.addEventListener('input', () => {
 if (searchInput.value != '') {
  searchItem(searchInput.value);
 } else {
  selectList.innerHTML = '';
  data.forEach((item) => {
   createItems(item);
  });
 }
});

input.addEventListener('input', () => {
 const inputValue = input.value.replace(/[^\d+]/g, '');
 const imgUrl = document.querySelector('.main__form-phone-flag');
 const filteredList = data.filter((country) => {
  return country.flag == imgUrl.getAttribute('src');
 });
 const filteredMask = maskList.filter((mask) => {
  return mask.code.startsWith(filteredList[0].code);
 });
 filteredMask.forEach((item) => {
  item.code.length == input.value.length
   ? input.parentElement.classList.add('verified')
   : input.parentElement.classList.remove('verified');
 });

 if (inputValue === '') {
  setDefaultCountryFlag();
 } else {
  const matchedCountry = data.find((country) =>
   inputValue.startsWith(country.code)
  );

  if (matchedCountry) {
   const existingFlag = formPhoneWrapper.querySelector(
    '.main__form-phone-flag'
   );

   if (!existingFlag) {
    const newFlag = document.createElement('img');
    newFlag.src = matchedCountry.flag;
    newFlag.className = 'main__form-phone-flag';
    formPhoneWrapper.prepend(newFlag);
   } else {
    existingFlag.src = matchedCountry.flag;
   }
  }
 }
});
