import { StreamChat } from "stream-chat";

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if (!apiKey || !apiSecret) {
  throw new Error("Missing Stream API Key or Secret");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {

  try {
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted successfully", userData);
  }
  catch (error) {
    console.log("Error upserting Stream user", error);
  }
}

export const deleteStreamUser = async (userId) => {

  try {
    await chatClient.deleteUser(userId);
    console.log("Stream user deleted successfully", userId);
  }
  catch (error) {
    console.log("Error deleting Stream user", error);
  }
}


