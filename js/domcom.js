// ===== domcom.js =====

// Navbar component
const createNavbar = (language = 'sr') => {
  const navData = {
    sr: {
      services: 'Usluge',
      massage: 'Masaža',
      packages: 'Paketi masaža',
      equipment: 'Aparati',
      coupons: 'Kuponi',
      contact: 'Kontakt',
      langAlt: 'English'
    },
    en: {
      services: 'Services',
      massage: 'Massage',
      packages: 'Packages',
      equipment: 'Equipment',
      coupons: 'Coupons',
      contact: 'Contact',
      langAlt: 'Serbian'
    }
  };

  const data = navData[language];
  const isEnglish = language === 'en';
  const prefix = isEnglish ? '' : '';
  const suffix = isEnglish ? '_en' : '';

  return `
    <nav>
      <div class="container">
        <a href="${prefix}index${suffix}.html">
          <img src="${prefix}assets/logo/logo.png" alt="Momentum">
        </a>

        <ul class="nav-menu">
          <li>
            <a href="${prefix}pages/services${suffix}.html">${data.services}</a>
            <ul>
              <li><a href="${prefix}pages/massage${suffix}.html">${data.massage}</a></li>
              <li><a href="${prefix}pages/packages${suffix}.html">${data.packages}</a></li>
            </ul>
          </li>
          <li><a href="${prefix}pages/equipment${suffix}.html">${data.equipment}</a></li>
          <li><a href="${prefix}pages/coupons${suffix}.html">${data.coupons}</a></li>
          <li><a class="kontakt-link" href="${prefix}pages/contact${suffix}.html">${data.contact}</a></li>
          <li>
            <a href="${isEnglish ? 'index.html' : 'index_en.html'}" class="language-switcher">
              <img src="${prefix}assets/icons/${isEnglish ? 'rs' : 'uk'}-flag.png" alt="${data.langAlt}">
            </a>
          </li>
        </ul>

        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  `;
};

// Footer component
const createFooter = (language = 'sr') => {
  const footerData = {
    sr: {
      contact: 'Kontakt',
      hours: 'Radno vreme',
      rights: '© 2025 Momentum. Sva prava zadržana.',
      follow: 'Pratite nas'
    },
    en: {
      contact: 'Contact',
      hours: 'Working Hours',
      rights: '© 2025 Momentum. All rights reserved.',
      follow: 'Follow Us'
    }
  };

  const data = footerData[language];

  return `
    <footer>
      <section>
        <h3>Momentum</h3>
      </section>

      <section>
        <h4>${data.contact}</h4>
      </section>

      <section>
        <h5>${data.hours}</h5>
      </section>

      <section class="social-media">
        <h4>${data.follow}</h4>
        <div class="social-icons">
          <a href="https://facebook.com" target="_blank">📘</a>
          <a href="https://instagram.com" target="_blank">📸</a>
          <a href="https://tiktok.com" target="_blank">🎵</a>
        </div>
      </section>

      <section>
        <p>${data.rights}</p>
      </section>
    </footer>
  `;
};

// Loader component
const createLoader = () => {
  return `
    <div class="loader">
      <div class="spinner"></div>
    </div>
  `;
};

// Progress bar component
const createProgressBar = () => {
  return `<div class="progress-bar"></div>`;
};

// Back to top component
const createBackToTop = () => {
  return `<button id="back-to-top" class="back-to-top">↑</button>`;
};

// Lightbox component
const createLightbox = () => {
  return `
    <div class="lightbox">
      <span class="close">&times;</span>
      <img src="" alt="">
    </div>
  `;
};

// Render component
const renderComponent = (component, targetSelector) => {
  const target = document.querySelector(targetSelector);
  if (target) {
    target.innerHTML = component;
  }
};

// Export function
export {
  createNavbar,
  createFooter,
  createLoader,
  createProgressBar,
  createBackToTop,
  createLightbox,
  renderComponent
};