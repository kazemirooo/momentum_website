// ===== scripts.js =====

import { isValidEmail, isValidPhone, isValidName, isDateInPast, debounce, throttle } from './helper.js';
import { encryptFormData } from './crypto.js';

// ===== STICKY HEADER =====
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    // Add 'scrolled' class when user scrolls past 100px
    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Hide nav when scrolling down, show when scrolling up
    if (currentScroll > lastScroll && currentScroll > 300) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', throttle(handleScroll, 100));
});

// ===== HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  // Toggle menu open/close on hamburger click
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when any nav link is clicked
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
});

// ===== SCROLL FADE-IN + STAGGER =====
document.addEventListener('DOMContentLoaded', () => {
  // Elements that fade in one by one when scrolled into view
  const staggerSelectors = '.usluge-card, .paket-card, .faq-item, .service-card, .about, .bottom-buttons, article, .usluge-levi, .usluge-desni, form, .info-card, .mapa-card, .review-section, .cta-section, .stats-bar, .paketi-cta, .usluge-cta';
  const staggerEls = document.querySelectorAll(staggerSelectors);

  // Set initial hidden state and stagger delay for sibling elements
  staggerEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    // Stagger siblings in the same parent (cards in a grid)
    const siblings = Array.from(el.parentElement.children).filter(c =>
      c.matches(staggerSelectors)
    );
    const siblingIndex = siblings.indexOf(el);
    if (siblingIndex > 0) {
      el.style.transitionDelay = `${siblingIndex * 0.15}s`;
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  staggerEls.forEach(el => observer.observe(el));

  // Also fade in section titles
  document.querySelectorAll('.section-title, .usluge-hero, .page-hero, .faq-section h2, .paketi-section h2').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
});

// ===== TYPING EFFECT (index.html only) =====
document.addEventListener('DOMContentLoaded', () => {
  const motoEl = document.querySelector('.hero .moto');
  if (!motoEl) return;

  const originalText = motoEl.textContent.trim();

  // Only run typing effect if we're on the homepage (has hero-eyebrow)
  if (!document.querySelector('.hero-eyebrow')) return;

  const phrases = [
    originalText,
    'Opuštanje, lepota i balans tela.',
    'Profesionalni tretmani u srcu Niša.'
  ];

  // Clear original text and set up typing element
  motoEl.textContent = '';
  motoEl.style.opacity = '1';
  motoEl.style.animation = 'none';

  const typingEl = document.createElement('span');
  typingEl.style.borderRight = '2px solid var(--pink-dark)';
  typingEl.style.paddingRight = '4px';
  typingEl.style.animation = 'blink 0.8s step-end infinite';
  motoEl.appendChild(typingEl);

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 70;

    if (!isDeleting && charIndex === current.length) {
      speed = 2500; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  // Start typing after hero entrance animation finishes
  setTimeout(type, 1400);
});

// ===== PAGE TRANSITIONS =====
document.addEventListener('DOMContentLoaded', () => {
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.id = 'page-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: var(--pink-light);
    z-index: 9999;
    transform: translateY(-100%);
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    pointer-events: none;
  `;
  document.body.appendChild(overlay);

  // Slide overlay out on page load (slide up and away)
  requestAnimationFrame(() => {
    overlay.style.transform = 'translateY(-100%)';
  });

  // Intercept all internal link clicks
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    // Skip anchors, external links, and language switcher
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto')) return;
    if (link.classList.contains('language-switcher')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const destination = link.href;

      // Slide overlay in from bottom
      overlay.style.transform = 'translateY(0)';

      // Navigate after animation completes
      setTimeout(() => {
        window.location.href = destination;
      }, 500);
    });
  });

  // On page load, slide overlay out
  window.addEventListener('pageshow', () => {
    setTimeout(() => {
      overlay.style.transform = 'translateY(-100%)';
    }, 50);
  });
});

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    // Hide loader 500ms after page fully loads
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }
});

// ===== BACK TO TOP BUTTON =====
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  // Show button when user scrolls past 300px
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  };

  window.addEventListener('scroll', throttle(handleScroll, 100));

  // Scroll smoothly to top on button click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ===== PROGRESS BAR =====
window.addEventListener('scroll', throttle(() => {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;

  // Calculate scroll percentage and update progress bar width
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
}, 50));

// ===== LIGHTBOX =====
document.addEventListener('DOMContentLoaded', () => {
  const viewBtns = document.querySelectorAll('.view-btn');
  const lightbox = document.querySelector('.lightbox');

  if (!lightbox) return;

  // Open lightbox with the clicked equipment card image
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.equipment-card');
      const img = card.dataset.image;
      lightbox.querySelector('img').src = img;
      lightbox.classList.add('active');
    });
  });

  // Close lightbox on close button click
  const closeBtn = lightbox.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
});

// ===== FORM VALIDATION =====
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const datetimeInput = document.getElementById('datetime'); // null on kontakt page

  if (!nameInput || !emailInput || !phoneInput) return;

  // Show error message below input
  const showError = (input, msg) => {
    const div = input.parentElement;
    div.querySelector('.error-message')?.remove();
    input.classList.add('error');
    input.classList.remove('success');
    const err = document.createElement('div');
    err.className = 'error-message';
    err.textContent = msg;
    div.appendChild(err);
  };

  // Remove error and mark input as valid
  const removeError = (input) => {
    input.parentElement.querySelector('.error-message')?.remove();
    input.classList.remove('error');
    input.classList.add('success');
  };

  // Validate name field
  const validateName = () => {
    const val = nameInput.value.trim();
    if (!val) {
      showError(nameInput, 'Ime i prezime je obavezno');
      return false;
    }
    if (val.length < 3) {
      showError(nameInput, 'Ime mora imati najmanje 3 karaktera');
      return false;
    }
    if (!isValidName(val)) {
      showError(nameInput, 'Ime može sadržati samo slova');
      return false;
    }
    removeError(nameInput);
    return true;
  };

  // Validate email field
  const validateEmail = () => {
    const val = emailInput.value.trim();
    if (!val) {
      showError(emailInput, 'Email je obavezan');
      return false;
    }
    if (!isValidEmail(val)) {
      showError(emailInput, 'Unesite validan email');
      return false;
    }
    removeError(emailInput);
    return true;
  };

  // Validate phone field
  const validatePhone = () => {
    const val = phoneInput.value.trim();
    if (!val) {
      showError(phoneInput, 'Broj telefona je obavezan');
      return false;
    }
    if (!isValidPhone(val)) {
      showError(phoneInput, 'Unesite validan broj telefona');
      return false;
    }
    removeError(phoneInput);
    return true;
  };

  // Validate datetime field — only if it exists on the page
  const validateDatetime = () => {
    if (!datetimeInput) return true;
    const val = datetimeInput.value;
    if (!val) {
      showError(datetimeInput, 'Molimo izaberite željeni termin');
      return false;
    }
    if (isDateInPast(val)) {
      showError(datetimeInput, 'Ne možete izabrati prošli termin');
      return false;
    }
    removeError(datetimeInput);
    return true;
  };

  // Live validation on blur (when user leaves the field)
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
  datetimeInput?.addEventListener('blur', validateDatetime);

  // Re-validate on input if field already has an error (debounced)
  nameInput.addEventListener('input', debounce(() => {
    if (nameInput.classList.contains('error')) validateName();
  }, 300));

  emailInput.addEventListener('input', debounce(() => {
    if (emailInput.classList.contains('error')) validateEmail();
  }, 300));

  phoneInput.addEventListener('input', debounce(() => {
    if (phoneInput.classList.contains('error')) validatePhone();
  }, 300));

  // ===== FORM SUBMIT =====
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Run all validations before submitting
    const valid = validateName() && validateEmail() && validatePhone() && validateDatetime();

    if (valid) {
      // Encrypt form data before sending
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        datetime: datetimeInput?.value,
        message: document.getElementById('message').value
      };

      const encrypted = encryptFormData(formData);
      console.log('Encrypted data:', encrypted);

      // Convert FormData to JSON object
      const data = new FormData(form);
      const jsonData = {};
      data.forEach((value, key) => {
        jsonData[key] = value;
      });

      // Send POST request to local server using Fetch API
      try {
        const response = await fetch('http://localhost:8080', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });

        // Throw error if response is not OK
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        console.log('Data sent successfully:', jsonData);

        // Show success message to user
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.innerHTML = '<h3>✓ Uspešno poslato!</h3><p>Vaš zahtev je primljen. Kontaktiraćemo vas uskoro.</p>';
        form.insertAdjacentElement('beforebegin', msg);

        // Reset form and remove success message after 3 seconds
        setTimeout(() => {
          form.reset();
          document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
          msg.remove();
        }, 3000);

      } catch (error) {
        console.error('Fetch error:', error.message);
      }

    } else {
      // Scroll to first error if validation fails
      document.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// ===== DATE / TIME DROPDOWN =====
document.addEventListener('DOMContentLoaded', () => {
  const datumInput = document.getElementById('datum');
  const vremeSelect = document.getElementById('vreme');
  if (!datumInput || !vremeSelect) return;

  const pad = n => String(n).padStart(2, '0');

  // Set minimum date to today
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;
  datumInput.min = todayStr;

  const populateVreme = (dateStr) => {
    vremeSelect.innerHTML = '<option value="">— Izaberite vreme —</option>';
    if (!dateStr) return;
    const isWeekend = [0, 6].includes(new Date(dateStr + 'T12:00:00').getDay());
    const startHour = isWeekend ? 12 : 17;
    for (let h = startHour; h <= 22; h++) {
      const mins = h < 22 ? [':00', ':30'] : [':00'];
      mins.forEach(min => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = `${pad(h)}${min}`;
        vremeSelect.appendChild(opt);
      });
    }
  };

  datumInput.addEventListener('change', () => {
    const selected = datumInput.value;

    // Block past dates
    if (selected < todayStr) {
      datumInput.value = '';
      vremeSelect.innerHTML = '<option value="">— Izaberite vreme —</option>';
      return;
    }

    populateVreme(selected);
  });
});
// ===== MARK TOP LEVEL NAV LINKS =====
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        if (link.closest('ul ul')) return;
        link.classList.add('nav-top-link');
    });
});
// ===== CORNER HALFTONE =====
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    ['corner-bl', 'corner-br'].forEach(cls => {
        const div = document.createElement('div');
        div.className = cls;
        nav.appendChild(div);
    });
});