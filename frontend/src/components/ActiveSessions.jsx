import { Code2Icon, CrownIcon, UsersIcon, ZapIcon, ArrowRightIcon, SparklesIcon, Loader } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { getDifficultyColor } from '../lib/utils'

function ActiveSessions({sessions, isLoading, isUserInSession}) {
  return (
    <div className="bg-[#0f172a] rounded-3xl border border-blue-900/30 p-6 md:p-8 shadow-2xl h-full flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none"></div>
      
      {/* header section */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 shadow-inner flex items-center justify-center">
            <ZapIcon className="w-6 h-6 text-cyan-400"/>
          </div>
          <h2 className="text-2xl font-bold text-blue-50">Live Sessions</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-cyan-400 text-sm font-semibold">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          {sessions.length} active
        </div>
      </div>

      {/* session list */}
      <div className="space-y-4 flex-1 relative z-10">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session._id} className="bg-slate-800/40 border border-blue-900/50 rounded-2xl p-4 hover:border-blue-500/40 transition-colors shadow-sm relative overflow-hidden group">
              {/* background accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between relative z-10 gap-4">
                {/* left side */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-12 h-12 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Code2Icon className="w-6 h-6 text-cyan-400" />
                    {session.status === "active" && (
                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-blue-50 truncate">{session.problem}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getDifficultyColor(session.difficulty)}`}>
                        {session.difficulty}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <CrownIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-medium text-slate-300 truncate max-w-[120px]">{session.host?.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UsersIcon className="w-3.5 h-3.5" />
                        <span>{session.participant ? "2/2" : "1/2"}</span>
                      </div>
                      {session.participant && !isUserInSession(session) ? (
                        <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded text-[10px] font-bold tracking-wider">FULL</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 rounded text-[10px] font-bold tracking-wider">OPEN</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* right side */}
                <div className="flex-shrink-0 w-full sm:w-auto">
                  {session.participant && !isUserInSession(session) ? (
                    <button className="w-full sm:w-auto px-4 py-2 bg-slate-800 text-slate-500 rounded-xl cursor-not-allowed font-medium text-sm border border-slate-700/50">
                      Full
                    </button>
                  ) : (
                    <Link to={`/session/${session._id}`} className="group/btn w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-cyan-400 rounded-xl transition-colors font-medium text-sm border border-blue-500/30 hover:border-cyan-400/50">
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/10 rounded-2xl flex items-center justify-center ring-1 ring-blue-500/20">
              <SparklesIcon className="w-8 h-8 text-cyan-400/50" />
            </div>
            <p className="text-lg font-semibold text-slate-300 mb-1">No active sessions</p>
            <p className="text-sm text-slate-500">Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActiveSessions