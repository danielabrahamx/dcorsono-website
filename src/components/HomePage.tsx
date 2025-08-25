import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import FacetsSection from './FacetsSection';
import ConsciousnessSection from './ConsciousnessSection';
import CorsonoSection from './CorsonoSection';
import InnerGallerySection from './InnerGallerySection';
import InnerLibrarySection from './InnerLibrarySection';
import ContactSection from './ContactSection';

const HomePage: React.FC = () => {
  return (
    <div className="main-content">
      <HeroSection />
      <FacetsSection />
      <ConsciousnessSection />
      <CorsonoSection />
      <InnerGallerySection />
      <InnerLibrarySection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
