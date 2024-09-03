import React from 'react';
import Link from 'next/link';

interface Form {
  _id: string;
  title: string;
}

interface FormListProps {
  forms: Form[];
}

const FormList: React.FC<FormListProps> = ({ forms }) => {
  return (
    <ul className="form-list">
      {forms.map((form) => (
        <li key={form._id}>
          <Link href={`/forms/${form._id}/edit`}>
            {form.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FormList;