import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";



export async function createSession(req,res){
  try {
      const {problem,difficulty} = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Problem and difficulty are required" });
    }
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const session = await Session.create({ problem, difficulty, host: userId, callId });
    
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: {
          problem,
          difficulty,
          sessionId:session._id.toString()
        }, 
    }
  })
    //chat messaging
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id : clerkId,
      members : [clerkId]
    })   
    await channel.create();
    res.status(201).json({session});
    } catch (error) {
        console.log("error in createSession",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function getActiveSessions(req,res){
    try {
      const sessions = await Session.find({
        status: "active",
      }).populate("host", "name profileImage email clerkId")
        .populate("participant", "name profileImage email clerkId")
        .sort({ createdAt: -1 }).limit(20);


      res.status(200).json({ sessions });
          
    } catch (error) {
        console.log("error in getActiveSessions",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function getMyRecentSessions(req,res){
    try {
      //session where user is either host or particip
      const userId = req.user._id;
      const sessions = await Session.find({
        status: "completed",
        $or: [
          { host: userId },
          { participant: userId }
        ]

      }).sort({ createdAt: -1 }).limit(20);
      res.status(200).json({sessions});
    } catch (error) {
        console.log("error in getMyRecentSessions",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function getSessionById(req,res){
    try {
      const { id } = req.params;
      const session  = await Session.findById(id).populate("host","name email profileImage clerkId").populate("participant","name email profileImage clerkId")
      if(!session){
        return res.status(404).json({message:"Session not found"})
      }
      res.status(200).json({session});
    } catch (error) {
        console.log("error in getSessionById",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function joinSession(req,res){
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const clerkId = req.user.clerkId;
      const session = await Session.findById(id);
      if(!session){
        return res.status(404).json({message:"Session not found"})
      }
      if(session.participant){
        return res.status(409).json({message:"Session is already full"})
      }
      if(session.status === "completed"){
        return res.status(400).json({message:"Session is already completed"})
      }
      if(session.host.toString() === userId.toString()){
        return res.status(400).json({message:"You are the host of this session"})
      }

      session.participant = userId;
      await session.save();
      const channel = chatClient.channel("messaging",session.callId);
      await channel.addMembers([clerkId]);
      res.status(200).json({session});
    } catch (error) {
        console.log("error in joinSession",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function endSession(req,res){
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const session = await Session.findById(id);
      if(!session){
        return res.status(404).json({message:"Session not found"})
      }
      if(session.host.toString() !== userId.toString() && session.participant.toString() !== userId.toString()){
        return res.status(403).json({message:"You are not authorized to end this session"})
      }
      if(session.status === "completed"){
        return res.status(400).json({message:"Session is already completed"})
      }
      //delete stream vc
      const call = streamClient.video.call("default",session.callId);
      await call.delete({hard:true});
      //delete stream channel
      const channel = chatClient.channel("messaging",session.callId);
      await channel.delete();
      session.status = "completed";
      await session.save();
      res.status(200).json({session,message:"Session ended successfully"});
    } catch (error) {
        console.log("error in endSession",error);
        return res.status(500).json({message:"Internal server error"})
    }
}