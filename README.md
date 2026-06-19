Project Name:
Document Signature App

Project Description:
A full-stack MERN application for uploading, signing, and managing PDF documents digitally.

Features:
User Authentication (Register/Login)
Upload PDF document
Public shareable signing links
Generate signed PDFs
Audit trail for tracking document activity
Secure document storage
Deployment support

Tech Stack:

Frontend :
React.js
Axios
React Router

Backend:
Node.js
Express.js

Database:
MongoDB Atlas

Other Tools:
PDF-lib
Multer
JWT Authentication

Project Structure:

backend 
frontend
uploads
signed

Installation
Clone repository

git clone

Install frontend dependencies:

cd frontend
npm install


Install backend dependencies:

cd backend
npm install

Environment Variables

Create a .env file inside backend:

PORT=5000
MONGO_URI=mongodb://testuser:Testpass123@ac-oexegdf-shard-00-00.f7bzd41.mongodb.net:27017,ac-oexegdf-shard-00-01.f7bzd41.mongodb.net:27017,ac-oexegdf-shard-00-02.f7bzd41.mongodb.net:27017/?ssl=true&replicaSet=atlas-eyg6st-shard-0&authSource=admin&appName=Cluster0

JWT_SECRET=mysecretkey

Run Project:

Backend:

npm run dev

Frontend:

npm run dev

Deployment:

Frontend deployed on Vercel
Backend deployed on Render
Database hosted on MongoDB Atlas

Try app here: https://document-signiture-app.vercel.app

Author:
Sanskruti Chikate
GitHub:sanskrutichikate
