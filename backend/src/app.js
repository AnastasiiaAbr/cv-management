import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js'
import profileRoutes from './routes/profile.routes.js';
import categoryRoutes from './routes/category.routes.js';
import attributeRoutes from './routes/attribute.routes.js';
import positionRoutes from './routes/position.routes.js';
import cvRoutes from './routes/cv.routes.js';
import userRoutes from "./routes/user.routes.js";
import profileAttributeRoutes from './routes/profileAttr.routes.js';
import projectRoutes from './routes/projects.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/profile', profileRoutes);

app.use('/categories', categoryRoutes);

app.use("/attributes", attributeRoutes);

app.use('/positions', positionRoutes);

app.use("/cvs", cvRoutes);

app.use("/users", userRoutes);

app.use('/profile-attributes', profileAttributeRoutes);

app.use('/projects', projectRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'CV Management API is running',
  });
});

export default app;