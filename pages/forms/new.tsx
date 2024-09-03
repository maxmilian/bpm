import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import Layout from '../../components/Layout/Layout';
import FormBuilder from '../../components/FormBuilder/FormBuilder';
import FormPreview from '../../components/FormPreview/FormPreview';

const CreateForm: React.FC = () => {
  const [schema, setSchema] = useState({});
  const router = useRouter();

  const handleSchemaChange = (newSchema: any) => {
    setSchema(newSchema);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: schema.title || 'Untitled Form',
          description: schema.description || '',
          schema: schema,
        }),
      });

      if (response.ok) {
        message.success('表單保存成功');
        router.push('/forms');
      } else {
        message.error('保存失敗，請重試');
      }
    } catch (error) {
      console.error('Error saving form:', error);
      message.error('保存時發生錯誤');
    }
  };

  return (
    <Layout>
      <h1>創建新表單</h1>
      <FormBuilder initialSchema={schema} onSchemaChange={handleSchemaChange} />
      <FormPreview schema={schema} />
      <button onClick={handleSave}>保存表單</button>
    </Layout>
  );
};

export default CreateForm;