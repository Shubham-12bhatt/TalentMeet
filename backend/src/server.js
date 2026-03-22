import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from './lib/inngest.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use("/api/inngest", serve({ client: inngest, functions }));


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