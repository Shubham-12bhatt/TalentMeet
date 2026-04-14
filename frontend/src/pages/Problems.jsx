import React from 'react'
import Navbar from '../components/Navbar'
import {PROBLEMS} from '../data/problem'
import { ChevronRightIcon, Code2Icon } from 'lucide-react';
import { getDifficultyColor } from '../lib/utils';
import { Link } from 'react-router';

const Problems = () => {
  const problems = Object.values(PROBLEMS);
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-100 to-cyan-200 bg-clip-text text-transparent mb-3">Practice Problems</h1>
          <p className="text-slate-400 max-w-2xl text-sm md:text-base">Sharpen your coding skills with our curated list of problems. Select a problem below to start practicing in real-time.</p>
        </div>

        {/* problem list */}
        <div className="space-y-4 mb-16">
          {problems.map(problem => (
            <Link key={problem.id} to={`/problems/${problem.id}`}
            className="group block p-5 md:p-6 rounded-2xl bg-[#0f172a] border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* left side */}
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-xl ring-1 ring-blue-500/20 text-cyan-400 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:ring-blue-400/50 transition-all duration-300 mt-1 md:mt-0 shadow-inner">
                      <Code2Icon className="size-6"/>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-lg md:text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">{problem.title}</h2>
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm md:text-base line-clamp-2 leading-relaxed">
                        {problem.description.text}
                      </p>
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-cyan-400 transition-colors self-end md:self-center bg-blue-500/10 hover:bg-blue-500/20 md:bg-transparent px-4 py-2 md:p-0 rounded-lg md:rounded-none">
                    <span>Solve</span>
                    <ChevronRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* stats footer */}
        <div className="mt-12 bg-[#0f172a] rounded-2xl border border-blue-900/30 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-blue-900/40">
            <div className="flex flex-col items-center justify-center">
              <div className="text-slate-500 text-sm font-medium mb-1">Total Problems</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{problems.length}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-slate-500 text-sm font-medium mb-1">Easy</div>
              <div className="text-2xl md:text-3xl font-bold text-green-400">{problems.filter(problem => problem.difficulty === 'Easy').length}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-slate-500 text-sm font-medium mb-1">Medium</div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400">{problems.filter(problem => problem.difficulty === 'Medium').length}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-slate-500 text-sm font-medium mb-1">Hard</div>
              <div className="text-2xl md:text-3xl font-bold text-red-500">{problems.filter(problem => problem.difficulty === 'Hard').length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Problems