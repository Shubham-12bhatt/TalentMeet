import 'dotenv/config';
import cors from 'cors';
import express from "express";
import connectDB from "./lib/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from './lib/inngest.js';
import { clerkMiddleware } from '@clerk/express'
import { protectRoute } from './middleware/protectroute.js';
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat",chatRoutes);
app.use("/api/sessions",sessionRoutes);
app.get("/health",(req,res)=>{
    res.send("ok");
})
// app.get("/video-calls",protectRoute,(req,res)=>{
//     res.send("hello world");
// })


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