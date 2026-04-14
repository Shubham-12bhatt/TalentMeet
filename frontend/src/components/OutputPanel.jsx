import React from 'react'
import { Terminal, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

function OutputPanel({output}) {
  return (
    <div className="flex flex-col h-full w-full bg-[#0f172a] overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-[#1e293b]/80 border-b border-[#334155] text-slate-300">
        <Terminal className="w-4 h-4 mr-2 text-emerald-400" />
        <span className="text-sm font-semibold tracking-wide">Console Output</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4 bg-[#020617] font-mono text-sm leading-relaxed">
        {output === null ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
            <div className="p-4 bg-slate-800/30 rounded-full border border-slate-700/50">
              <Terminal className="w-8 h-8 opacity-70" />
            </div>
            <p className="text-slate-400">Run your code to see the output here.</p>
          </div>
        ) : output.success ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">Execution Completed</span>
            </div>
            <div className="bg-[#0f172a] rounded-lg p-3.5 border border-[#1e293b] shadow-inner font-medium">
               <pre className="text-slate-300 whitespace-pre-wrap break-words">{output.output || <span className="text-slate-500 italic">Program finished with no output.</span>}</pre>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center text-rose-400 mb-2">
              <XCircle className="w-4 h-4 mr-2" />
              <span className="font-semibold text-sm">Execution Failed</span>
            </div>
            
            {output.output && (
              <div className="bg-[#0f172a] rounded-lg p-3.5 border border-[#1e293b] shadow-inner mb-4">
                 <span className="text-slate-500 text-xs mb-2 block uppercase tracking-wide font-semibold">Standard Output</span>
                 <pre className="text-slate-300 whitespace-pre-wrap break-words">{output.output}</pre>
              </div>
            )}
            
            {output.error && (
              <div className="bg-red-950/20 rounded-lg p-3.5 border border-red-900/30 mt-2 shadow-inner">
                <div className="flex items-center text-red-400 mb-2 text-xs uppercase tracking-wide font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                  <span>Error Trace</span>
                </div>
                <pre className="text-red-400 whitespace-pre-wrap break-words text-[13px]">{output.error}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputPanel