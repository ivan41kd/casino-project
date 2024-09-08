const requestForms = document.querySelectorAll('.main__form.request-form');
const requestModal = document.querySelector('.main__success-request-modal');
const requestModalWrapper = document.querySelector(
 '.main__success-request-modal-wrapper'
);

const closeRequestIcon = requestModal.querySelector(
 '.main__success-request-modal-close'
);

const openRequestModal = () => {
 requestModal.classList.add('active');
 requestModalWrapper.classList.remove('inactive');
 requestModalWrapper.classList.add('active');
};

const closeRequestModal = () => {
 requestModal.classList.remove('active');
 requestModalWrapper.classList.remove('active');
};

closeRequestIcon.addEventListener('click', () => {
 closeRequestModal();
});

requestForms.forEach((form) => {
 const inputs = form.querySelectorAll('.main__form-input');
 const phoneWrapper = form.querySelector(
  '.main__form-input-label-wrapper.phone'
 );
 const phoneInput = form.querySelector('.main__form-input.phone');
 const selectValue = form.querySelector('.main__form-select-current');

 const validateForm = () => {
  let valid = true;

  inputs.forEach((input) => {
   if (input === phoneInput) {
    if (
     !phoneWrapper.classList.contains('invalid') &&
     input.classList.contains('valid')
    ) {
     phoneWrapper.classList.remove('highlight');
    } else {
     valid = false;
     phoneWrapper.classList.add('highlight');
    }
   } else {
    if (
     !input.classList.contains('valid') &&
     !input.classList.contains('optional')
    ) {
     valid = false;
     input.classList.add('highlight');
    } else {
     input.classList.remove('highlight');
    }
   }
   if (selectValue) {
    if (selectValue.textContent == '') {
     selectValue.parentElement.classList.add('highlight');
    } else {
     selectValue.parentElement.classList.remove('highlight');
    }
   }
  });

  return valid;
 };

 inputs.forEach((input) => {
  input.addEventListener('input', () => {
   if (input === phoneInput) {
    phoneWrapper.classList.remove('highlight');
   } else if (input.classList.contains('calendar')) {
    const inputCalendar = form.querySelector('.main__form-input.calendar');
    inputCalendar.classList.remove('highlight');
   } else if (input.value !== '' && !input.classList.contains('optional')) {
    input.classList.remove('invalid');
    input.classList.remove('highlight');
   }
  });
 });

 form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateForm()) {
   console.log('Form is valid!');
   openRequestModal();
  } else {
   console.log('Form is invalid!');
  }
 });
});
