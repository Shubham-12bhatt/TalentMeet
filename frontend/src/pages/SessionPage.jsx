import { useUser } from "@clerk/clerk-react";
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
  return (
    <div>SessionPage</div>
  )
}

export default SessionPage