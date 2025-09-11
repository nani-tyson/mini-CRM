import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//configs
import connectDB from './config/db.js';

//routes
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/stats', statsRoutes);

app.listen(PORT, async () => {
  connectDB(process.env.MONGO_URI);
  console.log(`Server is running on port ${PORT}`);
});
