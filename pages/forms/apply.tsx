import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form } from '@xrender/form-render';

export default function ApplyForm() {
  const [form, setForm] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/forms/${id}`)
        .then(res => res.json())
        .then(data => setForm(data));
    }
  }, [id]);

  const handleSubmit = (values) => {
    // 這裡需要實現提交邏輯
    console.log('提交的數據:', values);
    // 提交後的處理，例如返回列表頁或顯示成功消息
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h1>申請表單: {form.title}</h1>
      <Form
        schema={form.fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
