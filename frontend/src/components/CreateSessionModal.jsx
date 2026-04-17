import React from 'react'
import { PROBLEMS } from '../data/problem';
import { LoaderIcon, PlusIcon, Code2Icon, XIcon } from 'lucide-react';

function CreateSessionModal({ isOpen, onClose, roomConfig, setRoomConfig, onCreateRoom, isCreating }) {
  const problems = Object.values(PROBLEMS);
  if (!isOpen) return null;
  
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0f1c]/80 backdrop-blur-sm'>
      {/* modal backdrop click handler */}
      <div className='absolute inset-0' onClick={onClose}></div>

      {/* modal content */}
      <div className='relative w-full max-w-lg bg-[#0f172a] rounded-3xl border border-blue-900/30 p-6 md:p-8 shadow-2xl overflow-hidden'>
        {/* top accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>

        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h3 className='text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-100 to-cyan-200 bg-clip-text text-transparent'>
            Create New Session
          </h3>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-full transition-colors"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* problem selection */}
          <div>
            <label className='block text-sm font-medium text-slate-300 mb-2'>
              Select Problem <span className="text-blue-400">*</span>
            </label>
            <div className="relative">
              <select 
                value={roomConfig.problem}
                onChange={(e) => {
                  const selectedProblem = problems.find(p => p.title === e.target.value);
                  setRoomConfig({
                    difficulty: selectedProblem.difficulty,
                    problem : e.target.value,
                  });
                }}
                className="w-full bg-[#0a0f1c] border border-blue-900/50 rounded-xl px-4 py-3.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-slate-500">Choose a coding problem...</option>
                {problems.map((problem) => (
                  <option key={problem.id} value={problem.title} className="bg-[#0f172a]">
                    {problem.title} ({problem.difficulty})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* room summary*/}
          {roomConfig.problem && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-4 text-slate-300 shadow-inner">
              <div className="mt-0.5">
                <Code2Icon className="size-5 text-cyan-400" />
              </div>
              <div className="flex-1 text-sm md:text-base">
                <p className="font-semibold text-blue-100 mb-1">Room Summary:</p>
                <p className="mb-1 text-slate-400">
                  Problem: <span className="font-medium text-slate-200">{roomConfig.problem}</span>
                </p>
                <p className="text-slate-400">
                  Max Participants: <span className="font-medium text-slate-200">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className='mt-8 pt-6 border-t border-blue-900/30 flex justify-end gap-3'>
          <button 
            onClick={onClose} 
            disabled={isCreating}
            className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Cancel
          </button>
          
          <button 
            onClick={onCreateRoom} 
            disabled={isCreating || !roomConfig.problem}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}
            <span>Create</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreateSessionModal