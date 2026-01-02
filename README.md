# Sports Turf Booking Application - MERN Stack

## Project Overview
A full-stack sports turf/court booking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to view available time slots, book courts, and manage their bookings.

## Features Implemented

### Core Features 
- **Booking Page**: View available time slots for courts/turfs
- **Slot Booking**: Select and book available time slots
- **Modern UI**: Built with React.js and Tailwind CSS
- **Mobile Responsive**: Fully responsive design
- **RESTful API**: Node.js + Express.js backend
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based user authentication (Bonus)

### Additional Features (Extra)
- User Registration & Login System
- Dashboard for viewing bookings
- Court filtering by sport and time
- Sample data generation for testing
- Real-time slot availability updates
- Form validation and error handling

## 🏗️ Tech Stack

### **Frontend**
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios for API calls
- React Hot Toast for notifications
- React Icons

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- CORS enabled

### **Development Tools**
- Postman for API testing
- MongoDB Compass (optional)
- Git for version control

## 📁 Project Structure

```
sports-turf-booking/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # API controllers
│   │   ├── middleware/      # Auth & error middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Validation helpers
│   │   └── server.js       # Entry point
│   ├── .env.example        # Environment variables template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context (Auth)
│   │   ├── pages/          # Main pages
│   │   ├── services/       # API services       
│   │   └── App.jsx         # Main app component
│   ├── .env.example        # Frontend env variables
│   └── package.json
└── README.md
```

## 📡 API Endpoints

### **Authentication**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### **Courts**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/courts` | Get all courts (filter by sport/date) | No |
| GET | `/api/courts/:id` | Get single court details | No |
| POST | `/api/courts/seed` | Create sample courts | Yes |

### **Bookings**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/bookings` | Create new booking | Yes |
| GET | `/api/bookings/mybookings` | Get user's bookings | Yes |
| GET | `/api/bookings` | Get all bookings (Admin) | Yes |

### **Health Check**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health status |
