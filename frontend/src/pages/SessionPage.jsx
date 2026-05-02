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
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import { executeCode } from "../lib/piston";
import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";


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

  const {call,chatClient,channel,isInitializingCall,streamClient} = useStreamClient(session,sessionLoading,isHost,isParticipant);



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
                <div className="p-4 sm:p-6 bg-[#0a0f1c] min-h-full rounded-2xl border border-blue-900/30 shadow-[0_0_30px_rgba(59,130,246,0.05)] text-slate-200">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-6 pb-4 border-b border-blue-900/40">
                    <div>
                      <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-slate-100">
                          {session?.problem || "Loading..."}
                        </h1>
                        <span
                          className={`px-3 py-1 rounded-md text-xs font-semibold border ${getDifficultyColor(session?.difficulty
                            ? session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)
                            : "Easy")
                          }`}
                        >
                          {session?.difficulty
                            ? session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)
                            : "Easy"}
                        </span>
                      </div>
                      {problemData?.category && (
                        <p className="text-slate-400 text-sm mt-2">{problemData.category}</p>
                      )}
                      <p className="text-slate-500 text-xs mt-1">
                        Host: {session?.host?.name || "Loading..."} •{" "}
                        {session?.participant ? 2 : 1}/2 participants
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
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
                    <div className="bg-[#0f172a]/50 rounded-xl shadow-sm p-6 border border-blue-900/40 mb-6">
                      <h2 className="text-xl font-bold mb-4 text-slate-100">Description</h2>
                      <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                        <p className="whitespace-pre-line">{problemData.description.text}</p>
                        {problemData.description.notes?.map((note, idx) => (
                          <p key={idx}>{note}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Examples Section */}
                  {problemData?.examples && problemData.examples.length > 0 && (
                    <div className="bg-[#0f172a]/50 rounded-xl shadow-sm p-6 border border-blue-900/40 mb-6">
                      <h2 className="text-xl font-bold mb-6 text-slate-100">Examples</h2>
                      <div className="space-y-8">
                        {problemData.examples.map((example, idx) => (
                          <div key={idx}>
                            <h3 className="text-sm font-semibold text-slate-100 mb-3 flex items-center">
                              <span className="text-slate-500 w-6">{idx + 1}</span>
                              Example {idx + 1}
                            </h3>
                            <div className="bg-[#0a0f1c] rounded-lg p-5 font-mono text-sm border border-blue-900/30">
                              <div className="mb-2 flex items-start gap-2">
                                <span className="text-primary font-bold w-16 shrink-0">Input:</span>
                                <span className="text-slate-300">{example.input}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-secondary font-bold w-16 shrink-0">Output:</span>
                                <span className="text-slate-300">{example.output}</span>
                              </div>
                              {example.explanation && (
                                <div className="mt-4 text-slate-400 text-xs sm:text-sm font-sans flex items-start gap-1">
                                  <span className="font-bold text-slate-500 whitespace-nowrap">Explanation:</span>{" "}
                                  <span>{example.explanation}</span>
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
                    <div className="bg-[#0f172a]/50 rounded-xl shadow-sm p-6 border border-blue-900/40 mb-6">
                      <h2 className="text-xl font-bold mb-4 text-slate-100">Constraints</h2>
                      <ul className="space-y-3">
                        {problemData.constraints.map((constraint, idx) => (
                          <li key={idx} className="flex items-center text-sm font-mono text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 shrink-0"></span>
                            <span>{constraint}</span>
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
              
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                    <p className="text-lg">Connecting to video call...</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body items-center text-center">
                      <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                        <PhoneOffIcon className="w-12 h-12 text-error" />
                      </div>
                      <h2 className="card-title text-2xl">Connection Failed</h2>
                      <p className="text-base-content/70">Unable to connect to the video call</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            
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