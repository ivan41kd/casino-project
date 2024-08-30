const users = [
 {
  name: 'lalalala@gmail.com',
  password: 'supersecretpassword123',
 },
];

const loginForm = document.querySelector('.main__form.login-form');

const formFirstStep = document.querySelector('.main__form.step-1');

const nameInput = document.querySelector('.main__form-input.name.login-input');
const passInput = loginForm.querySelector(
 '.main__form-input.password.login-input'
);

const resetModal = document.querySelector('.main__reset-modal.email');

const modalStep1 = document.querySelector('.main__reset-modal-wrapper.step-1');
const modalStep2 = document.querySelector('.main__reset-modal-wrapper.step-2');
const modalStep3 = document.querySelector('.main__reset-modal-wrapper.step-3');

const forgotText = document.querySelector('.main__password-forgot');

const emailInput = formFirstStep.querySelector('.main__form-input.email.reset');

forgotText.addEventListener('click', () => {
 const getStep = localStorage.getItem('step');
 resetModal.classList.toggle('active');
 if (getStep == null) {
  modalStep1.classList.remove('inactive');
  modalStep1.classList.toggle('active');
 } else if (getStep == 2) {
  modalStep2.classList.remove('inactive');
  modalStep2.classList.toggle('active');
 } else if (getStep == 3) {
  modalStep3.classList.remove('inactive');
  modalStep3.classList.toggle('active');
 }
});

emailInput.addEventListener('input', () => {
 if (!emailInput.classList.contains('invalid-format')) {
  emailInput.classList.remove('invalid');
 } else {
  return;
 }
});

formFirstStep.addEventListener('submit', () => {
 if (
  !emailInput.classList.contains('invalid-format') &&
  emailInput.value != ''
 ) {
  emailInput.classList.remove('invalid');
  emailInput.classList.add('invalid');
  localStorage.setItem('step', 2);
  modalStep1.classList.remove('active');
  modalStep1.classList.toggle('inactive');
  modalStep2.classList.remove('inactive');
  modalStep2.classList.toggle('active');
 } else {
  emailInput.classList.add('invalid');
 }
});

loginForm.addEventListener('submit', () => {
 if (passInput.value != '' && nameInput.value != '') {
  users.forEach((user) => {
   if (user.name == nameInput.value && user.password == passInput.value) {
    localStorage.setItem('isAuthenticated', true);
    console.log('yes');
   } else {
    nameInput.classList.add('invalid');
    passInput.classList.add('invalid');
   }
   // ? localStorage.setItem('isAuthenticated', true) && console.log('yes')
   // : console.log('no!');
  });
 }
});

// const checkValue = (input) =>{
//     input.addEventListener('input', () =>{
//         input.value != '' ?
//     })
// }
