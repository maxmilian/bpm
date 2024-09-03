import React from 'react';
import FormRender from 'form-render';

interface FormPreviewProps {
  schema: any;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  return (
    <div className="form-preview">
      <h2>Form Preview</h2>
      <FormRender schema={schema} />
    </div>
  );
};

export default FormPreview;