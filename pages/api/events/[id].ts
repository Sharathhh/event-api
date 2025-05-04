import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongoose';
import { Event } from '@/models/Event';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json(event);
  }

  if (req.method === 'PUT') {
    const { title, description, date } = req.body;
    const updated = await Event.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json({ message: 'Event deleted' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
