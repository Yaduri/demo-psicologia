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
  });

  // 2. Mobile Menu Toggle
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

  // 3. FAQ Accordion
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

  // 4. Modality Switcher (Presencial Jundiaí / Online)
  const tabPresencial = document.getElementById('tab-presencial');
  const tabOnline = document.getElementById('tab-online');
  const contentPresencial = document.getElementById('content-presencial');
  const contentOnline = document.getElementById('content-online');

  if (tabPresencial && tabOnline && contentPresencial && contentOnline) {
    tabPresencial.addEventListener('click', () => {
      tabPresencial.className = 'flex-1 py-3 px-6 text-center text-sm font-semibold rounded-full bg-ink text-white shadow-sm transition-all duration-300 cursor-pointer';
      tabOnline.className = 'flex-1 py-3 px-6 text-center text-sm font-semibold rounded-full text-ink-soft hover:bg-sage-tint transition-all duration-300 cursor-pointer';
      contentPresencial.classList.remove('hidden');
      contentOnline.classList.add('hidden');
    });

    tabOnline.addEventListener('click', () => {
      tabOnline.className = 'flex-1 py-3 px-6 text-center text-sm font-semibold rounded-full bg-ink text-white shadow-sm transition-all duration-300 cursor-pointer';
      tabPresencial.className = 'flex-1 py-3 px-6 text-center text-sm font-semibold rounded-full text-ink-soft hover:bg-sage-tint transition-all duration-300 cursor-pointer';
      contentOnline.classList.remove('hidden');
      contentPresencial.classList.add('hidden');
    });
  }
});
