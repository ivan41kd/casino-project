import { data } from '../countries.js';
mask('.main__form-input.phone');

const user = [
 {
  name: 'Alexander',
  surname: 'Malcolm',
  username: 'alexmal83',
  birth: '05.06.1987',
  email: 'alexmal83@gmail.com',
  phone: '+355 555 555 555',
  password: '123456789A',
  phoneVerified: true,
  emailVerified: true,
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

const modalAccount = document.querySelector('.modal-account');
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

const phoneWrapper = document.querySelector(
 '.main__form-input-label-wrapper.verify.phone'
);

const datePicker = modalAccount.querySelector('.main__datepicker');

const changePassFunc = (
 currentPassword,
 newPassword,
 confirmPassword,
 user
) => {
 if (
  currentPassword.value.trim() === '' ||
  newPassword.value.trim() === '' ||
  confirmPassword.value.trim() === ''
 ) {
  console.log('Пожалуйста, заполните все поля.');
  return;
 }

 if (currentPassword.value !== user[0].password) {
  console.log('Неверный текущий пароль.');
  return;
 }

 if (newPassword.value !== confirmPassword.value) {
  console.log('Пароли не совпадают.');
  return;
 }

 return true;
};

const disableInput = (input) => {
 input.disabled = true;
};

const saveInfo = () => {
 let isValid = true;
 datePicker.classList.remove('active');
 phoneList.classList.remove('active');

 inputs.forEach((input) => {
  if (input.value.trim() === '') {
   input.classList.add('invalid');
   isValid = false;
  } else if (
   input.classList.contains('invalid') ||
   input.classList.contains('invalid-format') ||
   input.classList.contains('young')
  ) {
   isValid = false;
  } else if (!input.classList.contains('invalid-format')) {
   input.classList.remove('invalid');
  }
 });

 const hasInvalidInput = Array.from(inputs).some((input) =>
  input.classList.contains('invalid')
 );

 if (
  isValid &&
  !hasInvalidInput &&
  !phoneWrapper.classList.contains('invalid')
 ) {
  user[0].name = nameInput.value;
  user[0].surname = surNameInput.value;
  user[0].username = userNameInput.value;
  user[0].birth = birthInput.value;
  user[0].phone = phoneInput.value;
  user[0].email = emailInput.value;

  editInfoButton.style.display = 'flex';
  cancelButton.style.display = 'none';
  saveInfoButton.style.display = 'none';
  phoneWrapper.classList.add('disabled');
  inputs.forEach((input) => (input.disabled = true));
 }
};

const editAndSave = (editButton, saveButton, inputs) => {
 editButton.addEventListener('click', () => {
  inputs.forEach((input) => (input.disabled = false));
  phoneWrapper.classList.remove('disabled');
  editButton.style.display = 'none';
  cancelButton.style.display = 'flex';
  saveInfoButton.style.display = 'flex';
 });

 saveButton.addEventListener('click', saveInfo);
};

const cancelInfo = () => {
 datePicker.classList.remove('active');
 phoneList.classList.remove('active');
 phoneWrapper.classList.remove('invalid');

 renderProfile();

 inputs.forEach((input) => {
  disableInput(input);
 });

 editInfoButton.style.display = 'flex';
 cancelButton.style.display = 'none';
 saveInfoButton.style.display = 'none';
 resetFormLabels();
};

const openChangeModal = () => {
 modalChange.classList.add('active');
 document.querySelector('.modal-account').classList.add('scroll-disabled');
 if (modalChangeWrapper.classList.contains('inactive')) {
  modalChangeWrapper.classList.remove('inactive');
  currentPass.value = null;
  newPass.value = null;
  confirmPass.value = null;
 }
};

const closeChangeModal = () => {
 modalChange.classList.remove('active');
 modalChangeWrapper.classList.add('inactive');
 document.querySelector('.modal-account').classList.remove('scroll-disabled');
};

const closeSuccessModal = () => {
 modalChange.classList.remove('active');
 modalSuccess.classList.remove('active');
 modalSuccess.classList.add('inactive');
 document.querySelector('.modal-account').classList.remove('scroll-disabled');
};

const renderProfile = () => {
 inputs.forEach((input) => {
  input.classList.remove('invalid');
  if (input.classList.contains('young')) input.classList.remove('young');
  if (input.classList.contains('invalid-format'))
   input.classList.remove('invalid-format');
 });
 cancelButton.style.display = 'none';
 saveInfoButton.style.display = 'none';

 user.forEach((user) => {
  nameInput.value = user.name;
  surNameInput.value = user.surname;
  userNameInput.value = user.username;
  birthInput.value = user.birth;
  phoneInput.value = user.phone;
  emailInput.value = user.email;
  if (user.phoneVerified == true) {
   phoneInput.parentElement.classList.add('verified');
  }
  if (user.emailVerified == true) {
   emailInput.parentElement.classList.add('verified');
  }
 });
};

inputs.forEach((input) => {
 disableInput(input);
 editAndSave(editInfoButton, saveInfoButton, inputs);
});

window.addEventListener('DOMContentLoaded', () => {
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
});

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
 changePassFunc(currentPass, newPass, confirmPass, user);
 if (changePassFunc(currentPass, newPass, confirmPass, user) == true) {
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
