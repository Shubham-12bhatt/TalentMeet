import React from "react";
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problem";

function CodeEditor({
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
  selectedLanguage,
}) {
  return (
    <div className="flex flex-col h-full bg-[#0a0f1c] rounded-2xl overflow-hidden border border-blue-900/30 shadow-[0_0_30px_rgba(59,130,246,0.05)] text-slate-200">
      
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a]/50 border-b border-blue-900/40">
        
        <div className="flex items-center cursor-pointer gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="w-5 h-5"
          />

          <select
            value={selectedLanguage}
            onChange={onLanguageChange}
            className="bg-[#0f172a] border cursor-pointer border-blue-900/50 text-sm rounded-md px-2 py-1 text-slate-300 focus:outline-none"
          >
            {Object.keys(LANGUAGE_CONFIG).map((key) => (
              <option key={key} value={key}>
                {LANGUAGE_CONFIG[key].name}
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={isRunning}
          onClick={onRunCode}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold ${
            isRunning
              ? "bg-blue-500/20 text-blue-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      <div className="flex-1 w-full bg-[#0a0f1c] p-2">
        <div className="h-full w-full rounded-xl overflow-hidden">
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
  wordWrap: "on",
  tabSize: 2,
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: true,
  formatOnPaste: true,
  formatOnType: true,
}}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;