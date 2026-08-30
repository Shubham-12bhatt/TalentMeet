import { getAuth } from '@clerk/express';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(401).json({
        message: "Unauthorized - Invalid or missing token",
      });
    }

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in protected route middleware", error);
    res.status(500).json({ message: "internal server error" });
  }
};