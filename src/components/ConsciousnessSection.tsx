import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ConsciousnessSection: React.FC = () => {
  const flowNodes = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Add staggered animations to flow nodes
    flowNodes.current.forEach((node, index) => {
      if (node) {
        node.style.animationDelay = (index * 0.5) + 's';
      }
    });
  }, []);

  const flowSteps = [
    { id: 'awareness', label: 'Awareness' },
    { id: 'intention', label: 'Intention' },
    { id: 'action', label: 'Action' },
    { id: 'manifestation', label: 'Manifestation' }
  ];

  return (
    <section className="consciousness-section">
      <div className="container">
        <div className="consciousness-content">
          <motion.div 
            className="consciousness-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="consciousness-title">Consciousness as an Act</h2>
            <p className="consciousness-description">
              Like Hatsu in the world of Hunter x Hunter, consciousness is not a static state 
              but a dynamic force that manifests through action. Every choice, every creation, 
              every moment of awareness is an act of consciousness.
            </p>
            <p className="consciousness-description">
              This website is not just a collection of pages, but a living expression of that 
              principle. Each section represents a different way consciousness manifests in the world.
            </p>
            <Link to="/inner-library" className="btn btn-outline">Explore the Philosophy</Link>
          </motion.div>
          
          <motion.div 
            className="consciousness-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flow-diagram">
              {flowSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <motion.div
                    className="flow-node"
                    data-node={step.id}
                    ref={el => flowNodes.current[index] = el}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span>{step.label}</span>
                  </motion.div>
                  {index < flowSteps.length - 1 && (
                    <motion.div 
                      className="flow-arrow"
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (index * 0.2) + 0.3 }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConsciousnessSection;
