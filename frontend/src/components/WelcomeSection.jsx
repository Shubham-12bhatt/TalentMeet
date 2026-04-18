import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="bg-[#0f172a] rounded-3xl border border-blue-900/30 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
      {/* subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none"></div>

      <div className="flex items-center gap-4 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 shadow-inner flex items-center justify-center flex-shrink-0">
          <SparklesIcon className="w-7 h-7 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-100 to-cyan-200 bg-clip-text text-transparent mb-1">
            Welcome back, {user?.firstName || "there"}!
          </h1>
          <p className="text-slate-400">
            Ready to level up your coding skills?
          </p>
        </div>
      </div>

      <button
        onClick={onCreateSession}
        className="group relative z-10 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl transition-all duration-300 text-white font-semibold shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] flex-shrink-0 hover:-translate-y-0.5"
      >
        <ZapIcon className="w-5 h-5 text-cyan-100" />
        <span>Create Session</span>
        <ArrowRightIcon className="w-4 h-4 text-cyan-100 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

export default WelcomeSection;