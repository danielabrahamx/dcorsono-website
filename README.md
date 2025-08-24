# D'Corsono - Personal Brand & E-commerce Website

A unique personal brand and e-commerce website that seamlessly integrates diverse facets of identity: clothing brand (Corsono), tech startup (Sibrox), occult science exploration, psychic identity, and Muay Thai training. Built with Rust backend and modern frontend technologies.

## 🌟 Project Overview

D'Corsono represents consciousness as an "act" rather than a static state, drawing inspiration from Hatsu in Hunter x Hunter. The website embodies this philosophy through its liquid glass UI/UX aesthetic, emphasizing black and gold colors for the Corsono brand elements.

### Core Sections

- **Corsono Clothing Brand** - Quiet luxury e-commerce with black and gold aesthetic
- **Sibrox Tech Startup** - Blockchain insurance innovation showcase
- **Occult Science** - Ancient wisdom from alchemy, Gnosticism, and Kemetic spirituality
- **Muay Thai Training** - Martial arts technique and personal training services
- **Inner Library** - AI-generated visual experiences representing imagination
- **Blog** - Intersections of technology, consciousness, and ancient wisdom

## 🚀 Features

- **Modern E-commerce** - Custom shopping cart, Stripe integration, product management
- **Responsive Design** - Liquid glass aesthetic optimized for all devices
- **Blog System** - Categorized content with filtering capabilities
- **User Authentication** - Secure login/registration with JWT tokens
- **Newsletter Subscription** - Email marketing integration
- **Performance Optimized** - Fast loading, lazy loading, and caching
- **SEO Ready** - Meta tags, structured data, and accessibility features

## 🛠️ Technology Stack

### Backend
- **Rust** - High-performance, memory-safe language
- **Axum** - Modern web framework for Rust
- **SQLx** - Async SQL toolkit with PostgreSQL
- **Tokio** - Async runtime for Rust
- **Stripe** - Payment processing integration

### Frontend
- **HTML5** - Semantic markup with accessibility
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript** - ES6+ with modern browser APIs
- **Responsive Design** - Mobile-first approach

### Database
- **PostgreSQL** - Robust relational database
- **UUID** - Unique identifiers for all entities
- **JSONB** - Flexible data storage for addresses and metadata

## 📋 Prerequisites

- **Rust** (1.70+) - [Install Rust](https://rustup.rs/)
- **PostgreSQL** (13+) - [Install PostgreSQL](https://www.postgresql.org/download/)
- **Node.js** (18+) - [Install Node.js](https://nodejs.org/)
- **Git** - [Install Git](https://git-scm.com/)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dcorsono.git
cd dcorsono
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost/dcorsono

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Server Configuration
RUST_LOG=info
PORT=3000

# Email Configuration (for future use)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Redis Configuration (for caching, optional)
REDIS_URL=redis://localhost:6379

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Security Configuration
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

### 3. Set Up Database

```bash
# Create PostgreSQL database
createdb dcorsono

# Run migrations
cargo install sqlx-cli
sqlx migrate run
```

### 4. Install Dependencies

```bash
# Install Rust dependencies
cargo build

# Install frontend dependencies (if using npm/yarn)
npm install
# or
yarn install
```

### 5. Run the Application

```bash
# Development mode
cargo run

# Production build
cargo build --release
cargo run --release
```

The application will be available at `http://localhost:3000`

## 🗄️ Database Schema

### Core Tables

- **users** - User accounts and authentication
- **products** - E-commerce product catalog
- **blog_posts** - Blog content with categories
- **orders** - Customer orders and transactions
- **carts** - Shopping cart management
- **newsletter_subscriptions** - Email marketing

### Sample Data

The database includes sample products for the Corsono brand and initial blog posts exploring consciousness and occult science.

## 🎨 Customization

### Branding
- Update colors in `static/css/main.css` CSS variables
- Modify logo and branding in `templates/base.html`
- Customize product images and descriptions

### Content
- Add blog posts through the admin interface
- Update product catalog via API endpoints
- Modify static content in template files

### Styling
- Liquid glass aesthetic can be customized in CSS
- Animation parameters in JavaScript files
- Responsive breakpoints in CSS media queries

## 🔒 Security Features

- **JWT Authentication** - Secure user sessions
- **SQL Injection Protection** - Parameterized queries with SQLx
- **CORS Configuration** - Controlled cross-origin requests
- **Rate Limiting** - API endpoint protection
- **Input Validation** - Server-side data validation
- **HTTPS Ready** - SSL/TLS configuration support

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Responsive layouts for tablets
- **Desktop Experience** - Enhanced features for larger screens
- **Touch Friendly** - Optimized for touch interactions

## 🚀 Deployment

### Production Build

```bash
# Build optimized release
cargo build --release

# Set production environment variables
export RUST_LOG=info
export DATABASE_URL=your_production_db_url
export JWT_SECRET=your_production_jwt_secret
export STRIPE_SECRET_KEY=your_production_stripe_key

# Run production server
cargo run --release
```

### Docker Deployment

```dockerfile
FROM rust:1.70 as builder
WORKDIR /usr/src/app
COPY . .
RUN cargo build --release

FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y libpq5 && rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/src/app/target/release/dcorsono /usr/local/bin/dcorsono
EXPOSE 3000
CMD ["dcorsono"]
```

### Environment Variables for Production

- Set `RUST_LOG=info` for production logging
- Use strong, unique `JWT_SECRET`
- Configure production database URLs
- Set up production Stripe keys
- Configure CORS origins for production domain

## 🧪 Testing

```bash
# Run all tests
cargo test

# Run tests with output
cargo test -- --nocapture

# Run specific test module
cargo test handlers::products

# Run integration tests
cargo test --test integration_tests
```

## 📊 Performance Optimization

- **Database Indexing** - Optimized queries with proper indexes
- **Connection Pooling** - Efficient database connection management
- **Lazy Loading** - Images and content loaded on demand
- **Caching** - Redis integration for session and data caching
- **CDN Ready** - Static asset optimization for CDN deployment

## 🔍 SEO & Analytics

- **Meta Tags** - Open Graph and Twitter Card support
- **Structured Data** - Schema.org markup for products and content
- **Sitemap** - XML sitemap generation
- **Analytics Ready** - Google Analytics integration support
- **Performance Metrics** - Core Web Vitals optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Email**: danielftabraham@outlook.com
- **Sibrox Email**: daniel@sibrox.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/dcorsono/issues)

## 🙏 Acknowledgments

- **Rust Community** - For the amazing ecosystem
- **Axum Team** - For the modern web framework
- **Stripe** - For payment processing
- **PostgreSQL** - For the robust database
- **Hunter x Hunter** - For the consciousness philosophy inspiration

## 🔮 Future Enhancements

- **AI-Powered Recommendations** - Product and content suggestions
- **Advanced Analytics** - User behavior and conversion tracking
- **Multi-language Support** - Internationalization
- **Mobile App** - React Native or Flutter companion app
- **AR/VR Integration** - Virtual try-on for clothing
- **Blockchain Integration** - NFT collections and Web3 features

---

**D'Corsono** - Where consciousness meets creativity. 🌟



