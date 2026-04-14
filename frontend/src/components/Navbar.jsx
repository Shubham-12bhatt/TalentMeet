import { UserButton } from '@clerk/clerk-react';
import { BookOpenIcon, LayoutDashboardIcon, Video } from 'lucide-react';
import React from 'react'
import { Link, useLocation } from 'react-router'

function Navbar() {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path
  }
  return (  
    <nav className="sticky top-0 z-50 bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-blue-900/40 shadow-[0_4px_30px_rgba(59,130,246,0.05)] text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-900/50 group-hover:shadow-blue-500/30 transition-all duration-300">
              <Video className="size-5 text-white/90" />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-100 to-cyan-200 bg-clip-text text-transparent pb-1">
                TalentMeet
              </span>
              <span className="text-[10px] font-semibold text-blue-500/90 uppercase tracking-[0.2em]">
                Code Together
              </span>
            </div>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* problem page link */}
            <Link to="/problems" className={`group cursor-pointer relative inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border font-medium overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${isActive("/problems") ? "bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border-blue-500/40 text-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "bg-transparent border-transparent text-slate-400 hover:text-blue-100 hover:bg-white/5"}`}>
              <div className="flex items-center gap-2 relative z-10 text-sm">
                <BookOpenIcon className={`size-4 sm:size-5 ${isActive("/problems") ? "text-cyan-300" : "text-slate-400 group-hover:text-blue-300"} transition-colors`} />
                <span>
                  Problems
                </span>
              </div>
            </Link>
            
            {/* dashboard link */}
            <Link to="/dashboard" className={`group cursor-pointer relative inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border font-medium overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${isActive("/dashboard") ? "bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border-blue-500/40 text-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "bg-transparent border-transparent text-slate-400 hover:text-blue-100 hover:bg-white/5"}`}>
              <div className="flex items-center gap-2 relative z-10 text-sm">
                <LayoutDashboardIcon className={`size-4 sm:size-5 ${isActive("/dashboard") ? "text-cyan-300" : "text-slate-400 group-hover:text-blue-300"} transition-colors`} />
                <span>
                  Dashboard
                </span>
              </div>
            </Link>
            
            {/* user button */}
            <div className="pl-3 sm:pl-5 ml-1 sm:ml-2 border-l border-blue-900/40 flex items-center">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "size-9 sm:size-10 border-2 border-blue-500/30 hover:border-blue-500/60 transition-colors" } }}/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar