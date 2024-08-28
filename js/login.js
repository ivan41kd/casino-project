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

formFirstStep.addEventListener('submit', () => {
 const input = formFirstStep.querySelector('.main__form-input.email.reset');
 if (!input.classList.contains('invalid') && input.value != '') {
  localStorage.setItem('step', 2);
  modalStep1.classList.remove('active');
  modalStep1.classList.toggle('inactive');
  modalStep2.classList.remove('inactive');
  modalStep2.classList.toggle('active');
 }
});

loginForm.addEventListener('submit', () => {
 if (passInput.value != '' && nameInput.value != '') {
  users.forEach((user) => {
   user.name == nameInput.value && user.password == passInput.value
    ? localStorage.setItem('isAuthenticated', true)
    : console.log('no!');

   if (localStorage.getItem('isAuthenticated') == 'true') {
    window.location.href = '/index.html';
   }
  });
 }
});

// const checkValue = (input) =>{
//     input.addEventListener('input', () =>{
//         input.value != '' ?
//     })
// }
