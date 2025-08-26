import React, { useState } from 'react';
import ProductImageUpload from './ProductImageUpload';
import { ProtectedRoute } from '../auth/AdminAuth';

interface ProductForm {
  name: string;
  price: number;
  category: 'hoodies' | 'tracksuits' | 'sets' | 't-shirts' | 'outerwear';
  description: string;
  material: string;
  care: string;
  sizes: string[];
  availableSizes: string[];
  colors: string[];
  collection: string;
  images: string[];
}

const ProductAdminContent: React.FC = () => {
  const [product, setProduct] = useState<ProductForm>({
    name: '',
    price: 0,
    category: 'hoodies',
    description: '',
    material: '',
    care: '',
    sizes: [],
    availableSizes: [],
    colors: [],
    collection: 'Golden Dawn',
    images: []
  });

  const [generatedCode, setGeneratedCode] = useState<string>('');

  const quickFillTemplates = {
    hoodie: {
      name: 'Golden Dawn Hoodie',
      category: 'hoodies' as const,
      description: 'Premium hoodie from the Golden Dawn collection, embodying conscious luxury and spiritual elegance.',
      material: 'Premium Cotton Blend',
      care: 'Machine wash cold, tumble dry low',
      sizes: ['S', 'M', 'L', 'XL'],
      availableSizes: ['M'],
      colors: ['Black', 'Gold'],
      images: []
    },
    tracksuit: {
      name: 'Golden Dawn Tracksuit Bottoms',
      category: 'tracksuits' as const,
      description: 'Luxurious tracksuit bottoms from the Golden Dawn collection, perfect for conscious comfort and style.',
      material: 'Premium Cotton Blend',
      care: 'Machine wash cold, tumble dry low',
      sizes: ['S', 'M', 'L', 'XL'],
      availableSizes: ['M'],
      colors: ['Black', 'Gold'],
      images: []
    },
    set: {
      name: 'Golden Dawn Full Set',
      category: 'sets' as const,
      description: 'Complete Golden Dawn set including hoodie and tracksuit bottoms. The ultimate expression of conscious luxury.',
      material: 'Premium Cotton Blend',
      care: 'Machine wash cold, tumble dry low',
      sizes: ['S', 'M', 'L', 'XL'],
      availableSizes: ['M'],
      colors: ['Black', 'Gold'],
      images: []
    }
  };

  const applyTemplate = (template: keyof typeof quickFillTemplates) => {
    const templateData = quickFillTemplates[template];
    setProduct(prev => ({
      ...prev,
      ...templateData,
      price: 0 // Keep price empty for user input
    }));
  };

  const handleImagesUploaded = (imageUrls: string[]) => {
    setProduct(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = ['Black', 'Gold', 'White', 'Navy', 'Grey'];

  const handleSizeToggle = (size: string) => {
    setProduct(prev => ({
      ...prev,
      availableSizes: prev.availableSizes.includes(size) 
        ? prev.availableSizes.filter(s => s !== size)
        : [...prev.availableSizes, size]
    }));
  };

  const handleColorToggle = (color: string) => {
    setProduct(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const generateProductCode = () => {
    const productObject = {
      id: Date.now(), // Simple ID generation
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      material: product.material,
      care: product.care,
      sizes: product.sizes,
      availableSizes: product.availableSizes,
      colors: product.colors,
      collection: product.collection,
      images: product.images.length > 0 ? product.images : [`/images/corsono/${product.name.toLowerCase().replace(/\s+/g, '-')}-1.jpg`]
    };

    const code = `// Add this product to your products array in CorsonoPage.tsx
// Price: £${product.price}
${JSON.stringify(productObject, null, 2)}`;
    
    setGeneratedCode(code);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 40 }}>
      <h1 style={{ color: 'var(--color-gold)', marginBottom: 32, textAlign: 'center' }}>
        Corsono Product Admin
      </h1>
      
      {/* Quick Fill Templates */}
      <div style={{ 
        background: 'rgba(255,215,0,0.1)', 
        padding: 20, 
        borderRadius: 8,
        marginBottom: 24,
        border: '1px solid rgba(255,215,0,0.3)'
      }}>
        <h3 style={{ color: 'var(--color-gold)', marginBottom: 16 }}>Golden Dawn Collection - Quick Fill</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={() => applyTemplate('hoodie')}
            className="btn btn-secondary"
            style={{ fontSize: '0.9rem' }}
          >
            Fill Hoodie Details
          </button>
          <button
            onClick={() => applyTemplate('tracksuit')}
            className="btn btn-secondary"
            style={{ fontSize: '0.9rem' }}
          >
            Fill Tracksuit Bottoms
          </button>
          <button
            onClick={() => applyTemplate('set')}
            className="btn btn-secondary"
            style={{ fontSize: '0.9rem' }}
          >
            Fill Full Set Details
          </button>
        </div>
        <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: 12 }}>
          Click a button to auto-fill the form with template data. You'll only need to set the price!
        </p>
      </div>
      
      <div style={{ 
        background: 'rgba(255,255,255,0.04)', 
        padding: 32, 
        borderRadius: 12,
        border: '2px solid rgba(255, 215, 0, 0.3)'
      }}>
        
        {/* Collection */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)' }}>
            Collection
          </label>
          <input
            type="text"
            value={product.collection}
            onChange={(e) => setProduct(prev => ({ ...prev, collection: e.target.value }))}
            style={{ 
              width: '100%', 
              padding: 12, 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: 6,
              color: '#eee'
            }}
          />
        </div>

        {/* Product Name */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)' }}>
            Product Name
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Golden Dawn Hoodie"
            style={{ 
              width: '100%', 
              padding: 12, 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: 6,
              color: '#eee'
            }}
          />
        </div>

        {/* Price */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)' }}>
            Price (£)
          </label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
            style={{ 
              width: '100%', 
              padding: 12, 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: 6,
              color: '#eee'
            }}
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)' }}>
            Category
          </label>
          <select
            value={product.category}
            onChange={(e) => setProduct(prev => ({ ...prev, category: e.target.value as any }))}
            style={{ 
              width: '100%', 
              padding: 12, 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: 6,
              color: '#eee'
            }}
          >
            <option value="hoodies">Hoodies</option>
            <option value="tracksuits">Tracksuit Bottoms</option>
            <option value="sets">Full Sets</option>
            <option value="t-shirts">T-Shirts</option>
            <option value="outerwear">Outerwear</option>
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)' }}>
            Description
          </label>
          <textarea
            value={product.description}
            onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the product..."
            rows={3}
            style={{ 
              width: '100%', 
              padding: 12, 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: 6,
              color: '#eee',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Material */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)' }}>
            Material
          </label>
          <input
            type="text"
            value={product.material}
            onChange={(e) => setProduct(prev => ({ ...prev, material: e.target.value }))}
            placeholder="e.g., 100% Organic Cotton"
            style={{ 
              width: '100%', 
              padding: 12, 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: 6,
              color: '#eee'
            }}
          />
        </div>

        {/* Care Instructions */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--color-gold)' }}>
            Care Instructions
          </label>
          <input
            type="text"
            value={product.care}
            onChange={(e) => setProduct(prev => ({ ...prev, care: e.target.value }))}
            placeholder="e.g., Machine wash cold, tumble dry low"
            style={{ 
              width: '100%', 
              padding: 12, 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: 6,
              color: '#eee'
            }}
          />
        </div>

        {/* Sizes */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 12, color: 'var(--color-gold)' }}>
            Available Sizes
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {availableSizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                style={{
                  padding: '8px 16px',
                  background: product.availableSizes.includes(size) ? 'var(--color-gold)' : 'transparent',
                  color: product.availableSizes.includes(size) ? '#000' : 'var(--color-gold)',
                  border: '2px solid var(--color-gold)',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        {/* All Sizes (for reference) */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 12, color: 'var(--color-gold)' }}>
            All Sizes (Product Range)
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {availableSizes.map(size => (
              <button
                key={size}
                onClick={() => {
                  if (!product.sizes.includes(size)) {
                    setProduct(prev => ({
                      ...prev,
                      sizes: [...prev.sizes, size]
                    }));
                  }
                }}
                style={{
                  padding: '8px 16px',
                  background: product.sizes.includes(size) ? 'rgba(255,215,0,0.3)' : 'transparent',
                  color: product.sizes.includes(size) ? '#000' : '#666',
                  border: '2px solid rgba(255,215,0,0.3)',
                  borderRadius: 6,
                  cursor: product.sizes.includes(size) ? 'default' : 'pointer',
                  opacity: product.sizes.includes(size) ? 1 : 0.5
                }}
              >
                {size}
              </button>
            ))}
          </div>
          <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: 8 }}>
            Add sizes to show in product range (all sizes will be displayed but only available ones can be selected)
          </p>
        </div>

        {/* Colors */}
        <div style={{ marginBottom: 32 }}>
          <label style={{ display: 'block', marginBottom: 12, color: 'var(--color-gold)' }}>
            Available Colors
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {availableColors.map(color => (
              <button
                key={color}
                onClick={() => handleColorToggle(color)}
                style={{
                  padding: '8px 16px',
                  background: product.colors.includes(color) ? 'var(--color-gold)' : 'transparent',
                  color: product.colors.includes(color) ? '#000' : 'var(--color-gold)',
                  border: '2px solid var(--color-gold)',
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Product Images */}
        <ProductImageUpload 
          productName={product.name}
          onImagesUploaded={handleImagesUploaded}
        />

        {/* Generate Button */}
        <button
          onClick={generateProductCode}
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: 24 }}
        >
          Generate Product Code
        </button>

        {/* Generated Code */}
        {generatedCode && (
          <div style={{ marginTop: 24 }}>
            <label style={{ display: 'block', marginBottom: 12, color: 'var(--color-gold)' }}>
              Generated Code (Copy & Paste into CorsonoPage.tsx):
            </label>
            <textarea
              value={generatedCode}
              readOnly
              rows={15}
              style={{ 
                width: '100%', 
                padding: 12, 
                background: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,215,0,0.3)',
                borderRadius: 6,
                color: '#0f0',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}
            />
            <p style={{ color: '#ccc', fontSize: '0.9rem', marginTop: 8 }}>
              Copy this code and add it to the products array in frontend/src/components/pages/CorsonoPage.tsx
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductAdmin: React.FC = () => {
  return (
    <ProtectedRoute>
      <ProductAdminContent />
    </ProtectedRoute>
  );
};

export default ProductAdmin;
