# Lost and Found Platform

A comprehensive web-based application designed to help users report, find, and claim lost items. The platform features an intelligent ownership verification system and real-time communication between users.

**Live Link:** [https://lost-and-found-qjkj.onrender.com](https://lost-and-found-qjkj.onrender.com)

## Features

- **User Authentication:** Secure signup and login powered by Firebase Auth.
- **Lost & Found Posts:** Users can post details and images of items they have lost or found.
- **AI-Powered Ownership Verification:** Uses Google Gemini AI to semantically compare a claimant's description with the actual item details to verify ownership.
- **Real-Time Chat:** Integrated messaging system using Socket.io, allowing finders and owners to communicate instantly.
- **Email Verification & Password Reset:** Secure code-based verification using Nodemailer.
- **Responsive Design:** A beautiful, responsive user interface built for all device sizes.

## Tools & Technologies

### Frontend (`Lost-and-found-client`)
- **Framework:** React, Vite
- **Styling:** Tailwind CSS, DaisyUI
- **Routing:** React Router DOM
- **Authentication:** Firebase Auth
- **State/Data Fetching:** Axios
- **Real-Time Communication:** Socket.io-client
- **UI Components:** SweetAlert2, Lucide React, Heroicons
- **Image handling:** Compressor.js

### Backend (`Lost-and-found-server`)
- **Environment:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **AI Integration:** Google Gemini 1.5 Flash API (via `@google/generative-ai` or `axios`)
- **Real-Time Communication:** Socket.io
- **Emails:** Nodemailer
- **Security:** bcryptjs, jsonwebtoken (JWT)

---

## Environment Variables (.env)

To run this project locally, you must set up two `.env` files—one for the client and one for the server.

### 1. Client Environment (`Lost-and-found-client/.env`)
Create a `.env` file in the `Lost-and-found-client` directory:
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_measurementId=your_firebase_measurement_id

# Backend API URL (Local or Deployed)
VITE_backendUrl=http://localhost:5002 
```

### 2. Server Environment (`Lost-and-found-server/.env`)
Create a `.env` file in the `Lost-and-found-server` directory:
```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
FRONTEND_URL=http://localhost:5173

JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_nodemailer_email_address
EMAIL_PASS=your_nodemailer_app_password
GEMINI_API_KEY=your_gemini_api_key

backendUrl=http://localhost:5002
```

---

## Running Locally

### Starting the Backend Server
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd Lost-and-found-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (uses nodemon):
   ```bash
   npm run start
   ```

### Starting the Frontend Client
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd Lost-and-found-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the client development server:
   ```bash
   npm run dev
   ```
