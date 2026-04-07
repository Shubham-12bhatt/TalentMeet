import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { PROBLEMS } from '../data/problem';
import {Panel,Group, Separator} from "react-resizable-panels"
import Navbar from '../components/Navbar';
import ProblemDescription from '../components/ProblemDescription';
import CodeEditor from '../components/CodeEditor';
import OutputPanel from '../components/OutputPanel';
function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode[selectedLanguage]); 
  const [output,setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
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
   navigate(`/problem/${newProblemId}`)
  }
  const triggerConfetti = () => { }
  
  const checkIfTestsPassed = () => {
    
  }

  const handleRunCode = () => {}
  
  return (
    <div>
      <Navbar />
      <div>
        <Group direction='horizontal'>
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
            <Group direction='vertical'>
              <Panel defaultSize={70} minSize={30}>
              <CodeEditor/>
              </Panel>
              <Separator />
              {/* output */}
              <Panel defaultSize={30} minSize={30}>
              <OutputPanel/>
              </Panel>
            </Group>
         </Panel>
        </Group>
      </div>
    
    
    
    </div>
  )
}

export default ProblemPage