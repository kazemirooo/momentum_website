# Momentum Salon Website

A modern, responsive website for Momentum massage and beauty salon, featuring bilingual support (Serbian/English) and comprehensive service information.

## 🌟 Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Bilingual Support** - Full Serbian and English language versions
- **Sticky Navigation** - Smooth scrolling with dynamic navbar effects
- **Contact Form** - JavaScript validation with live feedback and working hours enforcement
- **Service Catalog** - Detailed massage services, equipment treatments and packages
- **Modern UI** - Blurred shapes background, glassmorphism cards, Cormorant Garamond typography
- **Scroll Animations** - Fade-in effects on cards via Intersection Observer
- **Progress Bar** - Reading progress indicator on scroll
- **Back to Top** - Floating button for quick navigation

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, Grid/Flexbox, glassmorphism effects
- **JavaScript (ES Modules)** - Form validation, scroll effects, date/time picker logic
- **Google Fonts** - Cormorant Garamond + DM Sans
- **Git** - Version control

## 📁 Project Structure

```
momentum_website/
├── index.html                  # Serbian homepage
├── README.md
├── assets/
│   ├── logo/
│   │   └── logo.png            # Salon logo
│   ├── icons/
│   │   ├── uk-flag.png         # English language switcher
│   │   └── rs-flag.png         # Serbian language switcher
│   └── photos/
│       ├── salon1.jpg
│       ├── salon2.jpg
│       ├── salon3.jpg
│       ├── salon4.jpg
│       └── salon5.jpg
├── pages/
│   ├── index_en.html           # English homepage
│   ├── usluge.html             # Services (SR)
│   ├── services_en.html        # Services (EN)
│   ├── masaza.html             # Massage (SR)
│   ├── massage_en.html         # Massage (EN)
│   ├── paketi_masaza.html      # Packages (SR)
│   ├── packages_en.html        # Packages (EN)
│   ├── aparati.html            # Equipment treatments (SR)
│   ├── equipment_en.html       # Equipment treatments (EN)
│   ├── kuponi.html             # Gift coupons (SR)
│   ├── coupons_en.html         # Gift coupons (EN)
│   ├── kontakt.html            # Contact & booking (SR)
│   └── contact_en.html         # Contact & booking (EN)
├── styles/
│   └── styles.css              # Main stylesheet
└── js/
    ├── scripts.js              # Main JS — scroll, navbar, form validation, date picker
    └── helper.js               # Utility functions (email, phone, name validation etc.)
```

## 🎨 Design

### Color Palette
- **Pink Light:** `#ffc8d9`
- **Pink Mid:** `#ffb6c9`
- **Pink Dark:** `#ff9db5`
- **Brown Primary:** `#4a2e2e`
- **Brown Light:** `#6b4444`
- **Background:** `#fff9fb`

### Typography
- **Display / Headings:** Cormorant Garamond (serif)
- **Body:** DM Sans (sans-serif)

### Key Design Elements
- Animated blurred shapes background (fixed, CSS keyframes)
- Glassmorphism cards (`backdrop-filter: blur`)
- Sticky navbar with scroll effects
- Dropdown menus with slide-down animation
- Highlighted contact button
- Language switcher with flag icons
- FAQ accordion
- Stats bar with key numbers
- Review/rating section
- CTA section before footer

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- VS Code with **Live Server** extension (required for local development)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kazemirooo/momentum_website.git
```

2. Navigate to the project directory:
```bash
cd momentum_website
```

3. Open with Live Server in VS Code (required — direct file:// access blocks ES modules)

### Development Notes

- Always use **Live Server** locally — `type="module"` scripts are blocked by CORS on `file://` protocol
- Edit HTML files in root (SR homepage) and `pages/` directory
- All styles are in `styles/styles.css` — no inline styles
- JS is split into `scripts.js` (main) and `helper.js` (utilities)
- Hard refresh with **Ctrl+Shift+R** after CSS changes

## 📋 Features Breakdown

### Navigation
- Responsive navbar with hamburger menu on mobile
- Sticky positioning with scroll-triggered background change
- Dropdown submenu for services
- Language switcher (SR ↔ EN)
- Highlighted contact button

### Contact Form & Booking
- Real-time input validation (name, email, phone)
- Separate date + time dropdowns (not datetime-local)
- Working hours enforcement: Mon–Fri 17:00–22:00, Sat–Sun 12:00–22:00
- Time slots in 30-minute intervals
- Past date prevention
- Success/error feedback messages

### Animations & Effects
- Hero section fade-up entrance animations
- Blurred shapes float animation
- Scroll-triggered card fade-in (Intersection Observer)
- Smooth dropdown slide-down
- Hover lift effects on cards and buttons
- Scroll progress bar at top of page

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari, Chrome Mobile

## 📱 Responsive Breakpoints

- **Desktop:** > 768px
- **Mobile:** ≤ 768px
- **Small mobile:** ≤ 480px

## 🔧 Customization

### Changing Colors
Edit CSS variables in `styles/styles.css`:
```css
:root {
    --pink-light: #ffc8d9;
    --pink-mid:   #ffb6c9;
    --pink-dark:  #ff9db5;
    --brown:      #4a2e2e;
    --brown-light:#6b4444;
}
```

### Changing Fonts
Replace the Google Fonts link in each HTML file and update `font-family` in `styles.css`.

### Adding New Pages
1. Create HTML file in `pages/` directory
2. Add Google Fonts `<link>` in `<head>`
3. Add `.bg-shapes` div after `<body>` tag
4. Add navigation link in all existing pages
5. Create both SR and EN versions
6. Update language switcher links

## 📝 Planned Enhancements

- [ ] Backend integration for contact form (in progress)
- [ ] Online booking system with calendar
- [ ] Database for appointments
- [ ] Payment gateway for gift coupons
- [ ] Admin dashboard
- [ ] Photo gallery with lightbox
- [ ] Customer reviews system
- [ ] Cookie/GDPR consent banner
- [ ] 404 custom page
- [ ] Scroll-triggered animations on all pages

## 👤 Author

Filip Krstić
- GitHub: [@kazemirooo](https://github.com/kazemiroo)
- Website: [momentumnis.com](https://momentumnis.com)

---

Made with ❤️ for Momentum Salon, Niš