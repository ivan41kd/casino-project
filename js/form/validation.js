const emailInputs = document.querySelectorAll('.main__form-input.email');

const validateEmail = (email, label) => {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 emailRegex.test(email.value) == false && email.value.trim() != ''
  ? email.classList.add('invalid-format')
  : email.classList.remove('invalid-format');
};
emailInputs.forEach((input) => {
 input.addEventListener('input', () => {
  validateEmail(input);
 });
});
