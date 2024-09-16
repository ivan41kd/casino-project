const passwordInputWrappers = document.querySelectorAll(
 '.main__form-input-label-wrapper.password'
);

passwordInputWrappers.forEach((wrapper) => {
 const passwordInput = wrapper.querySelector('.main__form-input.password');

 const lengthText = wrapper.querySelector(
  '.main__password-requirement-text.length'
 );
 const lettersText = wrapper.querySelector(
  '.main__password-requirement-text.letters'
 );
 const numbersText = wrapper.querySelector(
  '.main__password-requirement-text.numbers'
 );

 const requireWrapper = wrapper.querySelector(
  '.main__password-require-wrapper'
 );

 const passwordIcons = wrapper.querySelectorAll('.main__password-icon');

 const checkLength = (value, element) => {
  value.length >= 8
   ? element.classList.add('active')
   : element.classList.remove('active');
 };

 const checkLetters = (value, element) => {
  const regExp = /[a-zA-Z]/g;
  regExp.test(value)
   ? element.classList.add('active')
   : element.classList.remove('active');
 };

 const checkNumbers = (value, element) => {
  const regExp = /\d/g;
  regExp.test(value)
   ? element.classList.add('active')
   : element.classList.remove('active');
 };

 const verifyPassword = (requirement1, requirement2, requirement3, input) => {
  if (
   requirement1.classList.contains('active') &&
   requirement2.classList.contains('active') &&
   requirement3.classList.contains('active') &&
   input.value !== ''
  ) {
   input.classList.remove('invalid');
   input.classList.add('valid');
  } else {
   input.classList.remove('valid');
   input.classList.add('invalid');
  }
 };

 const showRequirements = (input) => {
  // Если поле ввода содержит класс 'login-input', подсказка не отображается
  if (input.classList.contains('login-input')) {
   requireWrapper.classList.remove('visible');
   return;
  }

  if (input.value !== '' && document.activeElement === input) {
   requireWrapper.classList.add('visible');
  } else {
   requireWrapper.classList.remove('visible');
  }
 };

 passwordIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
   icon.classList.toggle('active');
   icon.classList.contains('active')
    ? (passwordInput.type = 'text')
    : (passwordInput.type = 'password');
  });
 });

 passwordInput.addEventListener('input', () => {
  showRequirements(passwordInput);
  checkLength(passwordInput.value, lengthText);
  checkLetters(passwordInput.value, lettersText);
  checkNumbers(passwordInput.value, numbersText);
  verifyPassword(lengthText, lettersText, numbersText, passwordInput);
 });
 passwordInput.addEventListener('focus', () => showRequirements(passwordInput));
 passwordInput.addEventListener('blur', () => showRequirements(passwordInput));
});
