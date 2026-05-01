import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSession";
import Navbar from "../components/Navbar";
import { Group, Panel, Separator } from "react-resizable-panels";
import { getDifficultyColor } from "../lib/utils";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import { PROBLEMS } from "../data/problem";
import { LogOutIcon } from "lucide-react";


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
  const isParticipant = session?.participant?.clerkId === user?.id;
  const problemData = session?.problem ?Object.values(PROBLEMS).find((p) => p.title === session.problem):null;
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");
//auto join session if user is not already a participant and not host
  useEffect(() => {
    if (!session || !user || sessionLoading) return
    if (isHost || isParticipant) return

    joinsessionMutation.mutate(id, {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        navigate("/dashboard");
      }
    })
    
  }, [session, user, sessionLoading, isHost, isParticipant,id, navigate]);

  
  //redirect participant when session ends
  useEffect(() => {
    if (!session || sessionLoading) return;
    if(session.status === "completed") {
      navigate("/dashboard");
    }
  },[session,sessionLoading,navigate])
  

  //update code 
  useEffect(() => {
    if(problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);


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
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-4 h-[calc(100vh-70px)]">
        <Group orientation='horizontal'>
          {/* left */}
          <Panel defaultSize={50} minSize={30}>
            <Group orientation='vertical'>
              {/* Problem Description Panel */}
              <Panel defaultSize={50} minSize={20} className="overflow-y-auto pr-2 custom-scrollbar">
                <div className="p-4">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-base-content">
                        {session?.problem || "Loading..."}
                      </h1>
                      {problemData?.category && (
                        <p className="text-base-content/60 mt-2">{problemData.category}</p>
                      )}
                      <p className="text-base-content/60 mt-1">
                        Host: {session?.host?.name || "Loading..."} •{" "}
                        {session?.participant ? 2 : 1}/2 participants
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`badge badge-lg ${getDifficultyColor(
                          session?.difficulty
                        )}`}
                      >
                        {session?.difficulty
                          ? session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)
                          : "Easy"}
                      </span>
                      {isHost && session?.status === "active" && (
                        <button
                          onClick={handleEndSession}
                          disabled={endSessionMutation.isPending}
                          className="btn btn-error btn-sm gap-2"
                        >
                          {endSessionMutation.isPending ? (
                            <Loader2Icon className="w-4 h-4 animate-spin" />
                          ) : (
                            <LogOutIcon className="w-4 h-4" />
                          )}
                          End Session
                        </button>
                      )}
                      {session?.status === "completed" && (
                        <span className="badge badge-ghost badge-lg">Completed</span>
                      )}
                    </div>
                  </div>

                  {/* Problem Description */}
                  {problemData?.description && (
                    <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300 mb-6">
                      <h2 className="text-xl font-bold mb-4 text-base-content">Description</h2>
                      <div className="space-y-3 text-base leading-relaxed">
                        <p className="text-base-content/90">{problemData.description.text}</p>
                        {problemData.description.notes?.map((note, idx) => (
                          <p key={idx} className="text-base-content/90">
                            {note}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Examples Section */}
                  {problemData?.examples && problemData.examples.length > 0 && (
                    <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300 mb-6">
                      <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
                      <div className="space-y-4">
                        {problemData.examples.map((example, idx) => (
                          <div key={idx}>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="badge badge-sm">{idx + 1}</span>
                              <p className="font-semibold text-base-content">Example {idx + 1}</p>
                            </div>
                            <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                              <div className="flex gap-2">
                                <span className="text-primary font-bold min-w-[70px]">Input:</span>
                                <span>{example.input}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-secondary font-bold min-w-[70px]">Output:</span>
                                <span>{example.output}</span>
                              </div>
                              {example.explanation && (
                                <div className="pt-2 border-t border-base-300 mt-2">
                                  <span className="text-base-content/60 font-sans text-xs">
                                    <span className="font-semibold">Explanation:</span>{" "}
                                    {example.explanation}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Constraints */}
                  {problemData?.constraints && problemData.constraints.length > 0 && (
                    <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300 mb-6">
                      <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
                      <ul className="space-y-2 text-base-content/90">
                        {problemData.constraints.map((constraint, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <code className="text-sm">{constraint}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Panel>

              {/* Resize Handle 1 */}
              <div className="h-2 cursor-row-resize flex items-center justify-center relative z-10 group">
                <div className="w-16 h-1 rounded-full bg-base-300 group-hover:bg-primary transition-colors" />
              </div>

              {/* Code Editor & Output Panel */}
              <Panel defaultSize={50} minSize={20}>
                <Group orientation="vertical">
                  {/* Code Editor */}
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditor
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(value) => setCode(value)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>
                  
                  {/* Resize Handle 2 */}
                  <div className="h-2 cursor-row-resize flex items-center justify-center relative z-10 group">
                    <div className="w-16 h-1 rounded-full bg-base-300 group-hover:bg-primary transition-colors" />
                  </div>

                  {/* Output Panel */}
                  <Panel defaultSize={30} minSize={20}> 
                    <OutputPanel output={output} isRunning={isRunning} />
                  </Panel>
                </Group>
              </Panel>
            </Group>
          </Panel>

          {/* Resize Handle 3 */}
          <div className="w-2 cursor-col-resize flex items-center justify-center relative z-10 group">
            <div className="h-16 w-1 rounded-full bg-base-300 group-hover:bg-primary transition-colors" />
          </div>

          {/* right video calls and chat */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full w-full bg-base-200/50 flex items-center justify-center">
              TODO: VIDEO CALLING PANEL
            </div>
          </Panel>
        </Group>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}} />
    </div>
  )
}

export default SessionPage