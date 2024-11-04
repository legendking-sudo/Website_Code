// index.js
import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import { config } from 'dotenv';
import cors from 'cors';
import uploadOnCloudinary from './cloudinary.js'; 
import { upload } from './multer-config.js'; 
import { Property, Owner, NormalUser } from './models/userModel.js';

config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5174', // Allow requests from your frontend
  credentials: true,               // Allow cookies and credentials
}));

const PORT = process.env.PORT || 5000;

// Middleware
app.use(json());


// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'simple_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true },
}));

// Connect to MongoDB
connect(process.env.MONGODB_URI, {
 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
// app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Hello, World!');
})
app.use('/api/auth', authRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
