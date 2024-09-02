const code = '123456';

const modalWrapper = document.querySelector('.main__reset-modal');

const modalWrappers = document.querySelectorAll('.main__reset-modal-wrapper');

const emailModalVerification = document.querySelector(
 '.main__reset-modal-wrapper.step-2'
);

const confirmPasswordModal = document.querySelector(
 '.main__reset-modal-wrapper.step-3'
);

const successModal = document.querySelector('.main__success-modal-wrapper');
const successModalClose = successModal.querySelector(
 '.main__success-modal-close'
);

const confirmForm = confirmPasswordModal.querySelector('.main__form');

const resetInput = document.querySelectorAll('.main__reset-input.email');

const resetButt = document.querySelectorAll('.main__reset-resend.email');
const timer = document.querySelector('.main__reset.email');

const startTimer = (element, durationInSeconds) => {
 if (
  element.parentElement.nextElementSibling.classList.contains('disabled-resend')
 ) {
  return;
 }

 let timeRemaining = durationInSeconds;

 element.parentElement.nextElementSibling.classList.add('disabled-resend');

 const interval = setInterval(() => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  element.textContent = formatTime(minutes, seconds);

  if (timeRemaining === 0) {
   element.textContent = '';
   clearInterval(interval);
   element.parentElement.nextElementSibling.classList.remove('disabled-resend');
  } else {
   timeRemaining--;
  }
 }, 1000);
};

const formatTime = (minutes, seconds) => {
 return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
  2,
  '0'
 )}`;
};

const enableInput = (element) => {
 element.forEach((input, index) => {
  input.addEventListener('input', () => {
   const nextInput = input.nextElementSibling;

   if (input.value.length > 1) {
    input.value = input.value.slice(0, 1);
   }
   if (
    nextInput !== null &&
    nextInput.hasAttribute('disabled') &&
    input.value !== ''
   ) {
    nextInput.removeAttribute('disabled');
    nextInput.focus();
   }
   const enteredCode = [...element].map((input) => input.value).join('');
   if (enteredCode === code) {
    localStorage.setItem('step', 3);
    emailModalVerification.classList.remove('active');
    emailModalVerification.classList.toggle('inactive');
    confirmPasswordModal.classList.toggle('active');
    confirmPasswordModal.classList.remove('inactive');
   } else if (
    enteredCode != '' &&
    enteredCode.length == 6 &&
    enteredCode != code
   ) {
    element.forEach((input) => {
     input.parentElement.classList.add('error');
     input.classList.add('error');
    });
   }
  });
  input.addEventListener('keyup', (e) => {
   if (e.key === 'Backspace') {
    input.value = '';
    if (index > 0) {
     input.setAttribute('disabled', true);
     element[index - 1].focus();
    }
   }
  });
 });
};
const confirmPassword = (form) => {
 const newPass = form.querySelector(
  '.main__form-input.login-input.new-password'
 );
 const confirmPass = form.querySelector(
  '.main__form-input.login-input.confirm-password'
 );
 if (
  newPass.value == confirmPass.value &&
  newPass.classList.contains('valid') &&
  confirmPass.classList.contains('valid')
 ) {
  confirmPasswordModal.classList.remove('active');
  confirmPasswordModal.classList.add('inactive');
  successModal.classList.remove('inactive');
  successModal.classList.add('active');

  localStorage.removeItem('step');
 } else {
  newPass.classList.add('invalid');
  confirmPass.classList.add('invalid');
 }
};

localStorage.removeItem('step');

successModalClose.addEventListener('click', () => {
 successModal.classList.remove('active');
 successModal.classList.add('inactive');
 modalWrapper.classList.remove('active');
});

modalWrappers.forEach((wrapper) => {
 const modal = document.querySelectorAll('.main__reset-modal-wrapper');
 modal.forEach((modal) => {
  const closeIcon = modal.querySelector('.main__reset-modal-close');

  closeIcon.addEventListener('click', () => {
   modalWrapper.classList.remove('active');
   modal.classList.remove('active');
   modal.classList.add('inactive');
  });
 });
});

confirmForm.addEventListener('submit', (e) => {
 e.preventDefault();
 confirmPassword(confirmForm);
});

resetButt.forEach((reset) => {
 reset.addEventListener('click', () => {
  startTimer(timer, 60);
 });
});
enableInput(resetInput);
