const sensiblyLinks = document.querySelectorAll('.play-sensibly__link-wrapper');

const sensiblyModal = document.querySelectorAll('.main__sensibly-modal');

const openSensibly = (id) => {
 sensiblyModal.forEach((modal) => {
  if (modal.dataset.modal == id) {
   modal.classList.add('active');
   document.body.classList.add('scroll-disabled');
  }
 });
};

const closeSensibly = (modal) => {
 if (modal.classList.contains('active')) {
  modal.classList.remove('active');
  document.body.classList.remove('scroll-disabled');
 }
};

sensiblyLinks.forEach((link) => {
 link.addEventListener('click', () => {
  const id = link.dataset.modal;
  console.log(id);
  openSensibly(id);
 });
});

sensiblyModal.forEach((modal) => {
 const closeModalIcon = modal.querySelector('.main__sensibly-modal-close-icon');
 closeModalIcon.addEventListener('click', () => {
  closeSensibly(modal);
 });
});
