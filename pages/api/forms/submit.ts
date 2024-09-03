import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/mongodb';
import Form from '../../../../models/Form';
import Submission from '../../../../models/Submission';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const form = await Form.findById(id);
      if (!form) {
        return res.status(404).json({ error: '找不到表單' });
      }

      const submission = await Submission.create({
        formId: id,
        data: req.body,
        // 如果有用戶系統，這裡可以添加 submittedBy
      });

      res.status(201).json(submission);
    } catch (error) {
      res.status(500).json({ error: '無法提交表單' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}