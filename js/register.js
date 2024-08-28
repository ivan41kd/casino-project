const registerForm = document.querySelector('.main__form.register-form');

const confirmPass = registerForm.querySelector(
 '.main__form-input.password.confirm-password'
);
const createPass = registerForm.querySelector(
 '.main__form-input.password.create-password'
);

const nameInput = registerForm.querySelector('.main__form-input.name');
const lastNameInput = registerForm.querySelector('.main__form-input.last-name');
const dateBirth = registerForm.querySelector(
 '.main__form-input.calendar.register-input'
);
const phoneWrapper = registerForm.querySelector(
 '.main__form-input-label-wrapper.verify.phone'
);
const phoneInput = registerForm.querySelector(
 '.main__form-input.phone.register-input'
);
const emailInput = registerForm.querySelector(
 '.main__form-input.email.register-input'
);

const verifyEmail = document.querySelector('.main__form-verify-text.email');
const verifyMob = document.querySelector('.main__form-verify-text.phone');

const checkEmptyField = (input) => {
 if (input.value.trim() === '') {
  input.classList.remove('valid');
  input.classList.add('invalid');
 } else {
  input.classList.remove('invalid');
  input.classList.add('valid');
 }
};

const checkEmailFormat = () => {
 const value = emailInput.value.trim();
 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 if (value === '') {
  emailInput.classList.remove('valid', 'invalid');
 } else if (!emailPattern.test(value)) {
  emailInput.classList.remove('valid');
  emailInput.classList.add('invalid');
 } else {
  emailInput.classList.remove('invalid');
  emailInput.classList.add('valid');
 }
};

const checkDateFormat = () => {
 const value = dateBirth.value.trim();
 const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
 const currentDate = new Date();
 const minAgeDate = new Date(
  currentDate.getFullYear() - 18,
  currentDate.getMonth(),
  currentDate.getDate()
 );

 if (!value) {
  dateBirth.classList.remove('valid', 'invalid-format', 'young');
  dateBirth.classList.add('invalid');
 } else if (!datePattern.test(value)) {
  dateBirth.classList.remove('valid', 'young');
  dateBirth.classList.add('invalid-format');
 } else {
  const [day, month, year] = value.split('.').map((num) => parseInt(num, 10));
  const dateObj = new Date(year, month - 1, day);

  if (
   dateObj.getDate() === day &&
   dateObj.getMonth() === month - 1 &&
   dateObj.getFullYear() === year
  ) {
   if (dateObj > minAgeDate) {
    dateBirth.classList.remove('valid', 'invalid-format');
    dateBirth.classList.add('young');
   } else {
    dateBirth.classList.remove('invalid', 'invalid-format', 'young');
    dateBirth.classList.add('valid');
   }
  } else {
   dateBirth.classList.remove('valid', 'young');
   dateBirth.classList.add('invalid-format');
  }
 }
};

const checkPassword = (createPass, confirmPass) => {
 const createPassValue = createPass.value.trim();
 const confirmPassValue = confirmPass.value.trim();
 if (createPassValue != '' && confirmPassValue != '') {
  if (createPassValue == confirmPassValue) {
   createPass.classList.remove('not-confirmed');
   confirmPass.classList.remove('not-confirmed');
   createPass.classList.add('confirmed');
   confirmPass.classList.add('confirmed');
  } else {
   createPass.classList.remove('confirmed');
   confirmPass.classList.remove('confirmed');
   createPass.classList.add('not-confirmed');
   confirmPass.classList.add('not-confirmed');
  }
  //  } else {
  //   createPass.classList.add('highlight');
  //   confirmPass.classList.add('highlight');
 }
};

const highlightInvalidFields = () => {
 [createPass, confirmPass].forEach((input) => {
  if (
   input.classList.contains('not-confirmed') ||
   input.classList.contains('invalid')
  ) {
   input.classList.add('highlight');
  } else {
   input.classList.remove('highlight');
  }
 });
};

const validateForm = () => {
 checkEmptyField(nameInput);
 checkEmptyField(lastNameInput);
 checkEmailFormat();
 checkDateFormat();
 checkPassword(createPass, confirmPass);

 const phoneIsValid = phoneWrapper.classList.contains('valid');

 if (!phoneIsValid) {
  phoneWrapper.classList.add('invalid');
 } else {
  phoneWrapper.classList.remove('invalid');
 }

 const allInputs = [
  nameInput,
  lastNameInput,
  dateBirth,
  emailInput,
  createPass,
  confirmPass,
 ];

 const allValid =
  allInputs.every(
   (input) =>
    (input.classList.contains('valid') ||
     input.classList.contains('confirmed')) &&
    !input.classList.contains('invalid') &&
    !input.classList.contains('invalid-format') &&
    !input.classList.contains('young')
  ) && phoneIsValid;

 return allValid;
};

registerForm.addEventListener('submit', (event) => {
 event.preventDefault();

 if (validateForm()) {
  console.log('Форма валидна и отправляется.');
 } else {
  console.log('Форма невалидна. Исправьте ошибки.');
  highlightInvalidFields();
 }
});

emailInput.addEventListener('input', () => {
 if (
  !emailInput.classList.contains('invalid-format') &&
  !emailInput.classList.contains('invalid')
 ) {
  verifyEmail.classList.remove('disabled');
 } else {
  verifyEmail.classList.add('disabled');
 }
});

phoneInput.addEventListener('input', () => {
 if (!phoneWrapper.classList.contains('invalid')) {
  verifyMob.classList.remove('disabled');
 } else {
  verifyMob.classList.add('disabled');
 }
});

nameInput.addEventListener('input', () => checkEmptyField(nameInput));
lastNameInput.addEventListener('input', () => checkEmptyField(lastNameInput));
emailInput.addEventListener('input', () => checkEmailFormat());
dateBirth.addEventListener('input', () => checkDateFormat());
createPass.addEventListener('input', () =>
 checkPassword(createPass, confirmPass)
);
confirmPass.addEventListener('input', () =>
 checkPassword(createPass, confirmPass)
);
