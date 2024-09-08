const chks = document.querySelectorAll('.preventing-gambling__chk');

const checkResult = document.querySelector('.preventing-gambling__test-button');

const successModal = document.querySelector('.main__success-test-modal');
const successModalWrapper = document.querySelector(
 '.main__success-test-modal-wrapper'
);
const failedModal = document.querySelector('.main__failed-test-modal');
const failedModalWrapper = document.querySelector(
 '.main__failed-test-modal-wrapper'
);
const closeSuccessIcon = successModal.querySelector('.main__test-modal-close');
const closeFailedIcon = failedModal.querySelector('.main__test-modal-close');

const openModal = (modal, wrapper) => {
 modal.classList.remove('inactive');
 wrapper.classList.remove('inactive');
 modal.classList.add('active');
 wrapper.classList.add('active');
};

const closeModal = (modal, wrapper) => {
 modal.classList.remove('active');
 wrapper.classList.remove('active');
 modal.classList.add('inactive');
 wrapper.classList.add('inactive');
};

const successOrFail = (chks) => {
 const filteredArr = [...chks].filter((chk) => chk.checked);
 if (filteredArr.length != 0) {
  [...chks].forEach((chk) => {
   chk.classList.remove('invalid');
  });
  if (filteredArr.length % 2 === 0) {
   openModal(failedModal, failedModalWrapper);
  } else {
   openModal(successModal, successModalWrapper);
  }
 } else {
  [...chks].forEach((chk) => {
   chk.classList.add('invalid');
  });
 }
};

checkResult.addEventListener('click', () => {
 successOrFail(chks);
});

closeSuccessIcon.addEventListener('click', () => {
 closeModal(successModal, successModalWrapper);
});
closeFailedIcon.addEventListener('click', () => {
 closeModal(failedModal, failedModalWrapper);
});
