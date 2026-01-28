// ===== helper.js =====

// Email validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Phone validation
const isValidPhone = (phone) => {
  return /^[0-9+\-\s()]+$/.test(phone) && phone.replace(/[^0-9]/g, '').length >= 9;
};

// Validation of name
const isValidName = (name) => {
  return /^[a-zA-ZčćžšđČĆŽŠĐ\s]+$/.test(name);
};

// Check if data is in the past
const isDateInPast = (dateString) => {
  return new Date(dateString) < new Date();
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('sr-RS', options);
};

// Smooth scroll to element
const scrollToElement = (element, offset = 0) => {
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Sanitize input 
const sanitizeInput = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// Checks if element is visible in viewport-u
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Get URL parameter
const getURLParameter = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

// Set URL parameter without reload-a
const setURLParameter = (name, value) => {
  const url = new URL(window.location);
  url.searchParams.set(name, value);
  window.history.pushState({}, '', url);
};

// Local storage with expiry
const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  
  const item = JSON.parse(itemStr);
  const now = new Date();
  
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

// Export function
export {
  isValidEmail,
  isValidPhone,
  isValidName,
  isDateInPast,
  formatDate,
  scrollToElement,
  debounce,
  throttle,
  sanitizeInput,
  isInViewport,
  getURLParameter,
  setURLParameter,
  setWithExpiry,
  getWithExpiry
};