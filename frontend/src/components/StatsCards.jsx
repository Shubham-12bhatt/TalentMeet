import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Active Count */}
      <div className="bg-[#0f172a] rounded-3xl border border-blue-900/30 p-6 flex-1 flex flex-col justify-between hover:border-blue-500/30 transition-colors shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none"></div>
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 shadow-inner flex items-center justify-center">
            <UsersIcon className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-cyan-400 text-xs font-semibold">
            Live
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-4xl font-black mb-1 text-blue-50">{activeSessionsCount}</div>
          <div className="text-sm text-slate-400 font-medium">Active Sessions</div>
        </div>
      </div>

      {/* Recent Count */}
      <div className="bg-[#0f172a] rounded-3xl border border-blue-900/30 p-6 flex-1 flex flex-col justify-between hover:border-cyan-500/30 transition-colors shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"></div>
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-500/20 shadow-inner flex items-center justify-center">
            <TrophyIcon className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-4xl font-black mb-1 text-blue-50">{recentSessionsCount}</div>
          <div className="text-sm text-slate-400 font-medium">Total Sessions</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;