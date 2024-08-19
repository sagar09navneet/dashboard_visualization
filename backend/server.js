import dotenv from 'dotenv';
import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes.js'; 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUri = 'mongodb://localhost:27017/myDatabase';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Use routes
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
