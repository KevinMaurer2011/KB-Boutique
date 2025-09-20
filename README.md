# Boutique - Elegant Fashion Website

A beautiful, responsive static website for a boutique fashion store, designed to be hosted on GitHub Pages.

## 🌟 Features

- **Responsive Design**: Looks great on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, elegant design with smooth animations
- **Interactive Elements**: Mobile navigation, smooth scrolling, form validation
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized CSS and JavaScript for quick page loads
- **GitHub Pages Ready**: Pre-configured for easy deployment

## 🎨 Design Highlights

- Elegant color scheme with gold accents (#d4af37)
- Beautiful typography using Playfair Display and Inter fonts
- Smooth animations and hover effects
- Professional layout with clear sections
- Mobile-first responsive design

## 📁 Project Structure

```
boutique-website/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and responsive design
├── script.js               # JavaScript for interactivity
├── _config.yml             # Jekyll/GitHub Pages configuration
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment workflow
└── README.md               # This file
```

## 🚀 Deployment to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. **Create a new repository** on GitHub
2. **Upload all files** to your repository
3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
4. **Push to main branch** - the site will automatically deploy

### Method 2: Direct GitHub Pages

1. **Create a new repository** on GitHub
2. **Upload all files** to your repository
3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
4. **Save** - your site will be available at `https://yourusername.github.io/repository-name`

## 🛠️ Customization

### Updating Content

1. **Edit `index.html`** to change:
   - Store name and taglines
   - Contact information
   - Collection descriptions
   - About section content

2. **Update `styles.css`** to modify:
   - Color scheme (search for `#d4af37` to change gold color)
   - Fonts and typography
   - Layout and spacing
   - Responsive breakpoints

3. **Modify `script.js`** to add:
   - New interactive features
   - Form handling
   - Additional animations

### Adding Images

Replace the placeholder divs with actual images:

```html
<!-- Replace this -->
<div class="hero-placeholder">
    <i class="fas fa-gem"></i>
    <p>Your Boutique Image</p>
</div>

<!-- With this -->
<img src="images/hero-image.jpg" alt="Boutique Interior" class="hero-image">
```

### Color Customization

To change the main color scheme, update these CSS variables in `styles.css`:

```css
/* Primary gold color */
#d4af37 → your-color

/* Secondary gold color */
#b8860b → your-darker-color
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🎯 SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- Open Graph tags for social sharing
- Structured data for better search visibility
- Fast loading times
- Mobile-friendly design

## 🔧 Technical Details

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No dependencies, fast loading
- **Font Awesome**: Icons (loaded from CDN)
- **Google Fonts**: Typography (Playfair Display, Inter)
- **GitHub Pages**: Jekyll-compatible configuration

## 📞 Support

If you need help customizing or deploying your boutique website:

1. Check the GitHub Pages documentation
2. Review the code comments in each file
3. Test changes locally before deploying
4. Use browser developer tools to debug issues

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Getting Started

1. **Fork or clone** this repository
2. **Customize** the content for your boutique
3. **Add your images** and branding
4. **Deploy** to GitHub Pages
5. **Share** your beautiful boutique website!

---

**Happy coding!** 🛍️✨
