// ===== scripts.js - Event Listeners =====

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

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
  // Select all elements that should animate on scroll
  const elements = document.querySelectorAll('.about, .bottom-buttons, article, .usluge-levi, .usluge-desni, .testimonial, form');

  // Use IntersectionObserver to trigger animation when element enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
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
  const datetimeInput = document.getElementById('datetime');

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

  // Validate datetime field
  const validateDatetime = () => {
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
  datetimeInput.addEventListener('blur', validateDatetime);

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
        datetime: datetimeInput.value,
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

      // Send POST request to local server using Fetch API (MDN pattern)
      try {
        const response = await fetch('http://localhost:8080', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });

        // Throw error if response is not OK (e.g. 404, 500)
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
        // Log any network or server errors
        console.error('Fetch error:', error.message);
      }

    } else {
      // Scroll to first error if validation fails
      document.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});