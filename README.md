# Momentum Salon Website

A modern, responsive website for Momentum massage and beauty salon, featuring bilingual support (Serbian/English) and comprehensive service information.

## 🌟 Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Bilingual Support** - Full Serbian and English language versions
- **Sticky Navigation** - Smooth scrolling with dynamic navbar effects
- **Contact Form** - JavaScript validation with live feedback
- **Service Catalog** - Detailed massage services and packages
- **Modern UI** - Clean design with hover effects and animations

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with variables, animations, and Grid/Flexbox
- **JavaScript** - Form validation and interactive features
- **Git** - Version control

## 📁 Project Structure

```
momentum_website/
├── index.html              # Serbian homepage
├── assets/
│   ├── logo/
│   │   └── logo.png       # Salon logo
│   ├── icons/
│   │   ├── uk-flag.png    # English language switcher
│   │   └── rs-flag.png    # Serbian language switcher
│   └── photos/
│       └── aparat*.jpg    # Equipment images
├── pages/
    ├── index_en.html      # English homepage
│   ├── usluge.html        # Services (SR)
│   ├── services_en.html   # Services (EN)
│   ├── kontakt.html       # Contact (SR)
│   ├── contact_en.html    # Contact (EN)
│   ├── aparati.html       # Equipment (SR)
│   ├── equipment_en.html  # Equipment (EN)
│   ├── kuponi.html        # Coupons (SR)
│   ├── coupons_en.html    # Coupons (EN)
│   ├── masaza.html        # Massage (SR)
│   ├── massage_en.html    # Massage (EN)
│   ├── paketi_masaza.html # Packages (SR)
│   └── packages_en.html   # Packages (EN)
├── styles/
│   └── styles.css         # Main stylesheet
├── scripts/
│   └── script.js          # JavaScript functionality
└── README.md
```

## 🎨 Design Features

### Color Palette
- **Primary Pink (Light):** `#ffc8d9`
- **Primary Pink (Mid):** `#ffb6c9`
- **Primary Pink (Dark):** `#ff9db5`
- **Brown (Primary):** `#4a2e2e`
- **Brown (Light):** `#6b4444`
- **Background:** `#fff5f8`

### Key Components
- Fixed navbar with scroll effects
- Dropdown menus with smooth animations
- Highlighted contact button
- Interactive hover effects on cards and buttons
- Language switcher with flag icons

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Git (optional, for version control)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kazemirooo/momentum_website.git
```

2. Navigate to the project directory:
```bash
cd momentum_website
```

3. Open `index.html` in your web browser

### Development

To modify the website:

1. Edit HTML files in root and `pages/` directory
2. Modify styles in `styles/styles.css`
3. Update JavaScript in `scripts/script.js`
4. Test changes in browser (use Ctrl+Shift+R for hard refresh)

## 📋 Features Breakdown

### Navigation
- Responsive navbar with hamburger menu on mobile
- Sticky positioning with scroll effects
- Dropdown menus for services
- Language switcher (SR ↔ EN)
- Highlighted contact button

### Form Validation
- Real-time input validation
- Custom error messages in Serbian/English
- Success confirmation after submission
- Prevents submission of invalid data

### Animations
- Smooth dropdown slide-down effects
- Hover animations on buttons and cards
- Scroll-triggered navbar changes
- Transform effects on interactive elements

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop:** > 768px
- **Tablet:** 480px - 768px
- **Mobile:** < 480px

## 🔧 Customization

### Changing Colors
Edit CSS variables in `styles/styles.css`:
```css
:root {
  --pink-light: #ffc8d9;
  --pink-mid: #ffb6c9;
  --pink-dark: #ff9db5;
  --brown: #4a2e2e;
  --brown-light: #6b4444;
  --bg-light: #fff5f8;
}
```

### Modifying Services
Update service lists in:
- `pages/usluge.html` (Serbian)
- `pages/services_en.html` (English)

### Adding New Pages
1. Create HTML file in appropriate directory
2. Add navigation link in all existing pages
3. Create both Serbian and English versions
4. Update language switcher links

## 📝 Future Enhancements

- [ ] Backend integration (PHP/Node.js)
- [ ] Database for appointments
- [ ] Online booking system
- [ ] Payment gateway for coupons
- [ ] Admin dashboard
- [ ] Blog section
- [ ] Customer reviews system
- [ ] Photo gallery with lightbox

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@kazemirooo](https://github.com/kazemiroo)
- Website: Cooming soon

## 🙏 Acknowledgments

- Design inspiration from modern spa and wellness websites
- Icons from Flaticon/Font Awesome
- Color palette inspired by wellness and relaxation themes

---

Made with ❤️ for Momentum Salon
