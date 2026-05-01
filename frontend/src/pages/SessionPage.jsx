import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSession";


function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output,setOutput] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const { data:sessionData,isLoading:sessionLoading,refetch } = useSessionById(id);
  const joinsessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();
  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const problemData = session?.problem ?Object.values(PROBLEMS).find((p) => p.title === session.problem):null;
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");


  //redirect participant when session ends
  useEffect(() => {
    if (!session || sessionLoading) return;
    if(session.status === "completed") {
      navigate("/dashboard");
    }
  },[session,sessionLoading,navigate])
  


  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setCode(problemData?.starterCode?.[e.target.value] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

   const result = await executeCode(selectedLanguage,code); 
   setOutput(result);
   setIsRunning(false);
  }

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end the session? All participants will be notified.")) {
      endSessionMutation.mutate(id, {
        onSuccess:() => {
          navigate("/dashboard");
        }
      });
    }
  }



  
  return (
    <div>SessionPage</div>
  )
}

export default SessionPage