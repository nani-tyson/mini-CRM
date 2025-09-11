# mini-CRM

Mini CRM Application (MERN Stack)
This is a complete, full-stack Mini Customer Relationship Management (CRM) application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It was developed as a comprehensive project demonstrating key web development skills.

Live Demo
Frontend URL: https://minicrm-ashen.vercel.app/

Features
Secure User Authentication: Users can register and log in using JWT-based authentication with persisted sessions.

Customer Management: Authenticated users can perform full CRUD (Create, Read, Update, Delete) operations on customers. Includes server-side search and pagination.

Lead Management: Each customer has an associated list of leads/opportunities, with full CRUD functionality nested under the customer.

Dynamic Dashboard: A real-time reporting dashboard displaying key statistics (total customers, leads, converted value) and data visualizations.

Data Visualization: Includes a doughnut chart for lead status distribution and a bar chart for monthly performance using Chart.js.

Robust Backend: The API includes request validation using Joi to ensure data integrity and provide clear error messages.

Tested API: Key API endpoints are unit-tested using Jest and Supertest with an in-memory MongoDB server.

Modern & Responsive UI: The frontend is built with React and Tailwind CSS, providing a sleek, modern, and fully responsive "Slate & Sky" dark-mode interface that works on all devices.

Professional State Management: Utilizes Redux Toolkit and RTK Query for efficient and scalable state and cache management.

Monorepo Structure: The project is organized with backend and frontend folders in a single repository for easy management and deployment.

Tech Stack
Frontend: React, Redux Toolkit (RTK Query), React Router, Chart.js, Tailwind CSS, Vite

Backend: Node.js, Express.js, MongoDB (with Mongoose)

Authentication: JWT (JSON Web Tokens), bcryptjs

Validation: Joi

Testing: Jest, Supertest

Setup & Installation
Prerequisites
Node.js (v18 or higher recommended)

npm or yarn

MongoDB (a local instance or a cloud service like MongoDB Atlas)

1. Backend Setup
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory and add the following variables:
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_super_secret_key
LOCALHOST_URL=http://localhost:5173
DEPLOYED_URL=[https://minicrm-ashen.vercel.app](https://minicrm-ashen.vercel.app)

# Run the backend server for development
npm run dev

# Run the tests
npm test

2. Frontend Setup
# From the root, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env.local file in the frontend directory and add the following:
# Remember to use your deployed backend URL for production builds
VITE_BACKEND_URL=http://localhost:5000

# Run the frontend development server
npm run dev
