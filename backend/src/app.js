import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js'
import profileRoutes from './routes/profile.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'CV Management API is running',
  });
});

export default app;