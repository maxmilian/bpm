import React, { useState } from 'react';
import { SchemaBuilder } from '@xrenders/schema-builder';

interface FormBuilderProps {
  initialSchema?: any;
  onSchemaChange: (schema: any) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ initialSchema, onSchemaChange }) => {
  const [schema, setSchema] = useState(initialSchema || {});

  const handleSchemaChange = (newSchema: any) => {
    setSchema(newSchema);
    onSchemaChange(newSchema);
  };

  return (
    <div className="form-builder">
      <SchemaBuilder schema={schema} onChange={handleSchemaChange} />
    </div>
  );
};

export default FormBuilder;