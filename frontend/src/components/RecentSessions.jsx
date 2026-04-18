import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyColor } from "../lib/utils.js";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="bg-[#0f172a] rounded-3xl border border-blue-900/30 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>

      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-500/20 flex items-center justify-center">
          <Clock className="w-6 h-6 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-blue-50">Your Past Sessions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Loader className="w-10 h-10 animate-spin text-cyan-400" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className={`bg-slate-800/40 border border-blue-900/50 rounded-2xl p-5 hover:border-cyan-500/40 transition-colors shadow-sm relative group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>

              <div className="flex items-start gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 ring-1 ring-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="font-bold text-base text-blue-50 leading-tight mb-1 truncate">{session.problem}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getDifficultyColor(session.difficulty)}`}>
                    {session.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-400 mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    about {formatDistanceToNow(new Date(session.createdAt))} ago
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>
                    {session.participant ? "2" : "1"} participant{session.participant ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 relative z-10">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Completed</span>
                <span className="text-[10px] text-slate-400">
                  {new Date(session.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-cyan-500/10 rounded-2xl flex items-center justify-center ring-1 ring-cyan-500/20">
              <Trophy className="w-8 h-8 text-cyan-400/50" />
            </div>
            <p className="text-lg font-semibold text-slate-300 mb-1">No sessions yet</p>
            <p className="text-sm text-slate-500">Start your coding journey today!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSessions;