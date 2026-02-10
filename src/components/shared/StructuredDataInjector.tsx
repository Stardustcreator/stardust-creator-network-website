'use client';

import React from 'react';

interface StructuredDataInjectorProps {
  schemas: Record<string, any>[];
}

const StructuredDataInjector: React.FC<StructuredDataInjectorProps> = ({ schemas }) => {
  if (!schemas || schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
};

export default StructuredDataInjector;
