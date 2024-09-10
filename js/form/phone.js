import { data } from '../countries.js';

mask('.main__form-input.phone');

const selectListWrappers = document.querySelectorAll('.main__form-phone');
const selectLists = document.querySelectorAll('.main__form-select-list.phone');
const formPhoneWrappers = document.querySelectorAll(
 '.main__form-phone-wrapper'
);
const inputs = document.querySelectorAll('.main__form-input.phone');
const phoneLists = document.querySelectorAll('.main__form-phone-list-wrapper');
const searchInputs = document.querySelectorAll(
 '.main__form-select-input.search-input-phone '
);

const createItems = (
 { country, code, flag },
 selectList,
 formPhoneWrapper,
 input
) => {
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
  input.parentElement.classList.add('invalid');
  const value = listItem.textContent.replace(/[^\d]/g, '');
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

const searchItem = (letter, selectList, formPhoneWrapper, input) => {
 selectList.innerHTML = '';
 console.log(selectList);

 data.forEach((item) => {
  const country = item.country.toLowerCase();
  const arg = letter.toLowerCase();

  if (country.includes(arg)) {
   createItems(item, selectList, formPhoneWrapper, input);
  }
 });

 if (!selectList.hasChildNodes()) {
  const notFound = document.createElement('div');
  notFound.className = 'main__not-found';
  notFound.innerHTML = `<img class='main__not-found-img' src='./img/form/nothing-found.svg'/> <p class='main__not-found-text'>Nothing found</p>`;
  selectList.append(notFound);
 }
};

const setDefaultCountryFlag = (formPhoneWrapper, input) => {
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
const trackDisabledInputs = () => {
 inputs.forEach((input) => {
  const parent = input.parentElement;

  const updateDisabledState = () => {
   if (input.disabled) {
    parent.classList.add('disabled');
   } else {
    parent.classList.remove('disabled');
   }
  };

  updateDisabledState();

  const observer = new MutationObserver(() => {
   updateDisabledState();
  });

  observer.observe(input, {
   attributes: true,
   attributeFilter: ['disabled'],
  });

  input.addEventListener('input', updateDisabledState);
 });
};

formPhoneWrappers.forEach((formPhoneWrapper, index) => {
 const phoneList = phoneLists[index];
 const selectList = selectLists[index];
 const input = inputs[index];
 const searchInput = searchInputs[index];

 formPhoneWrapper.addEventListener('click', () => {
  phoneList.parentElement.classList.toggle('active');
  phoneList.classList.toggle('active');
 });

 data.forEach((item) => {
  createItems(item, selectList, formPhoneWrapper, input);
 });

 setDefaultCountryFlag(formPhoneWrapper, input);
 if (searchInput != undefined) {
  searchInput.addEventListener('input', () => {
   if (searchInput.value !== '') {
    searchItem(searchInput.value, selectList, formPhoneWrapper, input);
   } else {
    selectList.innerHTML = '';
    data.forEach((item) => {
     createItems(item, selectList, formPhoneWrapper, input);
    });
   }
  });
 }
 input.addEventListener('focus', () => {
  input.parentElement.classList.add('focus');
 });
 input.addEventListener('focusout', () => {
  input.parentElement.classList.remove('focus');
 });

 input.addEventListener('input', () => {
  const inputValue = input.value.replace(/[^\d+]/g, '');
  const imgUrl = formPhoneWrapper
   .querySelector('.main__form-phone-flag')
   .getAttribute('src');
  const filteredList = data.filter((country) => country.flag === imgUrl);

  if (filteredList.length) {
   const matchedCountry = filteredList[0];
   const filteredMask = maskList.filter((mask) =>
    mask.code.startsWith(matchedCountry.code)
   );

   filteredMask.forEach((item) => {
    if (item.code.length === input.value.length) {
     input.parentElement.classList.remove('invalid');
     input.parentElement.classList.add('valid');
     input.classList.add('valid');
    } else {
     input.parentElement.classList.add('invalid');
     input.parentElement.classList.remove('valid');
     input.classList.remove('valid');
    }
   });
  }

  if (inputValue === '') {
   setDefaultCountryFlag(formPhoneWrapper, input);
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
});
document.addEventListener('DOMContentLoaded', trackDisabledInputs);
