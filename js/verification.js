const code = '123456';

const timerMobile = document.querySelector('.main__timer.mobile');
const timerEmail = document.querySelector('.main__timer.email');

const resendMob = document.querySelector('.main__verification-resend.mobile');
const resendEmail = document.querySelector('.main__verification-resend.email');

const mobModal = document.querySelector('.main__verification-modal.mobile');
const emailModal = document.querySelector('.main__verification-modal.email');

const verifyTextMob = document.querySelector('.main__form-verify-text.phone');
const verifyTextEmail = document.querySelector('.main__form-verify-text.email');

const mainInputMob = document.querySelector(
 '.main__form-input-label-wrapper.verify.phone'
);
const mainInputEmail = document.querySelector(
 '.main__form-input-label-wrapper.verify.email'
);

const inputsMob = document.querySelectorAll('.main__verificion-input.mobile');
const inputsEmail = document.querySelectorAll('.main__verificion-input.email');

const mobClose = document.querySelector(
 '.main__verification-modal-close.phone'
);
const emailClose = document.querySelector(
 '.main__verification-modal-close.email'
);

const formatTime = (minutes, seconds) => {
 return `${minutes.toString().padStart(2, '0')}:${seconds
  .toString()
  .padStart(2, '0')}`;
};

const startTimer = (element, durationInSeconds) => {
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

verifyTextMob.addEventListener('click', () => {
 if (mainInputMob.classList.contains('verified')) {
  mobModal.classList.toggle('active');
 } else {
  console.log('Verification is not allowed, class "verified" is missing.');
 }
});

verifyTextEmail.addEventListener('click', () => {
 if (mainInputEmail.classList.contains('verified')) {
  emailModal.classList.toggle('active');
 } else {
  console.log('Verification is not allowed, class "verified" is missing.');
 }
});

const mobObserver = new MutationObserver(() => {
 if (!mainInputMob.classList.contains('verified')) {
  mobModal.classList.remove('active');
 }
});

mobObserver.observe(mainInputMob, {
 attributes: true,
 attributeFilter: ['class'],
});

const emailObserver = new MutationObserver(() => {
 if (!mainInputEmail.classList.contains('verified')) {
  emailModal.classList.remove('active');
 }
});

emailObserver.observe(mainInputEmail, {
 attributes: true,
 attributeFilter: ['class'],
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

inputsMob.forEach((input, index) => {
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

  if ([...inputsMob].every((input) => input.value !== '')) {
   const enteredCode = [...inputsMob].map((input) => input.value).join('');
   if (enteredCode === code) {
    mobModal.classList.remove('active');
    const icon = verifyTextMob.previousElementSibling;
    const icon2 = verifyTextMob.nextElementSibling;
    icon.src = './img/icons/verify-active.svg';
    icon2.remove();
    verifyTextMob.classList.toggle('verified');
   } else {
    inputsMob.forEach((input) => {
     console.log(input.parentElement);
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
    inputsMob[index - 1].focus();
   }
  }
 });
});

inputsEmail.forEach((input, index) => {
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

  if ([...inputsEmail].every((input) => input.value !== '')) {
   const enteredCode = [...inputsEmail].map((input) => input.value).join('');
   if (enteredCode === code) {
    emailModal.classList.remove('active');
    const icon = verifyTextEmail.previousElementSibling;
    const icon2 = verifyTextEmail.nextElementSibling;
    icon.src = './img/icons/verify-active.svg';
    icon2.remove();
    verifyTextEmail.classList.toggle('verified');
   } else {
    inputsEmail.forEach((input) => {
     input.classList.toggle('error');
    });
   }
  }
 });

 input.addEventListener('keyup', (e) => {
  if (e.key === 'Backspace') {
   input.value = '';
   if (index > 0) {
    input.setAttribute('disabled', true);
    inputsEmail[index - 1].focus();
   }
  }
 });
});
