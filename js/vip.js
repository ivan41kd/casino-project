const modals = document.querySelectorAll('.main__vip-card-modal');

const vipCards = document.querySelectorAll('.main__vip-card');

vipCards.forEach((card) => {
 card.addEventListener('click', () => {
  const levelID = card.dataset.level;
  modals.forEach((item) => {
   const modalID = item.dataset.level;
   if (levelID == modalID) {
    item.classList.toggle('active');
    const closeModal = item.querySelector('.main__vip-card-modal-close');
    closeModal.addEventListener('click', () => {
     item.classList.remove('active');
    });
   }
  });
 });
});
