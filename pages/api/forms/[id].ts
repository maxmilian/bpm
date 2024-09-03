import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Form from '../../../models/Form';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const form = await Form.findById(id);
        if (!form) {
          return res.status(404).json({ error: '找不到表單' });
        }
        res.status(200).json(form);
      } catch (error) {
        res.status(500).json({ error: '無法獲取表單' });
      }
      break;
    case 'PUT':
      try {
        const form = await Form.findByIdAndUpdate(id, req.body, { new: true });
        if (!form) {
          return res.status(404).json({ error: '找不到表單' });
        }
        res.status(200).json(form);
      } catch (error) {
        res.status(500).json({ error: '無法更新表單' });
      }
      break;
    case 'DELETE':
      try {
        const form = await Form.findByIdAndDelete(id);
        if (!form) {
          return res.status(404).json({ error: '找不到表單' });
        }
        res.status(200).json({ message: '表單已刪除' });
      } catch (error) {
        res.status(500).json({ error: '無法刪除表單' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
