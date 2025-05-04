# 📅 Event Management API
A simple RESTful API for managing events, built with Next.js, Express, and MongoDB. It supports CURD operations.

## 🚀 Features
Create a new event

Get all events

Get a single event by ID

Update an existing event

Delete an event


## 🔬 Tech Stacks

 - Node.js

 - TypeScript

 - Next.js (Api used)

 - MongoDB (mongoose schema)

 - Node.js

▶️ Running the Project

`npm run dev`

visit `http:localhost:3000` to use the app.


## API Endpoints

GET `/api/events/:id`      Get a specified event
POST `/api/events/`        Create a single event
PUT `/api/events/:id`      Update an existing event
DELETE `/api/events/:id`   Delete an event

## 📁 Project Structure

/app
   /page.tsx       -> Frontend

/pages
     /api
        event.ts    ->Event API


/models
     Events.ts      ->Mongoose Schema

/lib
    mongoose.ts     ->MongoDB connection



    



