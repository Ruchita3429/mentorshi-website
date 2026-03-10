const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:3000',
       'http://localhost:3001', 
      'https://mentorship-platform.vercel.app',
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/llm', require('./routes/llmRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Backend API is running' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

