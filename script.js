const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const typeButton = document.querySelector('.type-control');
if (typeButton) {
  const saved = localStorage.getItem('anseong-large-type') === 'true';
  document.body.classList.toggle('large-type', saved);
  typeButton.setAttribute('aria-pressed', String(saved));
  typeButton.addEventListener('click', () => {
    const active = document.body.classList.toggle('large-type');
    typeButton.setAttribute('aria-pressed', String(active));
    localStorage.setItem('anseong-large-type', String(active));
  });
}

const progress = document.querySelector('.reading-progress');
if (progress) {
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
