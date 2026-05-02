import { StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;
if(!apiKey){
    throw new Error("Missing Stream API Key")
}
let client = null;

export const initializeStreamClient = async(user,token) => {
  if (client && client.user?.id === user.id) return client;
  

  if(client){
    await client.disconnectStreamClient();
  }
  client = new StreamVideoClient({
    apiKey,
    user,
    token,
    });
    return client;
}


export const disconnectStreamClient = async () => {
  if (client) {
      try{
        await client.disconnectUser();
      }catch (error) {
        console.error("Error disconnecting stream client:", error);
      } finally {
        client = null;
      }
  }
}
