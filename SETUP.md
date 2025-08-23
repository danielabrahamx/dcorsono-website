# D'Corsono Website Setup Guide

## 🚀 Quick Start (Demo Version)

You can view the website immediately by opening `index.html` in your web browser!

1. **Open the website**: Double-click `index.html` or right-click and select "Open with" → your preferred browser
2. **Explore**: Navigate through all sections using the navigation menu
3. **Demo Features**: 
   - View the liquid glass aesthetic with black and gold theme
   - Explore the Corsono clothing collection
   - Navigate through different facets of consciousness
   - Test the responsive design on different screen sizes

## 🛠️ Full Backend Setup (Optional)

To run the complete website with backend functionality, e-commerce, and database:

### Prerequisites
- **Rust** (1.70+) - [Install from rustup.rs](https://rustup.rs/)
- **PostgreSQL** (13+) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

### Installation Steps

1. **Install Rust**
   ```bash
   # Windows (PowerShell)
   winget install Rustlang.Rust.MSVC
   # Or visit https://rustup.rs/
   ```

2. **Install PostgreSQL**
   - Download from [postgresql.org](https://www.postgresql.org/download/)
   - Install with default settings
   - Remember your password!

3. **Set up the database**
   ```bash
   # Create database
   createdb dcorsono
   
   # Install SQLx CLI
   cargo install sqlx-cli
   
   # Run migrations
   sqlx migrate run
   ```

4. **Configure environment**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost/dcorsono
   JWT_SECRET=your-super-secret-jwt-key-here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   RUST_LOG=info
   ```

5. **Run the server**
   ```bash
   cargo run
   ```

6. **Access the website**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
DCorsono/
├── index.html              # Demo version (open this first!)
├── src/                    # Rust backend source code
│   ├── main.rs            # Server entry point
│   ├── models/            # Database models
│   ├── handlers/          # API endpoint handlers
│   ├── routes/            # Route definitions
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
├── static/                 # Frontend assets
│   ├── css/               # Stylesheets
│   │   ├── main.css       # Main styles
│   │   └── components.css # Component styles
│   └── js/                # JavaScript files
│       └── main.js        # Main functionality
├── templates/              # HTML templates (for backend)
├── migrations/             # Database migrations
├── Cargo.toml              # Rust dependencies
├── README.md               # Detailed documentation
└── SETUP.md               # This file
```

## 🎨 Features Implemented

### Frontend (Demo Version)
- ✅ Liquid glass aesthetic with black and gold theme
- ✅ Responsive design for all devices
- ✅ Interactive navigation and smooth scrolling
- ✅ Hero sections with animated consciousness symbols
- ✅ Product showcase with filtering
- ✅ Blog preview with categorized content
- ✅ Newsletter subscription form
- ✅ Contact information and social links

### Backend (Full Version)
- ✅ Rust server with Axum framework
- ✅ PostgreSQL database with SQLx
- ✅ User authentication with JWT
- ✅ E-commerce functionality (products, cart, orders)
- ✅ Blog system with categories
- ✅ Stripe payment integration
- ✅ Newsletter management
- ✅ RESTful API endpoints

## 🔧 Customization

### Colors and Theme
Edit `static/css/main.css` and modify the CSS variables:
```css
:root {
    --color-primary: #000000;      /* Main black */
    --color-secondary: #FFD700;    /* Gold accent */
    --color-accent: #B8860B;       /* Darker gold */
    /* ... other variables */
}
```

### Content
- **Products**: Update the sample products in the JavaScript code
- **Blog Posts**: Modify the blog content in the HTML
- **Contact Info**: Update email addresses and links
- **Branding**: Change logos, names, and descriptions

### Images
Replace placeholder images with your actual product photos:
- Product images: `static/images/products/`
- Blog images: `static/images/blog/`
- Brand assets: `static/images/brand/`

## 🌐 Deployment

### Static Hosting (Demo Version)
- Upload all files to any web hosting service
- Works with GitHub Pages, Netlify, Vercel, etc.
- No backend required for basic functionality

### Full Deployment (Backend + Frontend)
- Deploy Rust backend to a VPS or cloud service
- Set up PostgreSQL database
- Configure environment variables
- Set up domain and SSL certificates

## 🆘 Troubleshooting

### Demo Version Issues
- **Page not loading**: Ensure all CSS and JS files are in the correct folders
- **Styles not working**: Check browser console for CSS loading errors
- **JavaScript errors**: Verify `static/js/main.js` is accessible

### Backend Issues
- **Database connection**: Check PostgreSQL is running and credentials are correct
- **Rust compilation**: Ensure Rust is properly installed with `rustc --version`
- **Port conflicts**: Change port in `src/main.rs` if 3000 is busy

## 📞 Support

For questions or issues:
- **Email**: danielftabraham@outlook.com
- **Sibrox Email**: daniel@sibrox.com
- **Documentation**: Check `README.md` for detailed information

## 🎯 Next Steps

1. **Start with the demo**: Open `index.html` to see the website in action
2. **Customize content**: Update text, images, and branding
3. **Set up backend** (optional): Install Rust and PostgreSQL for full functionality
4. **Deploy**: Choose hosting option based on your needs

---

**Enjoy exploring D'Corsono!** 🌟

The website embodies the philosophy that consciousness is an act, not a state of being. Each section represents a different manifestation of that principle through clothing, technology, wisdom, and mastery.


