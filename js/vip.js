const modals = document.querySelectorAll('.main__vip-card-modal');

const vipCards = document.querySelectorAll('.main__vip-card');
const accountCards = document.querySelectorAll('.account__level');

const allCards = (card, modal) => {
 card.addEventListener('click', () => {
  const levelID = card.dataset.level;
  const modalID = modal.dataset.level;
  if (levelID == modalID) {
   modal.classList.toggle('active');
   const closeModal = modal.querySelector('.main__vip-card-modal-close');
   closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
   });
  }
 });
};

accountCards.forEach((card) => {
 modals.forEach((modal) => {
  allCards(card, modal);
 });
});

vipCards.forEach((card) => {
 modals.forEach((modal) => {
  allCards(card, modal);
 });
});
