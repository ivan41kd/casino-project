const code = '123456';

const timerMobile = document.querySelector('.main__timer.mobile');
const timerEmail = document.querySelector('.main__timer.email');

const resendMob = document.querySelector('.main__verification-resend.mobile');
const resendEmail = document.querySelector('.main__verification-resend.email');

const mobModal = document.querySelector('.main__verification-modal.mobile');
const emailModal = document.querySelector('.main__verification-modal.email');

const mobModalWrapper = mobModal.querySelector(
 '.main__verification-modal-wrapper'
);
const emailModalWrapper = emailModal.querySelector(
 '.main__verification-modal-wrapper'
);

const successMobModal = mobModal.querySelector('.main__success-modal-wrapper');
const successEmailModal = emailModal.querySelector(
 '.main__success-modal-wrapper'
);

const closeSuccessMob = successMobModal.querySelector(
 '.main__success-modal-close'
);
const closeSuccessEmail = successEmailModal.querySelector(
 '.main__success-modal-close'
);

const verifyButtonMob = document.querySelector('.main__form-verify-text.phone');
const verifyButtonEmail = document.querySelector(
 '.main__form-verify-text.email'
);

const mainInputMobWrapper = document.querySelector(
 '.main__form-input-label-wrapper.verify.phone'
);
const mainInputEmailWrapper = document.querySelector(
 '.main__form-input-label-wrapper.verify.email'
);

const inputsVerifMob = document.querySelectorAll(
 '.main__verificion-input.mobile'
);
const inputsVerifEmail = document.querySelectorAll(
 '.main__verificion-input.email'
);

const input = document.querySelector('.main__form-input.phone');
const input2 = document.querySelector('.main__form-input.email');

const mobClose = document.querySelector(
 '.main__verification-modal-close.phone'
);
const emailClose = document.querySelector(
 '.main__verification-modal-close.email'
);

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
const disableVerifyButton = (verifyButton) => {
 verifyButton.classList.add('disabled');
 verifyButton.setAttribute('disabled', 'true');
};

const enableVerifyButton = (verifyButton) => {
 verifyButton.classList.remove('disabled');
 verifyButton.removeAttribute('disabled');
};

const observer = new MutationObserver((mutations) => {
 mutations.forEach((mutation) => {
  if (mutation.attributeName === 'class') {
   if (mainInputMobWrapper.classList.contains('valid')) {
    enableVerifyButton(verifyButtonMob);
   } else {
    disableVerifyButton(verifyButtonMob);
   }
  }
 });
});

observer.observe(mainInputMobWrapper, {
 attributes: true,
 attributeFilter: ['class'],
});

const observerEmail = new MutationObserver((mutations) => {
 mutations.forEach((mutation) => {
  if (mutation.attributeName === 'class') {
   if (input2.classList.contains('valid')) {
    enableVerifyButton(verifyButtonEmail);
   } else {
    disableVerifyButton(verifyButtonEmail);
   }
  }
 });
});

observerEmail.observe(input2, {
 attributes: true,
 attributeFilter: ['class'],
});

verifyButtonMob.addEventListener('click', () => {
 if (
  mainInputMobWrapper.classList.contains('valid') &&
  !verifyButtonMob.classList.contains('disabled') &&
  !verifyButtonMob.classList.contains('verified')
 ) {
  mobModal.classList.toggle('active');
 } else {
  return;
 }
});

verifyButtonEmail.addEventListener('click', () => {
 if (
  !verifyButtonEmail.classList.contains('disabled') &&
  !verifyButtonEmail.classList.contains('verified')
 ) {
  emailModal.classList.toggle('active');
 } else {
  return;
 }
});

resendMob.addEventListener('click', () => {
 startTimer(timerMobile, 60);
});

resendEmail.addEventListener('click', () => {
 startTimer(timerEmail, 60);
});

mobClose.addEventListener('click', () => {
 mobModal.classList.remove('active');
});

emailClose.addEventListener('click', () => {
 emailModal.classList.remove('active');
});

inputsVerifMob.forEach((input, index) => {
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

  if ([...inputsVerifMob].every((input) => input.value !== '')) {
   const enteredCode = [...inputsVerifMob].map((input) => input.value).join('');
   if (enteredCode === code) {
    mobModalWrapper.classList.add('inactive');
    successMobModal.classList.remove('inactive');
    successMobModal.classList.add('active');
    mainInputMobWrapper.classList.add('verified');
    const icon = verifyButtonMob.previousElementSibling;
    const icon2 = verifyButtonMob.nextElementSibling;
    icon.src = './img/icons/verify-active.svg';
    icon2.remove();
    verifyButtonMob.classList.toggle('verified');
    verifyButtonMob.textContent = 'Verified';
   } else if (enteredCode == '') {
    inputsVerifMob.forEach((input) => {
     input.parentElement.classList.remove('error');
     input.classList.remove('error');
    });
   } else {
    inputsVerifMob.forEach((input) => {
     input.parentElement.classList.add('error');
     input.classList.add('error');
    });
   }
  }
 });

 input.addEventListener('keyup', (e) => {
  if (e.key === 'Backspace') {
   input.value = '';
   if (index > 0) {
    input.setAttribute('disabled', true);
    inputsVerifMob[index - 1].focus();
   }
  }
 });
});

inputsVerifEmail.forEach((input, index) => {
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

  if ([...inputsVerifEmail].every((input) => input.value !== '')) {
   const enteredCode = [...inputsVerifEmail]
    .map((input) => input.value)
    .join('');
   if (enteredCode === code) {
    input.classList.remove('error');
    emailModalWrapper.classList.add('inactive');
    successEmailModal.classList.remove('inactive');
    successEmailModal.classList.add('active');
    mainInputEmailWrapper.classList.add('verified');

    const icon = verifyButtonEmail.previousElementSibling;
    const icon2 = verifyButtonEmail.nextElementSibling;
    icon.src = './img/icons/verify-active.svg';
    icon2.remove();
    verifyButtonEmail.classList.toggle('verified');
    verifyButtonEmail.textContent = 'Verified';
   } else {
    inputsVerifEmail.forEach((input) => {
     input.classList.add('error');
    });
   }
  }
 });

 input.addEventListener('keyup', (e) => {
  if (e.key === 'Backspace') {
   input.value = '';
   if (index > 0) {
    input.setAttribute('disabled', true);
    inputsVerifEmail[index - 1].focus();
   }
  }
 });

 closeSuccessMob.addEventListener('click', () => {
  mobModal.classList.remove('active');
  mobModal.classList.add('inactive');
  successMobModal.classList.remove('active');
  successMobModal.classList.add('inactive');
 });
 closeSuccessEmail.addEventListener('click', () => {
  emailModal.classList.remove('active');
  emailModal.classList.add('inactive');
  successEmailModal.classList.remove('active');
  successEmailModal.classList.add('inactive');
 });
});
disableVerifyButton(verifyButtonMob);
disableVerifyButton(verifyButtonEmail);
