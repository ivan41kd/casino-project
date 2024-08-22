const form = document.querySelector('.main__form');
const inputs = form.querySelectorAll('.main__form-input-label-wrapper');

const validateEmail = (email, label) => {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 emailRegex.test(email.value) == false && email.value.trim() != ''
  ? email.classList.add('invalid')
  : email.classList.remove('invalid');
};

form.addEventListener('submit', (e) => {
 e.preventDefault();
});

inputs.forEach((item) => {
 const labelInput = item.querySelector('.main__form-label');
 if (labelInput) {
  const input = item.querySelector('.main__form-input');

  input.addEventListener('input', () => {
   input.value.trim() != ''
    ? labelInput.classList.add('top')
    : labelInput.classList.remove('top');
   input.addEventListener('focusout', () => {
    input.classList.contains('email') ? validateEmail(input, labelInput) : null;
    if (
     labelInput.classList.contains('top') &&
     !input.classList.contains('invalid')
    ) {
     labelInput.parentElement.classList.add('verified');
    } else {
     labelInput.parentElement.classList.remove('verified');
    }
   });
  });
 }
});
