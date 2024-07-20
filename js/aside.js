const aside = document.querySelector('aside');

function scrollAside() {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting === true) {
        aside.classList.add('fixed');
      } else aside.classList.remove('fixed');
    },
    { threshold: [0] }
  );
  observer.observe(document.querySelector('.footer'));
}

window.addEventListener('scroll', () => {
  scrollAside();
});
