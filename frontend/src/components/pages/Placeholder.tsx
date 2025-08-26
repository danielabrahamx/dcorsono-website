import React from 'react';

interface Props {
  title: string;
  description?: string;
}

const Placeholder: React.FC<Props> = ({ title, description }) => {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'gold', marginBottom: 12 }}>{title}</h1>
        {description && <p style={{ color: '#bbb' }}>{description}</p>}
      </div>
    </div>
  );
};

export default Placeholder;


