import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { config } from 'dotenv';
import connectDB from './src/lib/dbConnect.js';
import authRouter from './src/routes/auth.route.js';

config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json({message: 'Home Page'});
});

app.listen(port, () => {
    let isConnected = connectDB();
    if (isConnected !== 1) console.error("DB connection failed");
    else console.log("DB connected successfully");
    
    console.log(`Server is running on port ${port}`);
});