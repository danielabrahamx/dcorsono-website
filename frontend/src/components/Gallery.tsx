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
        // Corsono Gallery Images ONLY - no product images
        { name: 'Corsono Image 1', url: '/images/crsn-1.JPG' },
        { name: 'Corsono Image 2', url: '/images/crsn-2.jpeg' },
        { name: 'Corsono Image 3', url: '/images/crsn-3.jpg' },
        { name: 'Corsono Image 4', url: '/images/crsn-4.jpg' },
        { name: 'Corsono Image 5', url: '/images/crsn-5.JPG' },
        { name: 'Corsono Image 6', url: '/images/crsn-6.JPG' },
        { name: 'Corsono Image 7', url: '/images/crsn-7.jpg' },
        { name: 'Corsono Image 8', url: '/images/crsn-8.jpg' },
        { name: 'Corsono Image 9', url: '/images/crsn-9.jpg' },
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
      <div className="gallery-loading">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-text">Loading Gallery...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      {/* Hero Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="gallery-hero"
      >
        <div className="container">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="gallery-title"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="gallery-subtitle"
          >
            Curated collection of artistic expression
          </motion.p>
        </div>
      </motion.header>

      <div className="container">
        {/* Upload Area - Only visible to authenticated admin */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="upload-area luxury-upload"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="upload-header">
              <img 
                src="/images/logo.png" 
                alt="D'Corsono Upload" 
                className="upload-logo"
              />
              <h3>Upload New Images</h3>
              <p>Drag and drop your images here or click to select</p>
            </div>
            
            <div className="upload-actions">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="btn btn-primary">
                Select Files
              </label>
            </div>

            {uploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="upload-progress"
              >
                <div className="progress">
                  <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p>Uploading... {uploadProgress}%</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Gallery Grid */}
        {items.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="gallery-container"
          >
            <div className="gallery-grid">
              {items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + (index * 0.1),
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className={`gallery-item ${aspectRatio}`}
                  onClick={() => setSelectedImage(item.url)}
                >
                  <div className="gallery-item-inner">
                    <div className="image-container">
                      <img
                        src={item.url}
                        alt={item.name}
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <span className="view-icon">👁️</span>
                          <span className="view-text">View</span>
                        </div>
                      </div>
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="gallery-empty"
          >
            <div className="empty-icon">🎨</div>
            <h3>Gallery Empty</h3>
            <p>No images available yet. Upload your first masterpiece to begin.</p>
          </motion.div>
        )}
        
        {/* Creator Attribution - Only for Art Gallery */}
        {!apiEndpoint.includes('corsono') && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="creator-attribution"
          >
            <div className="attribution-content">
              <img 
                src="/images/logo.png" 
                alt="D'Corsono Logo" 
                className="attribution-logo"
              />
              <div className="attribution-text">
                <h3>The Sound of the Heart</h3>
                <p>Everything created by <strong>Danny</strong>, Founder of Corsono</p>
              </div>
            </div>
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
            className="image-modal"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="modal-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              ×
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="modal-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;