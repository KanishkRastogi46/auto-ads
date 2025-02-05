import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import connectDB from './src/lib/dbConnect.js';

config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    let isConnected = connectDB();
    if (isConnected !== 1) console.error("DB connection failed");
    else console.log("DB connected successfully");
    
    console.log(`Server is running on port ${port}`);
});