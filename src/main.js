import './style.css';

document.addEventListener('DOMContentLoaded', () => {

  // 1. PRELOADER SPLASH SCREEN
  const preloader = document.getElementById('preloader');
  const preloaderCounter = document.getElementById('preloader-counter');

  if (preloader && preloaderCounter) {
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');

    if (hasSeenPreloader) {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      // Ensure all initial elements are visible immediately
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    } else {
      document.body.style.overflow = 'hidden';
      let progress = 0;
      const duration = 1000; // 1s
      const intervalTime = 20;
      const increment = 100 / (duration / intervalTime);

      const counterInterval = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
          progress = 100;
          clearInterval(counterInterval);
          preloaderCounter.textContent = '100%';

          setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            document.body.style.overflow = '';
            sessionStorage.setItem('hasSeenPreloader', 'true');

            document.querySelectorAll('#inicio .reveal-on-scroll').forEach(el => {
              el.classList.add('is-visible');
            });
          }, 180);
        } else {
          preloaderCounter.textContent = `${Math.floor(progress)}%`;
        }
      }, intervalTime);
    }
  }

  // 2. SCROLL HEADER ELEVATION & MOBILE BOTTOM BAR
  const navbar = document.getElementById('navbar');
  const mobileBottomCta = document.getElementById('mobile-bottom-cta');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        if (scrollY > 20) {
          navbar?.classList.add('shadow-xs', 'border-b', 'border-[#E2EAE4]');
        } else {
          navbar?.classList.remove('shadow-xs', 'border-b', 'border-[#E2EAE4]');
        }

        if (mobileBottomCta) {
          if (scrollY > 300) {
            mobileBottomCta.classList.remove('translate-y-full', 'opacity-0');
            mobileBottomCta.classList.add('translate-y-0', 'opacity-100');
          } else {
            mobileBottomCta.classList.remove('translate-y-0', 'opacity-100');
            mobileBottomCta.classList.add('translate-y-full', 'opacity-0');
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // 3. MOBILE MENU TOGGLE
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    const toggleMenu = () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      mobileMenuBtn.setAttribute('aria-expanded', String(newState));
      mobileMenu.classList.toggle('hidden', !newState);
      
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (newState) {
          icon.className = 'fas fa-times text-lg text-[#3A5A40]';
          document.body.style.overflow = 'hidden';
        } else {
          icon.className = 'fas fa-bars text-lg text-[#3A5A40]';
          document.body.style.overflow = '';
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
        if (icon) icon.className = 'fas fa-bars text-lg text-[#3A5A40]';
      });
    });
  }

  // 4. STAGGERED SCROLL REVEAL (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
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
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 5. FAQ ACCORDION (Accessible keyboard and focus management)
  const accordionButtons = document.querySelectorAll('.faq-accordion-btn');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.accordion-icon');
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close all accordions
      document.querySelectorAll('.accordion-content').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelectorAll('.accordion-icon').forEach(ic => {
        ic.style.transform = 'rotate(0deg)';
      });
      document.querySelectorAll('.faq-accordion-btn').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });

      // Open target if was closed
      if (!isExpanded && content) {
        content.classList.add('active');
        if (icon) icon.style.transform = 'rotate(180deg)';
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 6. MODALITY SWITCHER (Presencial Jundiaí / Online)
  const tabPresencial = document.getElementById('tab-presencial');
  const tabOnline = document.getElementById('tab-online');
  const contentPresencial = document.getElementById('content-presencial');
  const contentOnline = document.getElementById('content-online');

  if (tabPresencial && tabOnline && contentPresencial && contentOnline) {
    const setTab = (activeTab, inactiveTab, showContent, hideContent) => {
      activeTab.className = 'flex-1 py-3 px-5 text-center font-semibold rounded-full bg-[#3A5A40] text-white shadow-xs transition-all duration-200 cursor-pointer text-sm sm:text-base touch-target';
      activeTab.setAttribute('aria-selected', 'true');
      inactiveTab.className = 'flex-1 py-3 px-5 text-center font-semibold rounded-full text-[#3A5A40] hover:bg-[#EBF1EC] transition-all duration-200 cursor-pointer text-sm sm:text-base touch-target';
      inactiveTab.setAttribute('aria-selected', 'false');
      showContent.classList.remove('hidden');
      hideContent.classList.add('hidden');
    };

    tabPresencial.addEventListener('click', () => setTab(tabPresencial, tabOnline, contentPresencial, contentOnline));
    tabOnline.addEventListener('click', () => setTab(tabOnline, tabPresencial, contentOnline, contentPresencial));
  }

  // 7. DEMAND CATEGORY FILTER
  const selectorButtons = document.querySelectorAll('.demand-selector-btn');
  const demandCards = document.querySelectorAll('.demand-card');

  selectorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      selectorButtons.forEach(b => {
        b.className = 'demand-selector-btn px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border border-[#E2EAE4] bg-white text-[#536257] hover:border-[#3A5A40] cursor-pointer touch-target';
        b.setAttribute('aria-pressed', 'false');
      });
      btn.className = 'demand-selector-btn px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border border-[#3A5A40] bg-[#3A5A40] text-white shadow-xs cursor-pointer touch-target';
      btn.setAttribute('aria-pressed', 'true');

      demandCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
          card.classList.add('flex', 'is-visible');
        } else {
          card.classList.add('hidden');
          card.classList.remove('flex');
        }
      });
    });
  });

});