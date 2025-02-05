import mongoose from "mongoose";


export default async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) return console.error("MONGODB_URI is not defined");
    
        let conn = await mongoose.connect(process.env.MONGODB_URI);
        // console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn.connection.readyState;

    } catch (error) {
        console.error(error);
        return error;
    }
};