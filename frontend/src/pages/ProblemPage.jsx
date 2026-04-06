import React from 'react'
import { useNavigate } from 'react-router';
import { PROBLEMS } from '../data/problem';

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
  const handleProblemChange = (e) => {
    setCurrentProblemId(e.target.value);
    setCode(currentProblem.starterCode[selectedLanguage]);
    setOutput(null);
  }
  const triggerConfetti = () => { }
  
  const checkIfTestsPassed = () => {
    
  }

  const handleRunCode = () => {}
  
  return (
    <div>ProblemPage</div>
  )
}

export default ProblemPage