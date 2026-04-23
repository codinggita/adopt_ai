import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import connectDB from './config/db.js';

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Base route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
