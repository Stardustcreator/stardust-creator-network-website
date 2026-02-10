import React from 'react';
import { SchemaObject } from 'schema-dts';
import { jsonLdScriptProps } from 'react-schemaorg';

interface StructuredDataInjectorProps {
  schemas: SchemaObject[];
}

export const StructuredDataInjector: React.FC<StructuredDataInjectorProps> = ({ schemas }) => {
  return (
    <>
      {schemas.map((schema, index) => (
        <script 
          key={index} 
          {...jsonLdScriptProps(schema)} 
        />
      ))}
    </>
  );
};