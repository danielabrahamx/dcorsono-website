import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Gallery from './components/Gallery';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/corsono-gallery" 
            element={
              <Gallery
                apiEndpoint="/api/corsono/gallery"
                uploadEndpoint="/api/corsono/gallery/upload"
                title="Corsono Gallery"
                aspectRatio="wide"
              />
            } 
          />
          <Route 
            path="/art-gallery" 
            element={
              <Gallery
                apiEndpoint="/api/art/gallery"
                uploadEndpoint="/api/art/gallery/upload"
                title="Art Gallery"
                aspectRatio="square"
              />
            } 
          />
          {/* Placeholder routes for future sections */}
          <Route path="/corsono" element={<div style={{padding: '100px 20px', textAlign: 'center', color: '#ccc'}}><h1>Corsono Collection Coming Soon</h1></div>} />
          <Route path="/inner-library" element={<div style={{padding: '100px 20px', textAlign: 'center', color: '#ccc'}}><h1>Inner Library Coming Soon</h1></div>} />
          <Route path="/about" element={<div style={{padding: '100px 20px', textAlign: 'center', color: '#ccc'}}><h1>About Page Coming Soon</h1></div>} />
          <Route path="/contact" element={<div style={{padding: '100px 20px', textAlign: 'center', color: '#ccc'}}><h1>Contact Page Coming Soon</h1></div>} />
        </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
