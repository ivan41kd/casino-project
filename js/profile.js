import { data } from './countries.js';
mask('.main__form-input.phone');

const user = [
 {
  name: 'Alexander',
  surname: 'Malcolm',
  username: 'alexmal83',
  birth: '05.06.1987',
  email: 'alexmal83@gmail.com',
  phone: '+355 555 555 555',
  password: 'blablabla123',
 },
];

const nameInput = document.querySelector(
 '.main__form-input.name.account-input'
);
const surNameInput = document.querySelector(
 '.main__form-input.surname.account-input'
);
const userNameInput = document.querySelector(
 '.main__form-input.username.account-input'
);
const birthInput = document.querySelector(
 '.main__form-input.calendar.account-input'
);
const phoneInput = document.querySelector(
 '.main__form-input.phone.account-input'
);
const emailInput = document.querySelector(
 '.main__form-input.email.account-input'
);

const inputs = document.querySelectorAll('.main__form-input.account-input');

const formPhoneWrapper = document.querySelector('.main__form-phone-wrapper');

const editInfoButton = document.querySelector('.account__profile-edit');
const saveInfoButton = document.querySelector('.account__profile-save');
const cancelButton = document.querySelector('.account__profile-cancel');

const phoneList = document.querySelector('.main__form-phone-list-wrapper');

const changePass = document.querySelector('.account__profile-change-pass');
const changePassForm = document.querySelector('.main__form.change-form.change');
const currentPass = document.querySelector(
 '.main__form-input.password.current'
);
const newPass = document.querySelector(
 '.main__form-input.password.new-password'
);
const confirmPass = document.querySelector(
 '.main__form-input.password.confirm-password'
);

const modalChange = document.querySelector('.modal-change');
const modalChangeWrapper = modalChange.querySelector(
 '.main__change-modal-wrapper'
);
const closeModalChangeIcon = modalChange.querySelector(
 '.main__change-modal-close'
);
const modalSuccess = modalChange.querySelector('.main__success-modal-wrapper');
const closeModalSuccess = modalChange.querySelector(
 '.main__success-modal-close'
);

const changePassFunc = (currentPassword, newPassword, confirmPassword) => {
 if (
  newPassword.value != '' &&
  confirmPassword.value != '' &&
  currentPassword.value != ''
 ) {
  return newPassword.value == confirmPassword.value ? true : false;
 } else return false;
};

const disableInput = (input) => {
 input.disabled = true;
};

const saveInfo = () => {
 let isValid = true;

 inputs.forEach((input) => {
  if (input.value.trim() === '') {
   input.classList.add('invalid');
   isValid = false;
  } else {
   input.classList.remove('invalid');
  }
 });

 const hasInvalidInput = Array.from(inputs).some((input) =>
  input.classList.contains('invalid')
 );

 if (isValid && !hasInvalidInput) {
  user[0].name = nameInput.value;
  user[0].surname = surNameInput.value;
  user[0].username = userNameInput.value;
  user[0].birth = birthInput.value;
  user[0].phone = phoneInput.value;
  user[0].email = emailInput.value;

  editInfoButton.style.display = 'flex';
  cancelButton.style.display = 'none';
  saveInfoButton.style.display = 'none';
  inputs.forEach((input) => (input.disabled = true));
 }
};

const editAndSave = (editButton, saveButton, inputs) => {
 editButton.addEventListener('click', () => {
  inputs.forEach((input) => (input.disabled = false));
  editButton.style.display = 'none';
  cancelButton.style.display = 'flex';
  saveInfoButton.style.display = 'flex';
 });

 saveButton.addEventListener('click', saveInfo);
};

const cancelInfo = () => {
 renderProfile();

 inputs.forEach((input) => {
  disableInput(input);
 });

 editInfoButton.style.display = 'flex';
 cancelButton.style.display = 'none';
 saveInfoButton.style.display = 'none';
};

const openChangeModal = () => {
 modalChange.classList.add('active');
 document.querySelector('.modal-account').add('scroll-disabled');
 if (modalChangeWrapper.classList.contains('inactive')) {
  modalChangeWrapper.classList.remove('inactive');
  currentPass.value = null;
  newPass.value = null;
  confirmPass.value = null;
 }
};

const closeChangeModal = () => {
 document.querySelector('.modal-account').remove('scroll-disabled');
 modalChange.classList.remove('active');
 modalChangeWrapper.classList.add('inactive');
};

const closeSuccessModal = () => {
 modalChange.classList.remove('active');
 modalSuccess.classList.remove('active');
 modalSuccess.classList.add('inactive');
};

const renderProfile = () => {
 cancelButton.style.display = 'none';
 saveInfoButton.style.display = 'none';
 user.forEach((user) => {
  nameInput.value = user.name;
  surNameInput.value = user.surname;
  userNameInput.value = user.username;
  birthInput.value = user.birth;
  phoneInput.value = user.phone;
  emailInput.value = user.email;
 });
};

inputs.forEach((input) => {
 disableInput(input);
 editAndSave(editInfoButton, saveInfoButton, inputs);
});

const matchedCountry = data.find((country) =>
 phoneInput.value.startsWith(country.code)
);
if (matchedCountry) {
 const existingFlag = formPhoneWrapper.querySelector('.main__form-phone-flag');

 if (!existingFlag) {
  const newFlag = document.createElement('img');
  newFlag.src = matchedCountry.flag;
  newFlag.className = 'main__form-phone-flag';
  formPhoneWrapper.prepend(newFlag);
 } else {
  existingFlag.src = matchedCountry.flag;
 }
}

formPhoneWrapper.addEventListener('click', () => {
 const isAnyInputEnabled = Array.from(inputs).some((input) => input.disabled);

 if (isAnyInputEnabled) {
  document
   .querySelector('.main__form-dropdown-icon')
   .classList.toggle('active');
  phoneList.classList.toggle('active');
 }
});

changePass.addEventListener('click', () => {
 openChangeModal();
});

closeModalSuccess.addEventListener('click', () => {
 closeSuccessModal();
});

changePassForm.addEventListener('submit', () => {
 changePassFunc(currentPass, newPass, confirmPass);
 if (changePassFunc(currentPass, newPass, confirmPass) == true) {
  modalChangeWrapper.classList.add('inactive');
  modalSuccess.classList.remove('inactive');
  modalSuccess.classList.add('active');
 } else {
  newPass.classList.add('invalid');
  confirmPass.classList.add('invalid');
 }
});

closeModalChangeIcon.addEventListener('click', () => {
 closeChangeModal();
});

cancelButton.addEventListener('click', cancelInfo);

renderProfile();
