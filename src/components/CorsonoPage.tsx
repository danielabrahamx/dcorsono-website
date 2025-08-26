import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Category = 'all' | 't-shirts' | 'hoodies' | 'outerwear';

interface Product {
  id: number;
  name: string;
  price: number;
  category: Exclude<Category, 'all'>;
  description: string;
  material: string;
  care: string;
  images: string[];
  sizes: string[];
  colors: string[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

const seedProducts: Product[] = [
  {
    id: 1,
    name: 'Corsono Classic Tee',
    price: 45.0,
    category: 't-shirts',
    description: 'Premium black t-shirt with subtle gold accents',
    material: '100% Organic Cotton',
    care: 'Machine wash cold, tumble dry low',
    images: ['/images/corsono-classic-tee-1.jpg', '/images/corsono-classic-tee-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black']
  },
  {
    id: 2,
    name: 'Corsono Luxury Hoodie',
    price: 89.0,
    category: 'hoodies',
    description: 'Black hoodie with gold embroidery detailing',
    material: 'Premium Cotton Blend',
    care: 'Hand wash cold, air dry',
    images: ['/images/corsono-hoodie-1.jpg', '/images/corsono-hoodie-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black']
  },
  {
    id: 3,
    name: 'Corsono Statement Jacket',
    price: 125.0,
    category: 'outerwear',
    description: 'Bold black jacket with gold hardware',
    material: 'Premium Leather',
    care: 'Professional leather care recommended',
    images: ['/images/corsono-jacket-1.jpg', '/images/corsono-jacket-2.jpg'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Black']
  }
];

const CorsonoPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (modalProduct) {
      setSelectedSize(modalProduct.sizes[0] || '');
      setSelectedColor(modalProduct.colors[0] || '');
      setQuantity(1);
    }
  }, [modalProduct]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  function addToCart(product: Product, size: string, color: string, qty: number) {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === product.id && i.size === size && i.color === color);
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = { ...next[existingIndex], quantity: next[existingIndex].quantity + qty };
        return next;
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: qty, size, color }];
    });
    setCartOpen(true);
  }

  const cartTotal = useMemo(() => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0), [cartItems]);

  return (
    <div className="corsono-page">
      {/* Hero */}
      <section className="corsono-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="brand-name">Corsono</span>
              <span className="hero-subtitle">Quiet Luxury, Conscious Style</span>
            </h1>
            <p className="hero-description">
              Where consciousness meets craftsmanship. Each piece embodies the alchemy of style, designed for those who understand that true luxury is an act of awareness.
            </p>
            <div className="hero-actions">
              <a href="#collection" className="btn btn-primary">Explore Collection</a>
              <Link to="/corsono-gallery" className="btn btn-secondary">Photo Gallery</Link>
              <a href="#philosophy" className="btn btn-outline">Our Philosophy</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="brand-symbol">
              <div className="symbol-circle"></div>
              <div className="symbol-accent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy-section" id="philosophy">
        <div className="container">
          <div className="philosophy-content">
            <div className="philosophy-text">
              <h2 className="section-title">The Corsono Philosophy</h2>
              <p className="philosophy-description">
                Corsono represents more than clothing—it's a manifestation of consciousness in material form. Each piece is crafted with intention, embodying the principle that consciousness is an act, not a state of being.
              </p>
              <div className="philosophy-points">
                <div className="philosophy-point"><div className="point-icon">🌟</div><h3>Conscious Craftsmanship</h3><p>Every detail considered, every stitch intentional</p></div>
                <div className="philosophy-point"><div className="point-icon">⚡</div><h3>Dynamic Energy</h3><p>Clothing that moves with consciousness, not against it</p></div>
                <div className="philosophy-point"><div className="point-icon">🔮</div><h3>Alchemical Design</h3><p>Transforming base materials into expressions of awareness</p></div>
              </div>
            </div>
            <div className="philosophy-visual">
              <div className="philosophy-image">
                <div className="image-placeholder"><span>Consciousness in Motion</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section className="collection-section" id="collection">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The Collection</h2>
            <p className="section-subtitle">Each piece is a statement of consciousness, designed for those who wear their awareness.</p>
          </div>

          <div className="category-filter">
            {(['all','t-shirts','hoodies','outerwear'] as Category[]).map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                data-category={cat}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filteredProducts.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-image">
                  <div className="image-placeholder"><span>{p.name}</span></div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{p.name}</h3>
                  <div className="product-price">${p.price.toFixed(2)}</div>
                  <div className="product-category">{p.category}</div>
                  <button className="btn btn-outline quick-view-btn" onClick={() => setModalProduct(p)}>Quick View</button>
                </div>
              </div>
            ))}
          </div>

          <div className="gallery-link-container" style={{ textAlign: 'center', marginTop: 40, padding: '40px 0', borderTop: '1px solid rgba(255,215,0,0.2)' }}>
            <h3 style={{ color: '#FFD700', marginBottom: 16 }}>Behind the Scenes</h3>
            <p style={{ color: '#ccc', marginBottom: 24 }}>Explore our photo gallery showcasing the craftsmanship and consciousness behind each Corsono piece.</p>
            <Link to="/corsono-gallery" className="btn btn-primary">View Photo Gallery</Link>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {modalProduct && (
        <div className={`product-modal active`}>
          <div className="modal-overlay" onClick={() => setModalProduct(null)}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setModalProduct(null)}>&times;</button>
            <div className="modal-body">
              <div className="product-gallery">
                <div className="main-image">
                  <div className="image-placeholder"><span>{modalProduct.name}</span></div>
                </div>
                <div className="thumbnail-images">
                  {modalProduct.images.map((img, idx) => (
                    <div key={idx} className="thumb image-placeholder"><span>{idx + 1}</span></div>
                  ))}
                </div>
              </div>
              <div className="product-details">
                <h2 className="product-title">{modalProduct.name}</h2>
                <div className="product-price">${modalProduct.price.toFixed(2)}</div>
                <div className="product-description">{modalProduct.description}</div>

                <div className="product-options">
                  <div className="size-selector">
                    <label htmlFor="modal-size">Size:</label>
                    <select id="modal-size" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                      {modalProduct.sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div className="color-selector">
                    <label htmlFor="modal-color">Color:</label>
                    <select id="modal-color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                      {modalProduct.colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                  <div className="quantity-selector">
                    <label htmlFor="modal-quantity">Quantity:</label>
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                      <input type="number" id="modal-quantity" value={quantity} min={1} max={10} onChange={(e) => setQuantity(Math.max(1, Math.min(10, Number(e.target.value) || 1)))} />
                      <button className="qty-btn" onClick={() => setQuantity(q => Math.min(10, q + 1))}>+</button>
                    </div>
                  </div>
                </div>

                <div className="product-actions">
                  <button className="btn btn-primary" onClick={() => { addToCart(modalProduct, selectedSize, selectedColor, quantity); setModalProduct(null); }}>Add to Cart</button>
                  <button className="btn btn-secondary">Add to Wishlist</button>
                </div>

                <div className="product-meta">
                  <div className="meta-item"><strong>Material:</strong> <span>{modalProduct.material}</span></div>
                  <div className="meta-item"><strong>Care:</strong> <span>{modalProduct.care}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${cartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div style={{ color: '#999' }}>Your cart is empty.</div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,215,0,0.1)' }}>
                <div>
                  <div style={{ color: '#eee' }}>{item.name}</div>
                  <div style={{ color: '#aaa', fontSize: 12 }}>Size {item.size} · {item.color}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#eee' }}>${(item.price * item.quantity).toFixed(2)}</div>
                  <div style={{ color: '#aaa', fontSize: 12 }}>x{item.quantity}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary">Proceed to Checkout</button>
        </div>
      </div>

      {/* Highlights */}
      <section className="highlights-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Collection Highlights</h2>
            <p className="section-subtitle">Signature pieces that define the Corsono aesthetic</p>
          </div>
          <div className="highlights-grid">
            {['Classic Tee','Luxury Hoodie','Statement Jacket'].map((label, i) => (
              <div key={i} className="highlight-item">
                <div className="highlight-image"><div className="image-placeholder"><span>{label}</span></div></div>
                <div className="highlight-content">
                  <h3>The {label}</h3>
                  <p>{i === 0 ? 'Our signature piece, embodying simplicity and consciousness' : i === 1 ? 'Premium comfort meets conscious design' : 'Bold design that speaks of awareness and intention'}</p>
                  <a href="#collection" className="highlight-link">View Details</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="sustainability-section">
        <div className="container">
          <div className="sustainability-content">
            <div className="sustainability-text">
              <h2 className="section-title">Conscious by Design</h2>
              <p className="sustainability-description">Every Corsono piece is created with sustainability and consciousness in mind. We believe that true luxury doesn't come at the expense of our planet or our values.</p>
              <div className="sustainability-features">
                <div className="feature"><div className="feature-icon">🌱</div><h3>Organic Materials</h3><p>Sustainably sourced, ethically produced</p></div>
                <div className="feature"><div className="feature-icon">♻️</div><h3>Circular Design</h3><p>Built to last, designed to be cherished</p></div>
                <div className="feature"><div className="feature-icon">🤝</div><h3>Fair Production</h3><p>Supporting artisans and conscious practices</p></div>
              </div>
            </div>
            <div className="sustainability-visual">
              <div className="sustainability-image"><div className="image-placeholder"><span>Sustainable Luxury</span></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Conscious</h2>
            <p className="newsletter-description">Join the Corsono community and be the first to know about new collections, conscious living tips, and exclusive offers.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required className="newsletter-input" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorsonoPage;


