import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, ChevronDownIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problem";

function CodeEditor({code,isRunning,onLanguageChange,onCodeChange,onRunCode,selectedLanguage}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (key) => {
    onLanguageChange({ target: { value: key } });
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0f1c] rounded-2xl overflow-hidden border border-blue-900/30 shadow-[0_0_30px_rgba(59,130,246,0.05)] text-slate-200">
      <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-[#0f172a]/50 backdrop-blur-md border-b border-blue-900/40">
        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f172a] border border-blue-900/50 shadow-inner hover:bg-[#1a2336] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
            >
              <img src={LANGUAGE_CONFIG[selectedLanguage].icon} alt={LANGUAGE_CONFIG[selectedLanguage].name} className="w-5 h-5 object-contain" />
              <span className="text-sm font-medium text-slate-300">{LANGUAGE_CONFIG[selectedLanguage].name}</span>
              <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full min-w-[140px] bg-[#0f172a] border border-blue-900/50 rounded-xl shadow-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-50 overflow-hidden py-1">
                {Object.keys(LANGUAGE_CONFIG).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleLanguageSelect(key)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer
                      ${selectedLanguage === key ? 'bg-blue-500/20 text-blue-400 font-medium' : 'text-slate-300 hover:bg-[#1a2333] hover:text-white'}
                    `}
                  >
                    <img src={LANGUAGE_CONFIG[key].icon} alt={LANGUAGE_CONFIG[key].name} className="w-4 h-4 object-contain" />
                    {LANGUAGE_CONFIG[key].name}
                  </button>
                ))}
              </div>
            )}
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