import express from 'express';
import cors from 'cors';
import notesRouter from './routes/notes.js';
import userRouter from './routes/users.js';
import  errorHandler  from './middleware/errorHandler.js';

const app = express();


// CORS HEADERS SETUP 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(cors({
  origin: "http://localhost:3000", // your React dev URL
  credentials: true
}));


//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api', notesRouter);
app.use('/api/user', userRouter);

//Error Handling Middleware
app.use(errorHandler);

export default app;