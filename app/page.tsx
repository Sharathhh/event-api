'use client';
import { Red_Hat_Display } from 'next/font/google';
import { useEffect, useState } from 'react';

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
};

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch all events
  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Create or Update event
  const handleSubmit = async () => {
    if (!title || !description) return;

    const payload = { title, description };

    if (editId) {
      // Update
      await fetch(`/api/events/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setEditId(null);
    } else {
      // Create
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setTitle('');
    setDescription('');
    setDate('');
    fetchEvents();
  };

  // Delete event
  const handleDelete = async (id: string) => {

    const confirmDelete= confirm("Are you sure want to delete?")

    if(!confirmDelete){
     return
    }
    try{
      await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
      fetchEvents();


    }catch(err){
      console.log(err)
    }
    
    
  };

  // Load for editing
  const handleEdit = (event: Event) => {
    setEditId(event._id);
    setTitle(event.title);
    setDescription(event.description);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Event Manager</h1>

      <div className="flex flex-col gap-2 mb-4">
        <input
          className="border p-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="border p-2"
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? 'Update Event' : 'Create Event'}
        </button>
      </div>


      <div className='p-4'>
        

      <ul className="space-y-4">
        {events.map(event => (
          <li key={event._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(event)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      </div>


    </div>
  );
}
