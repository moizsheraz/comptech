import express from 'express';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middleware/error.js';
import userRouter from './routes/user.route.js';
import eventRouter from './routes/event.route.js';
import teamRouter from './routes/team.route.js';

const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the User Registration API");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/health", (req, res) => {
  res.status(200).json("Health checking");
});

app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/team', teamRouter);

app.use(errorMiddleware);

export default app;
