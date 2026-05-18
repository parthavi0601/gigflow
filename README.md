# GigFlow 

GigFlow is a modern, responsive Smart Leads Dashboard built with the MERN stack. Designed for sales professionals, it provides a comprehensive overview of pipeline health, actionable insights, and robust lead management capabilities.

## Key Features
- **Lead Management:** Seamlessly add, track, and categorize leads with intuitive interfaces.
- **Pipeline Health Dashboard:** Real-time statistics, conversion rates, and recent activity tracking.
- **Secure Authentication:** JWT-based login with a multi-step OTP verification flow powered by Resend API.
- **Fully Responsive Design:** A beautiful, dynamic user interface that works flawlessly across desktops, tablets, and all mobile devices.
- **Role-Based Access:** Distinguishes between 'admin' and 'sales' users for proper data access control.

## Technology Stack
- **Frontend:** React 18, Vite, TypeScript, Vanilla CSS (with modern responsive grids), Lucide Icons, Axios, Zustand.
- **Backend:** Node.js, Express, TypeScript, Mongoose, Zod (Validation), bcryptjs, jsonwebtoken.
- **Database:** MongoDB Atlas.
- **Email Service:** Resend API (for high-deliverability OTP emails).
- **Deployment:** Vercel (Frontend) & Render (Backend).

## Local Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB instance)
- Resend API Key (for email verification)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/gigflow.git
cd gigflow
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   CLIENT_URL=http://localhost:5173
   RESEND_API_KEY=your_resend_api_key
   SENDER_EMAIL=noreply@yourdomain.com
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the client directory (in a new terminal):
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Production Deployment
- **Frontend (Vercel):** Deploy the `client` directory. Ensure you set the `VITE_API_URL` environment variable to your live backend URL (e.g., `https://gigflow-api.onrender.com/api`).
- **Backend (Render):** Deploy the `server` directory. Ensure you configure all backend environment variables (Database URI, JWT Secret, Resend API key) in the Render dashboard.

<img width="1915" height="848" alt="image" src="https://github.com/user-attachments/assets/e53bc22b-4fc5-4657-8c0b-97bf3d221e1c" />

<img width="1918" height="868" alt="image" src="https://github.com/user-attachments/assets/fd7b21fe-68be-4f92-86b9-ac3ae0d175ec" />
<img width="1916" height="856" alt="image" src="https://github.com/user-attachments/assets/3f03c62b-b19b-40f0-8fc0-8b3f90ba8554" />
<img width="1913" height="856" alt="image" src="https://github.com/user-attachments/assets/e1953eb0-6290-4aa8-85e4-b8ddc4fd2c89" />

