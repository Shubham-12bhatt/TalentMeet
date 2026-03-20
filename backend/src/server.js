import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config();
 
const app = express();



const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log("error connecting to database");
        process.exit(1);
    }
}

startServer();