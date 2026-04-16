import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden ">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Main Card container */}
        <div className="bg-[#0f172a] rounded-3xl border border-blue-900/30 p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 shadow-2xl">
          {/* subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 pointer-events-none"></div>
          
          <div className="relative z-10 flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20 shadow-inner flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-7 h-7 md:w-8 md:h-8 text-cyan-400" />
              </div>
              <div className="flex flex-col justify-center mt-2 md:mt-0">
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-100 to-cyan-200 bg-clip-text text-transparent mb-2 md:mb-3 leading-tight">
                  Welcome back, {user?.firstName || "there"}!
                </h1>
                <p className="text-base md:text-lg text-slate-400">
                  Ready to level up your coding skills?
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            <button
              onClick={onCreateSession}
              className="group w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-1 text-white font-semibold text-lg"
            >
              <ZapIcon className="w-6 h-6 text-cyan-100" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 text-cyan-100 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;