import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { PROBLEMS } from '../data/problem';
import confetti from 'canvas-confetti';
import {Panel,Group, Separator} from "react-resizable-panels"
import Navbar from '../components/Navbar';
import ProblemDescription from '../components/ProblemDescription';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
import { executeCode } from '../lib/piston';
import toast from 'react-hot-toast';
function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode[selectedLanguage]); 
  const [output,setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const currentProblem = PROBLEMS[currentProblemId];


  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id,selectedLanguage]);
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setCode(currentProblem.starterCode[e.target.value]);
    setOutput(null);
  }
  const handleProblemChange = (newProblemId) => {
   navigate(`/problems/${newProblemId}`)
  }
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: {x:0.2, y: 0.6 },
    });
    confetti({
      particleCount: 80,
      spread: 250,
      origin: {x:0.8, y: 0.6 },
    });
   }
  
  const normalizeOutput = (output) => {
        return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    return normalizeOutput(actualOutput) === normalizeOutput(expectedOutput);
  }

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage,code);
    setOutput(result);
    setIsRunning(false);


    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testPassed = checkIfTestsPassed(result.output, expectedOutput);
      if (testPassed) {
        triggerConfetti();
       toast.success("All tests passed!");
      }
      else{
        toast.error("Some tests failed!");
      }
    }
    else {
      toast.error("Compilation Error!");
    }
  }
  
  return (
    <div className="flex flex-col h-screen bg-[#0f172a]">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <Group orientation='horizontal'>
          <Panel defaultSize={40} minSize={20}>
            {/* left panel problem description */}
            <ProblemDescription problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems = {Object.values(PROBLEMS)}
            />
         </Panel>
         <Separator />
          {/* right panel code editor */}
          <Panel defaultSize={40} minSize={30}>
            <Group orientation='vertical'>
              <Panel defaultSize={70} minSize={30}>
                <CodeEditor
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  selectedLanguage={selectedLanguage}
                  onCodeChange = {setCode}
                  onRunCode = {handleRunCode}
                /> 
              </Panel>
              <Separator />
              {/* output */}
              <Panel defaultSize={30} minSize={30}>

              <OutputPanel output={output}/>
              </Panel>
            </Group>
         </Panel>
        </Group>
      </div>
    
    
    
    </div>
  )
}

export default ProblemPage