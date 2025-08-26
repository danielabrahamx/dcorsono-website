import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  collection: string;
  description: string;
  material: string;
  care: string;
  sizes: string[];
  availableSizes?: string[];
  colors: string[];
  images: string[];
  featured?: boolean;
  inStock: boolean;
  originalPrice?: number;
  savings?: number;
  stripeUrl?: string;
}

interface CartItem {
  productId: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

const CorsonoShop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load products:', error);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Reset modal state when product changes
  useEffect(() => {
    if (selectedProduct) {
      // Set first available size, or first size if no availableSizes specified
      const firstAvailableSize = selectedProduct.availableSizes?.[0] || selectedProduct.sizes[0] || '';
      setSelectedSize(firstAvailableSize);
      setSelectedColor(selectedProduct.colors[0] || '');
      setQuantity(1);
    }
  }, [selectedProduct]);

  const addToCart = (product: Product, size: string, color: string, qty: number) => {
    // Check if the selected size is available
    if (product.availableSizes && !product.availableSizes.includes(size)) {
      alert(`Size ${size} is currently out of stock. Please select an available size.`);
      return;
    }

    if (product.stripeUrl) {
      // Redirect to Stripe checkout
      window.open(product.stripeUrl, '_blank');
      setSelectedProduct(null);
    } else {
      // Fallback to local cart if no Stripe URL
      const cartItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        size,
        color,
        quantity: qty,
        image: product.images[0]
      };

      setCart(prev => {
        const existingIndex = prev.findIndex(
          item => item.productId === product.id && item.size === size && item.color === color
        );
        
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex].quantity += qty;
          return updated;
        }
        
        return [...prev, cartItem];
      });
      
      setCartOpen(true);
      setSelectedProduct(null);
    }
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'tracksuits', label: 'Tracksuit Bottoms' },
    { id: 'jackets', label: 'Jackets' },
    { id: 'jeans', label: 'Jeans' },
    { id: 'sets', label: 'Full Sets' }
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="corsono-shop">
      {/* Hero Section */}
             <section className="corsono-hero" style={{ paddingTop: 80 }}>
         <div className="hero-background" style={{
           position: 'absolute',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(20,20,20,0.5))',
           backdropFilter: 'blur(100px)',
           zIndex: -1
         }}>
           <div className="hero-overlay" style={{
             position: 'absolute',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             background: 'radial-gradient(circle at 30% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)',
             backdropFilter: 'blur(50px)'
           }} />
         </div>
                 <div className="container">
           <div className="hero-content" style={{
             position: 'relative',
             zIndex: 1,
             background: 'rgba(0, 0, 0, 0.3)',
             backdropFilter: 'blur(30px)',
             borderRadius: '20px',
             padding: '40px',
             border: '1px solid rgba(255, 215, 0, 0.15)',
             boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
           }}>
             <div className="hero-text">
              <h1 className="hero-title">
                <span className="brand-name">Corsono</span>
                <span className="hero-subtitle">Golden Dawn Collection</span>
              </h1>

                             <div style={{
                 marginTop: '20px',
                 padding: '16px 20px',
                 background: 'rgba(255, 215, 0, 0.08)',
                 borderRadius: '12px',
                 border: '1px solid rgba(255, 215, 0, 0.2)',
                 textAlign: 'left',
                 maxWidth: '450px',
                 marginLeft: 'auto',
                 marginRight: 'auto',
                 backdropFilter: 'blur(20px)',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
               }}>
                <h3 style={{
                  margin: '0 0 16px 0',
                  fontSize: '1.2rem',
                  color: '#ffd700',
                  fontFamily: 'var(--font-magical)',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>
                  Corsono noun, verb
                </h3>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '0.9rem',
                  color: '#ccc',
                  fontFamily: 'monospace',
                  textAlign: 'center'
                }}>
                  /ˈkɔːr.sə.noʊ/
                </p>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{
                    margin: '0 0 8px 0',
                    fontSize: '1rem',
                    color: '#ffd700',
                    fontWeight: '500'
                  }}>
                    As a noun
                  </h4>
                  <p style={{
                    margin: '0 0 8px 0',
                    fontSize: '0.9rem',
                    color: '#ccc',
                    lineHeight: '1.4'
                  }}>
                    The sound of the heart.
                  </p>
                  <p style={{
                    margin: '0',
                    fontSize: '0.85rem',
                    color: '#999',
                    fontStyle: 'italic'
                  }}>
                    From Latin cor ("heart") + sono ("sound").
                  </p>
                </div>
                <div>
                  <h4 style={{
                    margin: '0 0 8px 0',
                    fontSize: '1rem',
                    color: '#ffd700',
                    fontWeight: '500'
                  }}>
                    As a verb
                  </h4>
                  <p style={{
                    margin: '0',
                    fontSize: '0.9rem',
                    color: '#ccc',
                    lineHeight: '1.4'
                  }}>
                    To resonate with the heart; to express a truth or feeling deeply.
                  </p>
                </div>
              </div>
                             <div className="hero-actions" style={{ marginTop: '32px' }}>
                 <a href="#collection" className="btn btn-primary" style={{
                   background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(255, 215, 0, 0.7))',
                   backdropFilter: 'blur(20px)',
                   border: '1px solid rgba(255, 215, 0, 0.3)',
                   boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                   marginRight: '16px'
                 }}>Shop Collection</a>
                 <Link to="/corsono-gallery" className="btn btn-secondary" style={{
                   background: 'rgba(0, 0, 0, 0.4)',
                   backdropFilter: 'blur(20px)',
                   border: '1px solid rgba(255, 215, 0, 0.3)',
                   boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                 }}>Gallery</Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="collection" className="collection-section">
        <div className="container">
                     <div className="section-header" style={{
             background: 'rgba(0, 0, 0, 0.2)',
             backdropFilter: 'blur(20px)',
             borderRadius: '16px',
             padding: '24px',
             border: '1px solid rgba(255, 215, 0, 0.1)',
             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
             marginBottom: '32px'
           }}>
             <h2 className="section-title" style={{ color: 'var(--color-gold)', marginBottom: '8px' }}>Golden Dawn Collection</h2>

           </div>

          {/* Category Filter */}
                     <div className="category-filter" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
             {categories.map(category => (
               <button
                 key={category.id}
                 onClick={() => setSelectedCategory(category.id)}
                 className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                 style={{
                   padding: '12px 24px',
                   background: selectedCategory === category.id ? 'var(--color-gold)' : 'rgba(0, 0, 0, 0.3)',
                   color: selectedCategory === category.id ? '#000' : 'var(--color-gold)',
                   border: '1px solid var(--color-gold)',
                   borderRadius: 12,
                   cursor: 'pointer',
                   fontFamily: 'var(--font-magical)',
                   fontWeight: 500,
                   transition: 'all 0.3s ease',
                   backdropFilter: 'blur(20px)',
                   boxShadow: selectedCategory === category.id ? 
                     '0 4px 16px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 
                     '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                 }}
               >
                 {category.label}
               </button>
             ))}
           </div>

          {/* Products Grid */}
          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                
                                 style={{
                   background: 'rgba(0, 0, 0, 0.4)',
                   border: '1px solid rgba(255, 215, 0, 0.2)',
                   borderRadius: 16,
                   backdropFilter: 'blur(25px)',
                   boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                   overflow: 'hidden',
                   cursor: 'pointer'
                 }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="product-image" style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#222' }}>
                  {product.images[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const nextElement = target.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div style={{ 
                    display: product.images[0] ? 'none' : 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%', 
                    background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(184,134,11,0.1))',
                    color: 'var(--color-gold)'
                  }}>
                    <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-magical)' }}>{product.name}</span>
                  </div>
                </div>
                
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <h3 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-magical)', fontSize: '1.3rem', margin: 0 }}>
                      {product.name}
                    </h3>
                    {product.featured && (
                      <span style={{ 
                        background: 'var(--color-gold)', 
                        color: '#000', 
                        padding: '4px 8px', 
                        borderRadius: 4, 
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        FEATURED
                      </span>
                    )}
                  </div>
                  
                  <p style={{ color: '#ccc', marginBottom: 16, lineHeight: 1.6 }}>
                    {product.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      {product.originalPrice && (
                        <span style={{ 
                          color: '#999', 
                          textDecoration: 'line-through', 
                          marginRight: 8,
                          fontSize: '0.9rem'
                        }}>
                          £{product.originalPrice}
                        </span>
                      )}
                      <span style={{ 
                        color: 'var(--color-gold)', 
                        fontSize: '1.4rem', 
                        fontWeight: 600,
                        fontFamily: 'var(--font-magical)'
                      }}>
                        £{product.price}
                      </span>
                      {product.savings && (
                        <span style={{ 
                          color: '#4ade80', 
                          marginLeft: 8, 
                          fontSize: '0.9rem',
                          fontWeight: 500
                        }}>
                          Save £{product.savings}
                        </span>
                      )}
                    </div>
                    
                    <span style={{ 
                      color: product.inStock ? '#4ade80' : '#ef4444',
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gallery Link */}
                     <div className="gallery-link-container" style={{
             background: 'rgba(0, 0, 0, 0.2)',
             backdropFilter: 'blur(20px)',
             borderRadius: '16px',
             padding: '32px',
             border: '1px solid rgba(255, 215, 0, 0.1)',
             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
             textAlign: 'center',
             marginTop: '48px'
           }}>
             <h3 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>Behind the Scenes</h3>
             
             <Link to="/corsono-gallery" className="btn btn-primary" style={{
               background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.9), rgba(255, 215, 0, 0.7))',
               backdropFilter: 'blur(20px)',
               border: '1px solid rgba(255, 215, 0, 0.3)',
               boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
             }}>View Gallery</Link>
           </div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="product-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.9)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,20,20,0.9))',
                border: '2px solid rgba(255, 215, 0, 0.4)',
                borderRadius: 16,
                backdropFilter: 'blur(20px)',
                maxWidth: 800,
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h2 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-magical)', fontSize: '2rem' }}>
                    {selectedProduct.name}
                  </h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ccc',
                      fontSize: '2rem',
                      cursor: 'pointer',
                      padding: 8
                    }}
                  >
                    ×
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
                  <div>
                    <div style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: 12, background: '#222', marginBottom: 16 }}>
                      {selectedProduct.images[0] ? (
                        <img 
                          src={selectedProduct.images[0]} 
                          alt={selectedProduct.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          height: '100%',
                          color: 'var(--color-gold)'
                        }}>
                          <span>{selectedProduct.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                        <span style={{ 
                          color: 'var(--color-gold)', 
                          fontSize: '2rem', 
                          fontWeight: 600,
                          fontFamily: 'var(--font-magical)'
                        }}>
                          £{selectedProduct.price}
                        </span>
                        {selectedProduct.originalPrice && (
                          <>
                            <span style={{ 
                              color: '#999', 
                              textDecoration: 'line-through',
                              fontSize: '1.2rem'
                            }}>
                              £{selectedProduct.originalPrice}
                            </span>
                            <span style={{ 
                              background: '#4ade80', 
                              color: '#000', 
                              padding: '4px 8px', 
                              borderRadius: 4,
                              fontSize: '0.8rem',
                              fontWeight: 600
                            }}>
                              SAVE £{selectedProduct.savings}
                            </span>
                          </>
                        )}
                      </div>
                      <p style={{ color: '#ccc', lineHeight: 1.6, marginBottom: 16 }}>
                        {selectedProduct.description}
                      </p>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)', fontWeight: 500 }}>
                        Size:
                      </label>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                        {selectedProduct.sizes.map(size => {
                          const isAvailable = selectedProduct.availableSizes ? selectedProduct.availableSizes.includes(size) : true;
                          const isSelected = selectedSize === size;
                          
                          return (
                            <button
                              key={size}
                              onClick={() => {
                                if (isAvailable) {
                                  setSelectedSize(size);
                                }
                              }}
                              style={{
                                padding: '8px 16px',
                                background: isSelected ? 'var(--color-gold)' : 'transparent',
                                color: isSelected ? '#000' : (isAvailable ? 'var(--color-gold)' : '#666'),
                                border: '2px solid var(--color-gold)',
                                borderRadius: 6,
                                cursor: isAvailable ? 'pointer' : 'not-allowed',
                                opacity: isAvailable ? 1 : 0.5,
                                position: 'relative'
                              }}
                              disabled={!isAvailable}
                            >
                              {size}
                              {!isAvailable && (
                                <span style={{
                                  position: 'absolute',
                                  top: -8,
                                  right: -8,
                                  background: '#666',
                                  color: '#fff',
                                  fontSize: '0.7rem',
                                  padding: '2px 4px',
                                  borderRadius: '50%',
                                  lineHeight: 1
                                }}>
                                  ×
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {selectedProduct.availableSizes && (
                        <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: 8 }}>
                          Only size {selectedProduct.availableSizes.join(', ')} currently in stock
                        </p>
                      )}

                      <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)', fontWeight: 500 }}>
                        Color:
                      </label>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                        {selectedProduct.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            style={{
                              padding: '8px 16px',
                              background: selectedColor === color ? 'var(--color-gold)' : 'transparent',
                              color: selectedColor === color ? '#000' : 'var(--color-gold)',
                              border: '2px solid var(--color-gold)',
                              borderRadius: 6,
                              cursor: 'pointer'
                            }}
                          >
                            {color}
                          </button>
                        ))}
                      </div>

                      <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)', fontWeight: 500 }}>
                        Quantity:
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          style={{
                            width: 40,
                            height: 40,
                            background: 'transparent',
                            border: '2px solid var(--color-gold)',
                            color: 'var(--color-gold)',
                            borderRadius: 6,
                            cursor: 'pointer'
                          }}
                        >
                          -
                        </button>
                        <span style={{ 
                          minWidth: 40, 
                          textAlign: 'center',
                          color: '#eee',
                          fontSize: '1.2rem',
                          fontWeight: 500
                        }}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(Math.min(10, quantity + 1))}
                          style={{
                            width: 40,
                            height: 40,
                            background: 'transparent',
                            border: '2px solid var(--color-gold)',
                            color: 'var(--color-gold)',
                            borderRadius: 6,
                            cursor: 'pointer'
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(selectedProduct, selectedSize, selectedColor, quantity)}
                      disabled={!selectedProduct.inStock}
                      className="btn btn-primary"
                      style={{ 
                        width: '100%', 
                        padding: '16px',
                        fontSize: '1.1rem',
                        opacity: selectedProduct.inStock ? 1 : 0.5,
                        cursor: selectedProduct.inStock ? 'pointer' : 'not-allowed'
                      }}
                    >
                      {selectedProduct.inStock ? 'Buy Now' : 'Out of Stock'}
                    </button>

                                         {selectedProduct.category === 'sets' && (
                       <div style={{ 
                         marginTop: '16px', 
                         padding: '12px', 
                         background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(255, 215, 0, 0.1))',
                         border: '1px solid rgba(212, 175, 55, 0.3)',
                         borderRadius: '8px',
                         textAlign: 'center'
                       }}>
                         <div style={{ color: '#fff', fontSize: '0.9rem' }}>
                           Use code <strong style={{ color: 'var(--color-gold)' }}>CRSN</strong> at checkout
                         </div>
                       </div>
                     )}

                    <div style={{ marginTop: 24, padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                      <div style={{ marginBottom: 8 }}>
                        <strong style={{ color: 'var(--color-gold)' }}>Material:</strong> 
                        <span style={{ color: '#ccc', marginLeft: 8 }}>{selectedProduct.material}</span>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--color-gold)' }}>Care:</strong> 
                        <span style={{ color: '#ccc', marginLeft: 8 }}>{selectedProduct.care}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 400,
              height: '100vh',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,20,20,0.9))',
              border: '2px solid rgba(255, 215, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ padding: 24, borderBottom: '1px solid rgba(255,215,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-magical)' }}>
                  Cart ({cartItemCount})
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ccc',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 32, color: '#999' }}>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    gap: 12, 
                    padding: 16, 
                    borderBottom: '1px solid rgba(255,215,0,0.1)',
                    alignItems: 'center'
                  }}>
                    <div style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', background: '#222' }}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#eee', fontWeight: 500, marginBottom: 4 }}>{item.name}</div>
                      <div style={{ color: '#999', fontSize: '0.9rem' }}>
                        {item.size} · {item.color} · Qty: {item.quantity}
                      </div>
                      <div style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
                        £{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      style={{
                        background: 'rgba(255,0,0,0.1)',
                        border: '1px solid rgba(255,0,0,0.3)',
                        color: '#ff9999',
                        width: 32,
                        height: 32,
                        borderRadius: 4,
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: 24, borderTop: '1px solid rgba(255,215,0,0.2)' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 16,
                  fontSize: '1.2rem',
                  fontWeight: 600
                }}>
                  <span style={{ color: '#eee' }}>Total:</span>
                  <span style={{ color: 'var(--color-gold)' }}>£{cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  className="btn btn-primary"
                  style={{ width: '100%', padding: 16, fontSize: '1.1rem' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Icon */}
      <button
        onClick={() => setCartOpen(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))',
          border: '2px solid rgba(255, 215, 0, 0.6)',
          color: '#000',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        🛒
        {cartItemCount > 0 && (
          <span style={{
            position: 'absolute',
            top: -8,
            right: -8,
            background: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: 24,
            height: 24,
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600
          }}>
            {cartItemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default CorsonoShop;
