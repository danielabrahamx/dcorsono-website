import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from './auth/AdminAuth';

interface GalleryItem {
  name: string;
  url: string;
}

interface GalleryProps {
  apiEndpoint: string;
  uploadEndpoint: string;
  title: string;
  aspectRatio?: 'square' | 'wide';
}

const Gallery: React.FC<GalleryProps> = ({ 
  apiEndpoint, 
  uploadEndpoint, 
  title, 
  aspectRatio = 'wide'
}) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { isAuthenticated } = useAuth();

  const fetchGallery = useCallback(async () => {
    try {
      const response = await fetch(apiEndpoint);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        // Fallback to static images for Netlify deployment
        const staticImages = await loadStaticImages(apiEndpoint);
        setItems(staticImages);
      }
      setLoading(false);
    } catch (error) {
      console.error('Backend not available, loading static images:', error);
      // Fallback to static images for Netlify deployment
      const staticImages = await loadStaticImages(apiEndpoint);
      setItems(staticImages);
      setLoading(false);
    }
  }, [apiEndpoint]);

  const loadStaticImages = async (endpoint: string): Promise<GalleryItem[]> => {
    // For Netlify deployment, use pre-defined static images
    if (endpoint.includes('corsono')) {
      return [
        { name: 'Golden Dawn Hoodie', url: '/images/products/golden-dawn-hoodie-1.jpg' },
        { name: 'Golden Dawn Bottoms', url: '/images/products/golden-dawn-bottoms-1.jpg' },
        // Corsono Gallery Images
        { name: 'Corsono Image 1', url: '/images/crsn-1.JPG' },
        { name: 'Corsono Image 2', url: '/images/crsn-2.jpeg' },
        { name: 'Corsono Image 3', url: '/images/crsn-3.jpg' },
        { name: 'Corsono Image 4', url: '/images/crsn-4.jpg' },
        { name: 'Corsono Image 5', url: '/images/crsn-5.JPG' },
        { name: 'Corsono Image 6', url: '/images/crsn-6.JPG' },
        { name: 'Corsono Image 7', url: '/images/crsn-7.jpg' },
      ].filter(item => item.url); // Filter out any undefined images
    } else {
      // Art gallery static images
      return [
        { name: 'Artwork 1', url: '/images/art-1.JPG' },
        { name: 'Artwork 2', url: '/images/art-2.jpg' },
        { name: 'Artwork 3', url: '/images/art-3.jpg' },
        { name: 'Artwork 4', url: '/images/art-4.jpg' },
        { name: 'Artwork 5', url: '/images/art-5.jpg' },
        { name: 'Artwork 6', url: '/images/art-6.jpg' },
        { name: 'Artwork 7', url: '/images/art-7.jpg' },
      ];
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const handleUpload = async (files: FileList) => {
    if (!files.length) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    const formData = new FormData();
    Array.from(files).forEach(file => {
      const fieldName = uploadEndpoint.includes('art') ? 'artwork' : 'photos';
      formData.append(fieldName, file);
    });

    try {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(progress);
        }
      });

      await new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(xhr.response);
            } else {
              reject(new Error('Upload failed: ' + xhr.statusText));
            }
          }
        };
        xhr.open('POST', uploadEndpoint);
        
        // Add authorization header for authenticated users
        if (isAuthenticated) {
          xhr.setRequestHeader('Authorization', 'Bearer dcorsono2024!');
        }
        
        xhr.send(formData);
      });

      await fetchGallery();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleUpload(files);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="header"
      >
        <div className="container">
          <div className="header-content">
            <h1>{title}</h1>
            <nav className="nav">
              <Link to="/">Home</Link>
              <Link to="/corsono-gallery">Photo Gallery</Link>
              <Link to="/art-gallery">Art Gallery</Link>
            </nav>
          </div>
        </div>
      </motion.header>

      <div className="container">
        {/* Upload Area - Only visible to authenticated admin */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="upload-area"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <img 
                src="/images/logo.png" 
                alt="D'Corsono Upload" 
                style={{ 
                  height: '48px', 
                  width: 'auto',
                  filter: 'brightness(1.1) opacity(0.8)',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            <h3>Upload Images</h3>
            <p style={{ margin: '16px 0', color: '#999' }}>Drag and drop your images here or click to select</p>
            <p style={{ 
              fontSize: '0.8rem', 
              color: '#666', 
              marginTop: '8px',
              padding: '8px',
              background: 'rgba(255, 215, 0, 0.1)',
              borderRadius: '4px',
              border: '1px solid rgba(255, 215, 0, 0.2)'
            }}>
              💡 <strong>Note:</strong> Image uploads work locally. On Netlify, images are pre-loaded for display.
            </p>
            
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="btn">
              Select Files
            </label>

            {uploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginTop: '16px' }}
              >
                <div className="progress">
                  <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p style={{ fontSize: '14px', color: '#999' }}>Uploading... {uploadProgress}%</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Gallery Grid */}
        {items.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="gallery-grid"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`gallery-card ${aspectRatio}`}
                onClick={() => setSelectedImage(item.url)}
              >
                <img
                  src={item.url}
                  alt="Gallery item"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty"
          >
            <div className="empty-emoji">🎨</div>
            <h3>No images yet</h3>
            <p>Upload your first image to get started</p>
          </motion.div>
        )}
        
        {/* Creator Attribution - Only for Art Gallery */}
        {!apiEndpoint.includes('corsono') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: '48px',
              textAlign: 'center',
              padding: '32px',
              background: 'rgba(255, 215, 0, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '16px',
              alignItems: 'center',
              gap: '12px'
            }}>
              <img 
                src="/images/logo.png" 
                alt="D'Corsono Logo" 
                style={{ 
                  height: '32px', 
                  width: 'auto',
                  filter: 'brightness(1.1)',
                  opacity: 0.8
                }}
              />
              <h3 style={{ 
                margin: 0, 
                color: '#ffd700',
                fontSize: '1.4rem',
                fontWeight: '600'
              }}>
                FALSE!
              </h3>
            </div>
            <p style={{ 
              color: '#ccc', 
              fontSize: '1rem',
              lineHeight: '1.6',
              margin: '0',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Everything created by <strong style={{ color: '#ffd700' }}>Danny</strong>, Founder of Corsono
            </p>
            <p style={{ 
              color: '#999', 
              fontSize: '0.9rem',
              lineHeight: '1.5',
              margin: '16px 0 0 0',
              fontStyle: 'italic'
            }}>
              A visual exploration of consciousness, spirituality, and creative expression
            </p>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </motion.button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Enlarged view"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;