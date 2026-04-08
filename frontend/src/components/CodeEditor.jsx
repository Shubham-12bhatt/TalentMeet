import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problem";

function CodeEditor({code,isRunning,onLanguageChange,onCodeChange,onRunCode,selectedLanguage}) {
  return (
    <div className="flex flex-col h-full bg-[#0a0f1c] rounded-2xl overflow-hidden border border-blue-900/30 shadow-[0_0_30px_rgba(59,130,246,0.05)] text-slate-200">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a]/50 backdrop-blur-md border-b border-blue-900/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f172a] border border-blue-900/50 shadow-inner">
            <img src={LANGUAGE_CONFIG[selectedLanguage].icon} alt={LANGUAGE_CONFIG[selectedLanguage].name} className="w-5 h-5 object-contain" />
            <select 
              value={selectedLanguage} 
              onChange={onLanguageChange}
              className="bg-transparent text-sm font-medium text-slate-300 focus:outline-none cursor-pointer appearance-none pr-4"
            >
              {Object.keys(LANGUAGE_CONFIG).map((key) => (
                <option key={key} value={key} className="bg-[#0f172a] text-slate-200">
                  {LANGUAGE_CONFIG[key].name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button 
          disabled={isRunning} 
          onClick={onRunCode}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
            isRunning 
              ? 'bg-blue-500/20 text-blue-400 cursor-not-allowed border border-blue-500/30'
              : 'bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 border border-blue-400/30 cursor-pointer'
          }`}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin"/>
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4"/>
              Run Code
            </>
          )}
       </button>
      </div>
      <div className="flex-1 w-full bg-[#0a0f1c] p-2">
        <div className="h-full w-full rounded-xl overflow-hidden ring-1 ring-blue-900/30">
          <Editor 
            language={LANGUAGE_CONFIG[selectedLanguage]?.monaco || "javascript"} 
            value={code} 
            onChange={onCodeChange} 
            theme="vs-dark" 
            options={{
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              minimap: { enabled: false },
              padding: { top: 16, bottom: 16 }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CodeEditor