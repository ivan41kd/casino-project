const forms = document.querySelectorAll('.main__form');
forms.forEach((form) => {
 const inputs = form.querySelectorAll('.main__form-input-label-wrapper');

 const validateEmail = (email, label) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailRegex.test(email.value) == false && email.value.trim() != ''
   ? email.classList.add('invalid-format')
   : email.classList.remove('invalid-format');
 };

 form.addEventListener('submit', (e) => {
  e.preventDefault();
 });

 inputs.forEach((item) => {
  const labelInput = item.querySelectorAll('.main__form-label');

  const input = item.querySelectorAll('.main__form-input');
  input.forEach((i) => {
   document.addEventListener('DOMContentLoaded', () => {
    labelInput.forEach((label) => {
     i.value.trim() != ''
      ? label.classList.add('top')
      : label.classList.remove('top');
     if (
      label.classList.contains('top') &&
      !i.classList.contains('invalid') &&
      !label.parentElement.classList.contains('invalid')
     ) {
      label.parentElement.classList.add('valid');
     } else {
      label.parentElement.classList.remove('valid');
     }
    });
   });
   i.addEventListener('input', () => {
    labelInput.forEach((label) => {
     i.value.trim() != ''
      ? label.classList.add('top')
      : label.classList.remove('top');
     i.classList.contains('email') ? validateEmail(i, label) : null;
     i.addEventListener('focusout', () => {
      i.classList.contains('email') ? validateEmail(i, label) : null;
      if (
       label.classList.contains('top') &&
       !i.classList.contains('invalid') &&
       !label.parentElement.classList.contains('invalid')
      ) {
       label.parentElement.classList.add('valid');
      } else {
       label.parentElement.classList.remove('valid');
      }
      if (!i.classList.contains('invalid-format') && i.value.trim() != '') {
       label.parentElement.classList.add('valid');
      } else {
       label.parentElement.classList.remove('valid');
      }
     });
    });
   });
  });
 });
});
