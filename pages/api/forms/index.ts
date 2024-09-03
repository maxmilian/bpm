import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Form from '../../../models/Forms';

interface FormData {
  title: string;
  description?: string;
  schema: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const forms = await Form.find({});
        res.status(200).json(forms);
      } catch (error) {
        console.error('Error fetching forms:', error);
        res.status(500).json({ error: '無法獲取表單列表' });
      }
      break;

    case 'POST':
      try {
        const { title, description, schema } = req.body as FormData;
        const form = await Form.create({ title, description, schema });
        res.status(201).json(form);
      } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ error: '無法創建表單' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}