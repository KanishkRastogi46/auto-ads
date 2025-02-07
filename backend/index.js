import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { config } from 'dotenv';
import morgan from 'morgan';
import connectDB from './src/lib/dbConnect.js';
import authRouter from './src/routes/auth.route.js';
import chatRouter from './src/routes/chats.route.js';
import adsRouter from './src/routes/ads.route.js';

// initialize dotenv
config();

// initialize express app
const app = express();
const port = process.env.PORT;

// middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(morgan('dev'));
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

// api routes
app.use('/auth', authRouter);
app.use('/chats', chatRouter);
app.use('/ads', adsRouter);

app.get('/', (req, res) => {
    res.json({message: 'Home Page'});
});


// connect to db and start server
app.listen(port, async () => {
    let isConnected = await connectDB();
    if (isConnected !== 1) console.error("DB connection failed");
    else console.log("DB connected successfully");
    
    console.log(`Server is running on port ${port}`);
});