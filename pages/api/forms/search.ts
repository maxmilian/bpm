import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Form from '../../../models/Form';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const forms = await Form.find({
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      });
      res.status(200).json(forms);
    } catch (error) {
      res.status(500).json({ error: '搜索表單時發生錯誤' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}