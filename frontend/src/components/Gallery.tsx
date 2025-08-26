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
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load gallery:', error);
      setLoading(false);
    }
  }, [apiEndpoint]);

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
            <div className="upload-emoji">📸</div>
            <h3>Upload Images</h3>
            <p style={{ margin: '16px 0', color: '#999' }}>Drag and drop your images here or click to select</p>
            
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