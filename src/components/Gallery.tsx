import React, { useEffect, useRef, useState } from 'react';

type Aspect = 'square' | 'wide';

interface GalleryProps {
  apiEndpoint: string;
  uploadEndpoint: string;
  title: string;
  aspectRatio?: Aspect;
}

interface GalleryItem {
  url: string;
}

const Gallery: React.FC<GalleryProps> = ({ apiEndpoint, uploadEndpoint, title, aspectRatio = 'square' }) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  async function fetchGallery() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(apiEndpoint);
      if (!res.ok) throw new Error('Failed to load gallery');
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to load gallery');
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGallery();
  }, [apiEndpoint]);

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setStatus('');
    if (progressRef.current) progressRef.current.style.display = 'block';
    if (barRef.current) barRef.current.style.width = '0%';

    const form = new FormData();
    Array.from(files).forEach(f => form.append('files', f));

    try {
      const xhr = new XMLHttpRequest();
      const promise = new Promise<void>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 100);
            if (barRef.current) barRef.current.style.width = pct + '%';
          }
        });
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) resolve();
            else reject(new Error('Upload failed: ' + xhr.status));
          }
        };
        xhr.open('POST', uploadEndpoint);
        xhr.send(form);
      });
      await promise;
      setStatus('Upload complete');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await fetchGallery();
    } catch (e) {
      setStatus('Upload failed');
    } finally {
      setTimeout(() => {
        if (progressRef.current) progressRef.current.style.display = 'none';
        if (barRef.current) barRef.current.style.width = '0%';
      }, 600);
    }
  }

  return (
    <div className="gallery-page" style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <div className="heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ color: 'gold' }}>{title}</h1>
      </div>

      <section className="upload-card" id="drop-zone">
        <h2 style={{ marginTop: 0 }}>Upload</h2>
        <p>Drag and drop files here or select below</p>
        <div className="upload-row">
          <input ref={fileInputRef} type="file" multiple accept="image/*" />
          <button className="btn btn-primary" onClick={() => uploadFiles(fileInputRef.current?.files || null)}>Upload</button>
          <div style={{ color: '#bbb' }}>{status}</div>
        </div>
        <div id="progress" ref={progressRef} style={{ display: 'none', background: '#333', borderRadius: 8, height: 6, marginTop: 12 }}>
          <div id="bar" ref={barRef} style={{ background: 'gold', height: '100%', width: '0%', transition: 'width 0.3s' }}></div>
        </div>
      </section>

      <section>
        {isLoading && <div className="empty">Loading...</div>}
        {error && !isLoading && <div className="empty">{error}</div>}
        {!isLoading && !error && items.length === 0 && (
          <div className="empty">No items yet. Upload above to get started.</div>
        )}

        <div
          id="gallery"
          className="grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}
        >
          {items.map((item, i) => (
            <div key={i} className="card">
              <div
                className="image-container"
                onClick={() => setModalSrc(item.url)}
                style={{ aspectRatio: aspectRatio === 'square' ? '1 / 1' : '4 / 3', width: '100%', overflow: 'hidden', background: '#111', cursor: 'pointer', borderRadius: 8 }}
              >
                <img src={item.url} alt="Gallery image" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalSrc && (
        <div
          className="modal show"
          role="dialog"
          onClick={() => setModalSrc(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
        >
          <img src={modalSrc} alt="Preview" className="modal-content" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
};

export default Gallery;


