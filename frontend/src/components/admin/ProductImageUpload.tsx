import React, { useState, useCallback } from 'react';

interface ProductImageUploadProps {
  productName: string;
  onImagesUploaded: (imageUrls: string[]) => void;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({ productName, onImagesUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  const uploadImages = async (files: FileList) => {
    if (!files.length || !productName) {
      setMessage('Please enter a product name first');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setMessage('');

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('photos', file);
    });

    try {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(progress);
        }
      });

      const response = await new Promise<any>((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject(new Error('Upload failed'));
            }
          }
        };
        xhr.open('POST', '/api/corsono/gallery/upload');
        xhr.send(formData);
      });

      if (response.saved && response.saved.length > 0) {
        const imageUrls = response.saved.map((filename: string) => `/images/corsono/${filename}`);
        setUploadedImages(prev => [...prev, ...imageUrls]);
        onImagesUploaded(imageUrls);
        setMessage(`✅ Successfully uploaded ${response.saved.length} image(s)`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('❌ Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      uploadImages(files);
    }
  }, [productName]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      uploadImages(files);
    }
  };

  const copyImagePaths = () => {
    const paths = uploadedImages.map(url => `"${url}"`).join(',\n        ');
    navigator.clipboard.writeText(`images: [\n        ${paths}\n      ]`);
    setMessage('📋 Image paths copied to clipboard!');
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <label style={{ display: 'block', marginBottom: 12, color: 'var(--color-gold)' }}>
        Product Images
      </label>
      
      {/* Upload Area */}
      <div
        style={{
          border: '2px dashed rgba(255, 215, 0, 0.4)',
          borderRadius: 12,
          padding: 32,
          textAlign: 'center',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          cursor: productName ? 'pointer' : 'not-allowed',
          opacity: productName ? 1 : 0.5
        }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !uploading && productName && document.getElementById('product-image-input')?.click()}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>📸</div>
        {!productName ? (
          <p style={{ color: '#999' }}>Enter product name first to enable image upload</p>
        ) : uploading ? (
          <>
            <p style={{ color: 'var(--color-gold)' }}>Uploading images...</p>
            <div style={{ 
              width: '100%', 
              height: 8, 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: 4, 
              margin: '16px auto',
              maxWidth: 300
            }}>
              <div style={{ 
                height: '100%', 
                background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-dark))', 
                borderRadius: 4,
                width: `${uploadProgress}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{uploadProgress}%</p>
          </>
        ) : (
          <>
            <h4 style={{ color: 'var(--color-gold)', marginBottom: 8 }}>Upload Product Images</h4>
            <p style={{ color: '#ccc', marginBottom: 16 }}>
              Drag & drop images here or click to select
            </p>
            <p style={{ fontSize: '0.9rem', color: '#999' }}>
              Supports: JPG, PNG, WebP
            </p>
          </>
        )}
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        id="product-image-input"
        style={{ display: 'none' }}
      />

      {/* Message */}
      {message && (
        <div style={{ 
          marginTop: 12, 
          padding: 12, 
          background: message.includes('❌') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)',
          border: `1px solid ${message.includes('❌') ? 'rgba(255,0,0,0.3)' : 'rgba(0,255,0,0.3)'}`,
          borderRadius: 6,
          color: message.includes('❌') ? '#ff9999' : '#99ff99',
          fontSize: '0.9rem'
        }}>
          {message}
        </div>
      )}

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h5 style={{ color: 'var(--color-gold)' }}>Uploaded Images ({uploadedImages.length})</h5>
            <button
              onClick={copyImagePaths}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              Copy Image Paths
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8 }}>
            {uploadedImages.map((url, index) => (
              <div key={index} style={{ 
                aspectRatio: '1/1', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid rgba(255,215,0,0.3)'
              }}>
                <img 
                  src={url} 
                  alt={`Product ${index + 1}`} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} 
                />
              </div>
            ))}
          </div>
          <div style={{ 
            marginTop: 12, 
            padding: 12, 
            background: 'rgba(255,215,0,0.1)', 
            borderRadius: 6,
            fontSize: '0.9rem',
            color: '#ccc'
          }}>
            💡 <strong>Tip:</strong> Click "Copy Image Paths" to get the formatted image array for your product code.
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageUpload;
