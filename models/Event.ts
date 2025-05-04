import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  Date: Date,
});

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
