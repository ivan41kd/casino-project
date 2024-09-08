const forms = document.querySelectorAll('.main__form');
forms.forEach((form) => {
 const inputs = form.querySelectorAll('.main__form-input-label-wrapper');

 const updateLabelPosition = (input, label) => {
  input.value.trim() !== ''
   ? label.classList.add('top')
   : label.classList.remove('top');
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
     updateLabelPosition(i, label);
     resetFormLabels();
    });
   });

   i.addEventListener('input', () => {
    if (
     !i.classList.contains('phone') &&
     !i.classList.contains('calendar') &&
     !i.classList.contains('email')
    ) {
     if (i.value == '') {
      i.classList.remove('valid');
      i.classList.add('invalid');
     } else {
      i.classList.remove('invalid');
      i.classList.add('valid');
     }
    }

    labelInput.forEach((label) => {
     updateLabelPosition(i, label);
    });
   });

   i.addEventListener('focusout', () => {
    labelInput.forEach((label) => {
     updateLabelPosition(i, label);
    });
   });
  });
 });
});

const resetFormLabels = () => {
 const forms = document.querySelectorAll('.main__form');
 forms.forEach((form) => {
  const inputs = form.querySelectorAll('.main__form-input-label-wrapper');
  inputs.forEach((item) => {
   const labelInput = item.querySelectorAll('.main__form-label');
   const input = item.querySelectorAll('.main__form-input');

   input.forEach((i) => {
    labelInput.forEach((label) => {
     label.classList.toggle('top', i.value.trim() !== '');
    });
   });
  });
 });
};
