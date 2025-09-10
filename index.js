import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//configs
import connectDB from './config/db.js';

//routes
import authRoutes from './routes/authRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.listen(PORT, async () => {
  connectDB(process.env.MONGO_URI);
  console.log(`Server is running on port ${PORT}`);
});
