import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('shadow-sm', 'border-b', 'border-ink/10');
    } else {
      navbar?.classList.remove('shadow-sm', 'border-b', 'border-ink/10');
    }
  }, { passive: true });

  // 2. Back to top button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      const show = window.scrollY > 600;
      backToTop.classList.toggle('opacity-0', !show);
      backToTop.classList.toggle('translate-y-2', !show);
      backToTop.classList.toggle('pointer-events-none', !show);
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Scrollspy — destaca o link da seção ativa
  const spyContainer = { desktop: document.querySelectorAll('.desktop-nav-link'), mobile: document.querySelectorAll('.mobile-nav-link') };
  const navMap = new Map();
  [...spyContainer.desktop, ...spyContainer.mobile].forEach(link => {
    const id = link.getAttribute('href')?.replace('#', '');
    if (!id) return;
    if (!navMap.has(id)) navMap.set(id, []);
    navMap.get(id).push(link);
  });

  const spySections = [...navMap.keys()]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const clearActive = (exceptId) => {
    navMap.forEach((links, id) => {
      if (id === exceptId) return;
      links.forEach(l => {
        l.classList.remove('nav-link-active');
        l.removeAttribute('aria-current');
      });
    });
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        clearActive(id);
        navMap.get(id)?.forEach(l => {
          l.classList.add('nav-link-active');
          l.setAttribute('aria-current', 'true');
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  spySections.forEach(section => spyObserver.observe(section));

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');

      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('hidden')) {
          icon.className = 'fas fa-bars text-xl text-ink';
        } else {
          icon.className = 'fas fa-times text-xl text-ink';
        }
      }
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars text-xl text-ink';
      });
    });
  }

  // 5. FAQ Accordion
  const accordionButtons = document.querySelectorAll('.faq-accordion-btn');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.accordion-icon');
      const isOpen = content.classList.contains('active');

      // Close all accordions first
      document.querySelectorAll('.accordion-content').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelectorAll('.accordion-icon').forEach(ic => {
        ic.style.transform = 'rotate(0deg)';
      });

      // Open clicked one if it was closed
      if (!isOpen) {
        content.classList.add('active');
        if (icon) icon.style.transform = 'rotate(180deg)';
        button.setAttribute('aria-expanded', 'true');
      } else {
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 6. Modality Switcher (Presencial Jundiaí / Online)
  const tabPresencial = document.getElementById('tab-presencial');
  const tabOnline = document.getElementById('tab-online');
  const contentPresencial = document.getElementById('content-presencial');
  const contentOnline = document.getElementById('content-online');

  const tabActive = 'flex-1 py-3 px-3 sm:px-6 text-center text-sm font-semibold rounded-full bg-ink text-white shadow-sm transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage';
  const tabInactive = 'flex-1 py-3 px-3 sm:px-6 text-center text-sm font-semibold rounded-full text-ink-soft hover:bg-sage-tint transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage';

  if (tabPresencial && tabOnline && contentPresencial && contentOnline) {
    const activate = (option) => {
      const isPresencial = option === 'presencial';
      tabPresencial.className = isPresencial ? tabActive : tabInactive;
      tabOnline.className = isPresencial ? tabInactive : tabActive;
      tabPresencial.setAttribute('aria-pressed', String(isPresencial));
      tabOnline.setAttribute('aria-pressed', String(!isPresencial));
      contentPresencial.classList.toggle('hidden', !isPresencial);
      contentOnline.classList.toggle('hidden', isPresencial);
    };

    tabPresencial.addEventListener('click', () => activate('presencial'));
    tabOnline.addEventListener('click', () => activate('online'));
  }
});