import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';
import User from '../models/User.js';

// Setup Express app for testing
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API Endpoints', () => {

    // --- ADD THIS 'beforeAll' HOOK ---
    // It connects to the in-memory database provided by @shelf/jest-mongodb
    beforeAll(async () => {
        // The preset provides the MONGO_URL in the environment variables
        await mongoose.connect(process.env.MONGO_URL);
    });

    // --- ADD THIS 'afterAll' HOOK ---
    // It disconnects from the database and stops the Mongoose connection
    afterAll(async () => {
        await mongoose.disconnect();
    });

    // Clear the User collection before each individual test
    beforeEach(async () => {
        await User.deleteMany({});
    });
    
    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('name', 'Test User');
        });

        it('should fail to register a user with an existing email', async () => {
            // First, create a user
            await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                });

            // Then, try to register with the same email
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Another User',
                    email: 'test@example.com',
                    password: 'password456',
                });
            
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('msg', 'User already exists');
        });
    });
});