const passwordInput = document.querySelector('.main__form-input.password');

const lengthText = document.querySelector(
 '.main__password-requirement-text.length'
);
const lettersText = document.querySelector(
 '.main__password-requirement-text.letters'
);
const numbersText = document.querySelector(
 '.main__password-requirement-text.numbers'
);

const passwordIcon = document.querySelector('.main__password-icon');

const checkLength = (value) => {
 value.length >= 8
  ? lengthText.classList.add('active')
  : lengthText.classList.remove('active');
};

const checkLetters = (value) => {
 const regExp = /[a-zA-Z]/g;
 regExp.test(value)
  ? lettersText.classList.add('active')
  : lettersText.classList.remove('active');
};

const checkNumbers = (value) => {
 const regExp = /\d/g;
 regExp.test(value)
  ? numbersText.classList.add('active')
  : numbersText.classList.remove('active');
};

passwordInput.addEventListener('input', () => {
 checkLength(passwordInput.value);
 checkLetters(passwordInput.value);
 checkNumbers(passwordInput.value);
 passwordIcon.classList.contains('active')
  ? (passwordInput.type = 'text')
  : (passwordInput.type = 'password');
});

passwordIcon.addEventListener('click', () => {
 passwordIcon.classList.toggle('active');
 passwordIcon.classList.contains('active')
  ? (passwordInput.type = 'text')
  : (passwordInput.type = 'password');
});
