import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import Layout from '../../components/Layout/Layout';
import FormBuilder from '../../components/FormBuilder/FormBuilder';
import FormPreview from '../../components/FormPreview/FormPreview';

const EditForm: React.FC = () => {
  const [form, setForm] = useState(null);
  const [schema, setSchema] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/forms/${id}`)
        .then(res => res.json())
        .then(data => {
          setForm(data);
          setSchema(data.schema);
        });
    }
  }, [id]);

  const handleSchemaChange = (newSchema: any) => {
    setSchema(newSchema);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/forms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: schema.title || form.title,
          description: schema.description || form.description,
          schema: schema,
        }),
      });

      if (response.ok) {
        message.success('表單更新成功');
        router.push('/forms');
      } else {
        message.error('更新失敗，請重試');
      }
    } catch (error) {
      console.error('Error updating form:', error);
      message.error('更新時發生錯誤');
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Layout>
      <h1>編輯表單: {form.title}</h1>
      <FormBuilder initialSchema={schema} onSchemaChange={handleSchemaChange} />
      <FormPreview schema={schema} />
      <button onClick={handleSave}>保存更改</button>
    </Layout>
  );
};

export default EditForm;