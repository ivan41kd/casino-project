const handIcon = document.querySelectorAll('.games__game-hand-icon');
handIcon.forEach((hand) => {
 hand.addEventListener('click', () => {
  const handParent = hand.parentNode;
  const gameOverlay = handParent.querySelector('.games__game-overlay');
  hand.style.display = 'none';
  gameOverlay.classList.add('active');

  handIcon.forEach((hand2) => {
   hand2.addEventListener('click', () => {
    if (hand2 != hand) {
     hand.style.display = 'block';
     gameOverlay.classList.remove('active');
    }
   });
   const html = document.querySelector('html');
   html.addEventListener('click', (e) => {
    if (e.target != hand) {
     hand.style.display = 'block';
     gameOverlay.classList.remove('active');
    }
   });
  });
  if (gameOverlay.classList.contains('active')) {
   setTimeout(() => gameOverlay.classList.remove('active'), 5000);
   setTimeout(() => (hand.style.display = 'block'), 5000);
  }
 });
});
