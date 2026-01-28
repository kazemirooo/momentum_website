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
    
    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
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
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when you click on link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
});

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.about, .bottom-buttons, article, .usluge-levi, .usluge-desni, .testimonial, form');
  
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
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }
});

// ===== BACK TO TOP BUTTON =====
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  };
  
  window.addEventListener('scroll', throttle(handleScroll, 100));

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ===== PROGRESS BAR =====
window.addEventListener('scroll', throttle(() => {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;
  
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
}, 50));

// ===== LIGHTBOX =====
document.addEventListener('DOMContentLoaded', () => {
  const viewBtns = document.querySelectorAll('.view-btn');
  const lightbox = document.querySelector('.lightbox');
  
  if (!lightbox) return;
  
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.equipment-card');
      const img = card.dataset.image;
      lightbox.querySelector('img').src = img;
      lightbox.classList.add('active');
    });
  });

  const closeBtn = lightbox.querySelector('.close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

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
  
  const removeError = (input) => {
    input.parentElement.querySelector('.error-message')?.remove();
    input.classList.remove('error');
    input.classList.add('success');
  };
  
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
  
  // Event listeners for live validation
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
  datetimeInput.addEventListener('blur', validateDatetime);
  
  nameInput.addEventListener('input', debounce(() => {
    if (nameInput.classList.contains('error')) validateName();
  }, 300));
  
  emailInput.addEventListener('input', debounce(() => {
    if (emailInput.classList.contains('error')) validateEmail();
  }, 300));
  
  phoneInput.addEventListener('input', debounce(() => {
    if (phoneInput.classList.contains('error')) validatePhone();
  }, 300));
  
  // Submit event
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const valid = validateName() && validateEmail() && validatePhone() && validateDatetime();
    
    if (valid) {
      // Encrypt data
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        datetime: datetimeInput.value,
        message: document.getElementById('message').value
      };
      
      const encrypted = encryptFormData(formData);
      console.log('Enkriptovani podaci:', encrypted);
      
      // Success message
      const msg = document.createElement('div');
      msg.className = 'success-message';
      msg.innerHTML = '<h3>✓ Uspešno poslato!</h3><p>Vaš zahtev je primljen. Kontaktiraćemo vas uskoro.</p>';
      form.insertAdjacentElement('beforebegin', msg);
      
      setTimeout(() => {
        form.reset();
        document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
        msg.remove();
      }, 3000);
    } else {
      document.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});