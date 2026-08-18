import './style.css';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Scroll Header Elevation & Mobile Bottom Bar Visibility
  const navbar = document.getElementById('navbar');
  const mobileBottomCta = document.getElementById('mobile-bottom-cta');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 20) {
      navbar?.classList.add('shadow-md', 'border-b', 'border-[#E8EFE9]');
    } else {
      navbar?.classList.remove('shadow-md', 'border-b', 'border-[#E8EFE9]');
    }

    // Show mobile bottom CTA bar after scrolling past hero (200px)
    if (mobileBottomCta) {
      if (scrollY > 250) {
        mobileBottomCta.classList.remove('translate-y-full', 'opacity-0');
        mobileBottomCta.classList.add('translate-y-0', 'opacity-100');
      } else {
        mobileBottomCta.classList.remove('translate-y-0', 'opacity-100');
        mobileBottomCta.classList.add('translate-y-full', 'opacity-0');
      }
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
      
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (mobileMenu.classList.contains('hidden')) {
          icon.className = 'fas fa-bars text-xl text-[#3A5A40]';
          document.body.style.overflow = '';
        } else {
          icon.className = 'fas fa-times text-xl text-[#3A5A40]';
          document.body.style.overflow = 'hidden';
        }
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars text-xl text-[#3A5A40]';
      });
    });
  }

  // 3. Staggered Scroll Reveal (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 4. FAQ Accordion
  const accordionButtons = document.querySelectorAll('.faq-accordion-btn');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.accordion-icon');
      const isOpen = content.classList.contains('active');

      // Close all accordions first for clean interaction
      document.querySelectorAll('.accordion-content').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelectorAll('.accordion-icon').forEach(ic => {
        ic.style.transform = 'rotate(0deg)';
      });
      document.querySelectorAll('.faq-accordion-btn').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it was closed
      if (!isOpen) {
        content.classList.add('active');
        if (icon) icon.style.transform = 'rotate(180deg)';
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5. Modality Switcher (Presencial Jundiaí / Online)
  const tabPresencial = document.getElementById('tab-presencial');
  const tabOnline = document.getElementById('tab-online');
  const contentPresencial = document.getElementById('content-presencial');
  const contentOnline = document.getElementById('content-online');

  if (tabPresencial && tabOnline && contentPresencial && contentOnline) {
    tabPresencial.addEventListener('click', () => {
      tabPresencial.className = 'flex-1 py-3 px-5 text-center font-semibold rounded-full bg-[#3A5A40] text-white shadow-md transition-all duration-300 cursor-pointer text-sm sm:text-base';
      tabOnline.className = 'flex-1 py-3 px-5 text-center font-semibold rounded-full text-[#3A5A40] hover:bg-[#E8EFE9] transition-all duration-300 cursor-pointer text-sm sm:text-base';
      contentPresencial.classList.remove('hidden');
      contentOnline.classList.add('hidden');
    });

    tabOnline.addEventListener('click', () => {
      tabOnline.className = 'flex-1 py-3 px-5 text-center font-semibold rounded-full bg-[#3A5A40] text-white shadow-md transition-all duration-300 cursor-pointer text-sm sm:text-base';
      tabPresencial.className = 'flex-1 py-3 px-5 text-center font-semibold rounded-full text-[#3A5A40] hover:bg-[#E8EFE9] transition-all duration-300 cursor-pointer text-sm sm:text-base';
      contentOnline.classList.remove('hidden');
      contentPresencial.classList.add('hidden');
    });
  }

  // 6. Interactive Demand Selector ("Como posso te ajudar?")
  const selectorButtons = document.querySelectorAll('.demand-selector-btn');
  const demandCards = document.querySelectorAll('.demand-card');

  selectorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Highlight button
      selectorButtons.forEach(b => {
        b.className = 'demand-selector-btn px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border border-[#E8EFE9] bg-white text-[#57655B] hover:border-[#3A5A40] cursor-pointer';
      });
      btn.className = 'demand-selector-btn px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border border-[#3A5A40] bg-[#3A5A40] text-white shadow-sm cursor-pointer';

      // Filter cards
      demandCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.classList.add('is-visible');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Insurance Reimbursement Modal Controller
  const openModalBtn = document.getElementById('open-reembolso-modal');
  const closeModalBtn = document.getElementById('close-reembolso-modal');
  const reembolsoModal = document.getElementById('reembolso-modal');
  const modalBackdrop = document.getElementById('reembolso-modal-backdrop');

  if (openModalBtn && closeModalBtn && reembolsoModal) {
    const openModal = () => {
      reembolsoModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      reembolsoModal.classList.add('hidden');
      document.body.style.overflow = '';
    };

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !reembolsoModal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

});