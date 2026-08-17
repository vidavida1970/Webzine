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

const shareButton = document.querySelector('[data-share]');
if (shareButton) {
  shareButton.addEventListener('click', async () => {
    const payload = {
      title: document.title,
      text: '뜨거운 걸 먹고 싶어지는 계절 — 안성마춤 웹진 에디터스 레터',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
    } catch (error) {
      if (error && error.name === 'AbortError') return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      shareButton.textContent = '링크를 복사했습니다';
      window.setTimeout(() => { shareButton.textContent = '공유하기'; }, 1800);
    } catch (error) {
      window.prompt('아래 주소를 복사해 공유하세요.', window.location.href);
    }
  });
}
