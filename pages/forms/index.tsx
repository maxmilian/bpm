import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import FormList from '../../components/FormList/FormList';

export default function FormListPage() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch('/api/forms')
      .then(res => res.json())
      .then(data => setForms(data));
  }, []);

  return (
    <Layout>
      <h1>表單列表</h1>
      <FormList forms={forms} />
      <Link href="/forms/new">創建新表單</Link>
    </Layout>
  );
}