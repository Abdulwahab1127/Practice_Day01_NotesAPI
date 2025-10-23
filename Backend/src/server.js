import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';

//Connect to Database
import connectDB from './config/database.js';


const PORT = process.env.PORT || 3080;
//Database Connection
connectDB();

//Start the server (for local development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for Vercel serverless
export default app;