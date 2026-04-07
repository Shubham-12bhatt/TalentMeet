import React from 'react'
import { getDifficultyColor } from '../lib/utils'

function ProblemDescription({problem, currentProblemId, onProblemChange, allProblems}) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-gray-300 overflow-y-auto">
      {/* Header Section */}
      <div className="p-4 sm:p-6 pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>
          <div>
            <select 
              className="bg-[#1e1e1e] text-sm text-gray-300 border border-gray-700 rounded-md px-3 py-1.5 focus:outline-none focus:border-gray-500 cursor-pointer"
              value={currentProblemId}
              onChange={(e) => onProblemChange(e.target.value)}
            >
              {allProblems.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#1e1e1e]">{p.title} - {p.difficulty}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-500">{problem.category}</p>
      </div>

      <div className="p-4 sm:p-6 flex-1 space-y-6">
        {/* Description Box */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-4">Description</h2>
          <div className="text-gray-300 text-sm sm:text-base space-y-4 leading-relaxed">
            <p className="whitespace-pre-line">{problem.description.text}</p>
            {problem.description.notes && problem.description.notes.map((note, index) => (
              <p key={index}>{note}</p>
            ))}
          </div>
        </div>

        {/* Examples Box */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-6">Examples</h2>
          <div className="space-y-8">
            {problem.examples && problem.examples.map((example, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <span className="text-gray-500 w-6">{index + 1}</span> 
                  Example {index + 1}
                </h3>
                <div className="bg-[#0f0f0f] rounded-lg p-5 font-mono text-sm border border-white/5">
                  <div className="mb-2 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold w-16 shrink-0">Input:</span>
                    <span className="text-gray-300">{example.input}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold w-16 shrink-0">Output:</span>
                    <span className="text-gray-300">{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="mt-4 text-gray-400 text-xs sm:text-sm font-sans flex items-start gap-1">
                      <span className="font-bold text-gray-500 whitespace-nowrap">Explanation:</span> 
                      <span>{example.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Constraints Box */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-4">Constraints</h2>
          <ul className="space-y-3">
            {problem.constraints && problem.constraints.map((constraint, index) => (
              <li key={index} className="flex items-center text-sm font-mono text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3 shrink-0"></span>
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