import React from 'react';
import { Video, ArrowRight, ZapIcon, CheckSquare, CheckIcon, VideoIcon } from 'lucide-react';
import { Link } from 'react-router';
import { SignInButton } from '@clerk/clerk-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#041215] text-slate-200">
      {/* navbar */}
      <nav className="sticky top-0 z-50 bg-[#041215]/80 backdrop-blur-xl border-b border-teal-900/40 shadow-[0_4px_30px_rgba(13,148,136,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* logo */}
            <Link to={'/'} className="flex items-center gap-3 group">
              <div className="size-11 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-teal-900/50 group-hover:shadow-teal-500/30 transition-all duration-300">
                <Video className="size-5 text-white/90" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-teal-100 to-emerald-200 bg-clip-text text-transparent">
                  TalentMeet
                </span>
                <span className="text-[10px] font-semibold text-teal-600/90 uppercase tracking-[0.2em] mt-0.5">
                  Code Together
                </span>
              </div>
            </Link>

            {/* auth button & actions */}
            <div className="flex items-center gap-5">
              <SignInButton mode="modal">
                <button className="text-sm cursor-pointer font-medium text-teal-100/70 hover:text-teal-100 transition-colors duration-200 px-3 py-2">
                  Log in
                </button>
              </SignInButton>
              
              <button className="group cursor-pointer relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-600/20 border border-teal-500/30 text-teal-100 font-medium overflow-hidden transition-all duration-300 hover:border-teal-400/50 hover:bg-teal-500/30 hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] focus:outline-none focus:ring-2 focus:ring-teal-500/50">
                <span className="relative z-10 text-sm">Get Started</span>
                <ArrowRight className="size-4 relative z-10 text-teal-300 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* left */}
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-2 px-4 py-2 w-fit rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300">
              <ZapIcon className='size-4'/>
              <span className="text-sm font-medium">Real-time Collaboration</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white space-y-2">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 drop-shadow-sm">
                Code Together,
              </span>
              <span className="block text-slate-300">
                Learn Together
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              The ultimate platform for collaborative coding interviews and pair programming. Connect face-to-face, code in real-time, and master technical interviews.
            </p>

            {/* feature items */}
            <div className='flex flex-wrap gap-3'>
              {['Live Video Chat', 'Code Editor', 'Multi-Language'].map((feature) => (
                <div key={feature} className='flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0a2024] border border-teal-900/30 text-teal-400/90 text-sm font-medium hover:bg-teal-900/20 transition-colors'>
                  <CheckIcon className='size-4 text-emerald-500' />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <SignInButton mode="modal">
                <button className='group relative cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50'>
                  Start Coding Now
                  <ArrowRight className='size-4 group-hover:translate-x-1 transition-transform' />
                </button>
              </SignInButton>
              <button className='inline-flex items-center cursor-pointer justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0a2024] border border-teal-800/50 text-teal-200 font-semibold hover:bg-teal-900/30 hover:border-teal-700/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500/50'>
                <VideoIcon className='size-4' />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-teal-900/30">
               {[
                 { value: '10k+', label: 'Active Users' },
                 { value: '50k+', label: 'Sessions' },
                 { value: '99.9%', label: 'Uptime' }
               ].map((stat) => (
                 <div key={stat.label} className="flex flex-col gap-1">
                   <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">{stat.value}</div>
                   <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* right video */}
          <div className='relative group'>
            {/* Background glowing blur for video */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-2xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            <div className="relative rounded-2xl overflow-hidden border border-teal-900/50 shadow-2xl shadow-teal-900/40 w-full aspect-video">
              {/* Optional overlay for better blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041215] via-transparent to-transparent opacity-40 pointer-events-none"></div>
              
              <video 
                src="/vdeo.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className='w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700' 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;