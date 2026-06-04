import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from './config/db';

import transactionRoutes from './routes/transaction.routes';
import authRoutes from './routes/auth.routes';
import analyticsRoutes from './routes/analytics.routes';
import profileRoutes from './routes/profile.routes';

dotenv.config();


// Track DB connection status
let isDBConnected = false;

// Connect to DB and set status
connectDB()
  .then(() => {
    isDBConnected = true;
  })
  .catch(() => {
    isDBConnected = false;
  });



const app = express();


app.get('/', (_req, res) => {
  res.send('API Running');
});

// Middleware to check DB connection (after health route)
app.use((req, res, next) => {
  if (!isDBConnected) {
    return res.status(503).json({ error: 'Database not connected' });
  }
  next();
});

app.use(cors());
app.use(express.json());

app.use(
  '/api/transactions',
  transactionRoutes
);

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/analytics',
  analyticsRoutes
);

app.use(
  '/api/profile',
  profileRoutes
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});