
 require('dotenv').config()


 import mongoose from 'mongoose';

 export const connectToDatabase = async () => {
   if (mongoose.connections[0].readyState) return;
 
   await mongoose.connect(process.env.MONGODB_URL!, {
     dbName: 'Events',
   });
 
   console.log('MongoDB connected');
 };
 