import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongoose';
import { Event } from '@/models/Event';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const events = await Event.find();
    return res.status(200).json(events);
  }

  if (req.method === 'POST') {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }

    const newEvent = await Event.create({ title, description });
    return res.status(201).json(newEvent);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
