import React from 'react'
import { getDifficultyColor } from '../lib/utils'

function ProblemDescription({problem, currentProblemId, onProblemChange, allProblems}) {
  return (
    <div className="flex flex-col h-full bg-[#0a0f1c] rounded-2xl overflow-hidden border border-blue-900/30 shadow-[0_0_30px_rgba(59,130,246,0.05)] text-slate-200">
      {/* Header Section */}
      <div className="p-4 sm:p-6 pb-4 bg-[#0f172a]/50 backdrop-blur-md border-b border-blue-900/40">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-100">{problem.title}</h1>
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f172a] border border-blue-900/50 shadow-inner">
            <select 
              className="bg-transparent text-sm font-medium text-slate-300 focus:outline-none cursor-pointer"
              value={currentProblemId}
              onChange={(e) => onProblemChange(e.target.value)}
            >
              {allProblems.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0f172a] text-slate-200">{p.title} - {p.difficulty}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm text-slate-400">{problem.category}</p>
      </div>

      <div className="p-4 sm:p-6 flex-1 space-y-6 overflow-y-auto">
        {/* Description Box */}
        <div className="bg-[#0f172a]/50 p-6 rounded-xl border border-blue-900/40 shadow-sm">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Description</h2>
          <div className="text-slate-300 text-sm sm:text-base space-y-4 leading-relaxed">
            <p className="whitespace-pre-line">{problem.description.text}</p>
            {problem.description.notes && problem.description.notes.map((note, index) => (
              <p key={index}>{note}</p>
            ))}
          </div>
        </div>

        {/* Examples Box */}
        <div className="bg-[#0f172a]/50 p-6 rounded-xl border border-blue-900/40 shadow-sm">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Examples</h2>
          <div className="space-y-8">
            {problem.examples && problem.examples.map((example, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-slate-100 mb-3 flex items-center">
                  <span className="text-slate-500 w-6">{index + 1}</span> 
                  Example {index + 1}
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
                      <span className="font-bold text-slate-500 whitespace-nowrap">Explanation:</span> 
                      <span>{example.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Constraints Box */}
        <div className="bg-[#0f172a]/50 p-6 rounded-xl border border-blue-900/40 shadow-sm">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Constraints</h2>
          <ul className="space-y-3">
            {problem.constraints && problem.constraints.map((constraint, index) => (
              <li key={index} className="flex items-center text-sm font-mono text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 shrink-0"></span>
                <span>{constraint}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProblemDescription