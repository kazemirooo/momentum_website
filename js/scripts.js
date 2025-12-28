document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('nav');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
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
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  
  if (!form) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const datetimeInput = document.getElementById('datetime');
  
  function showError(input, message) {
    const formDiv = input.parentElement;
    
    const existingError = formDiv.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    input.classList.add('error');
    input.classList.remove('success');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formDiv.appendChild(errorDiv);
  }
  
  function removeError(input) {
    const formDiv = input.parentElement;
    const errorMessage = formDiv.querySelector('.error-message');
    
    if (errorMessage) {
      errorMessage.remove();
    }
    
    input.classList.remove('error');
    input.classList.add('success');
  }
  
  function validateName() {
    const nameValue = nameInput.value.trim();
    
    if (nameValue === '') {
      showError(nameInput, 'Ime i prezime je obavezno');
      return false;
    } else if (nameValue.length < 3) {
      showError(nameInput, 'Ime mora imati najmanje 3 karaktera');
      return false;
    } else if (!/^[a-zA-ZčćžšđČĆŽŠĐ\s]+$/.test(nameValue)) {
      showError(nameInput, 'Ime može sadržati samo slova');
      return false;
    } else {
      removeError(nameInput);
      return true;
    }
  }
  
  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailValue === '') {
      showError(emailInput, 'Email je obavezan');
      return false;
    } else if (!emailPattern.test(emailValue)) {
      showError(emailInput, 'Unesite validan email (npr. ime@primer.com)');
      return false;
    } else {
      removeError(emailInput);
      return true;
    }
  }
  
  function validatePhone() {
    const phoneValue = phoneInput.value.trim();
    const phonePattern = /^[0-9+\-\s()]+$/;
    
    if (phoneValue === '') {
      showError(phoneInput, 'Broj telefona je obavezan');
      return false;
    } else if (!phonePattern.test(phoneValue) || phoneValue.replace(/[^0-9]/g, '').length < 9) {
      showError(phoneInput, 'Unesite validan broj telefona');
      return false;
    } else {
      removeError(phoneInput);
      return true;
    }
  }
  
  function validateDatetime() {
    const datetimeValue = datetimeInput.value;
    
    if (datetimeValue === '') {
      showError(datetimeInput, 'Molimo izaberite željeni termin');
      return false;
    }
    
    const selectedDate = new Date(datetimeValue);
    const now = new Date();
    
    if (selectedDate < now) {
      showError(datetimeInput, 'Ne možete izabrati prošli termin');
      return false;
    }
    
    removeError(datetimeInput);
    return true;
  }
  
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', validatePhone);
  datetimeInput.addEventListener('blur', validateDatetime);
  
  nameInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
      validateName();
    }
  });
  
  emailInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
      validateEmail();
    }
  });
  
  phoneInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
      validatePhone();
    }
  });
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isDatetimeValid = validateDatetime();
    
    if (isNameValid && isEmailValid && isPhoneValid && isDatetimeValid) {
  
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <h3>✓ Uspešno poslato!</h3>
        <p>Vaš zahtev je primljen. Kontaktiraćemo vas uskoro.</p>
      `;
      
      form.insertAdjacentElement('beforebegin', successMessage);
      
      setTimeout(function() {
        form.reset();
        document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
        successMessage.remove();
      }, 3000);
    } else {

      const firstError = document.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
});