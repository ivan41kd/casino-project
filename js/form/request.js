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
 const phoneInput = form.querySelector('.main__form-input.phone'); // Assuming there's a phone input

 // Function to validate the form
 const validateForm = () => {
  let valid = true;

  inputs.forEach((input) => {
   if (input === phoneInput) {
    // Special handling for the phone input
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
    // General validation for other inputs
    if (!input.classList.contains('valid')) {
     valid = false;
     input.classList.add('highlight');
    } else {
     input.classList.remove('highlight');
    }
   }
  });

  return valid;
 };

 // Event listener for input to remove invalid and highlight classes
 inputs.forEach((input) => {
  input.addEventListener('input', () => {
   if (input === phoneInput) {
    // Special handling for the phone input
    phoneWrapper.classList.remove('highlight');
   } else if (input.value !== '') {
    input.classList.remove('invalid');
    input.classList.remove('highlight');
   }
  });
 });

 // Form submit event listener
 form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission to handle validation
  if (validateForm()) {
   console.log('Form is valid!');
   openRequestModal(); // Open modal on successful validation
  } else {
   console.log('Form is invalid!');
  }
 });
});
