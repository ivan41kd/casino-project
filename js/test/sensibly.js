const sensiblyLinks = document.querySelectorAll('.play-sensibly__link-wrapper');

const sensiblyModal = document.querySelector('.main__sensibly-modal');
const closeSensiblyModal = document.querySelector(
 '.main__sensibly-modal-close-icon'
);

const openSensibly = () => {
 sensiblyModal.classList.add('active');
 document.body.classList.add('scroll-disabled');
};
const closeSensibly = () => {
 sensiblyModal.classList.remove('active');
 document.body.classList.remove('scroll-disabled');
};
sensiblyLinks.forEach((link) => {
 link.addEventListener('click', () => {
  openSensibly();
 });
});

closeSensiblyModal.addEventListener('click', () => {
 closeSensibly();
});
