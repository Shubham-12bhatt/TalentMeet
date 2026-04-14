import React from 'react';
import { Video, ArrowRight, ZapIcon, CheckSquare, CheckIcon, VideoIcon, Code2, Users } from 'lucide-react';
import { Link } from 'react-router';
import { SignInButton } from '@clerk/clerk-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* navbar */}
      <nav className="sticky top-0 z-50 bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-blue-900/40 shadow-[0_4px_30px_rgba(59,130,246,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* logo */}
            <Link to={'/'} className="flex items-center gap-3 group">
              <div className="size-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-900/50 group-hover:shadow-blue-500/30 transition-all duration-300">
                <Video className="size-5 text-white/90" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-linear-to-r from-blue-100 to-cyan-200 bg-clip-text text-transparent pb-1">
                  TalentMeet
                </span>
                <span className="text-[10px] font-semibold text-blue-500/90 uppercase tracking-[0.2em]">
                  Code Together
                </span>
              </div>
            </Link>

            {/* auth button & actions */}
            <div className="flex items-center gap-5">
              <SignInButton mode="modal">
                <button className="text-sm cursor-pointer font-medium text-blue-100/70 hover:text-blue-100 transition-colors duration-200 px-3 py-2">
                  Log in
                </button>
              </SignInButton>
              
              <button className="group cursor-pointer relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30 text-blue-100 font-medium overflow-hidden transition-all duration-300 hover:border-blue-400/50 hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <span className="relative z-10 text-sm">Get Started</span>
                <ArrowRight className="size-4 relative z-10 text-cyan-300 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-5rem)] flex items-center py-4 lg:py-8 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* left */}
          <div className="space-y-6 lg:space-y-8 relative z-10">
            <div className="flex items-center gap-2 px-4 py-2 w-fit rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
              <ZapIcon className='size-4'/>
              <span className="text-xs sm:text-sm font-medium">Real-time Collaboration</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white space-y-2">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-sm pb-3">
                Code Together,
              </span>
              <span className="block text-slate-300">
                Learn Together
              </span>
            </h1>

            <p className="text-sm md:text-base lg:text-lg text-slate-400 max-w-xl leading-relaxed">
              The ultimate platform for collaborative coding interviews and pair programming. Connect face-to-face, code in real-time, and master technical interviews.
            </p>

            {/* feature items */}
            <div className='flex flex-wrap gap-2 md:gap-3'>
              {['Live Video Chat', 'Code Editor', 'Multi-Language'].map((feature) => (
                <div key={feature} className='flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-1 rounded-lg bg-[#0f172a] border border-blue-900/30 text-blue-400/90 text-xs lg:text-sm font-medium hover:bg-blue-900/20 transition-colors'>
                  <CheckIcon className='size-4 text-cyan-500' />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-2 lg:pt-2">
              <SignInButton mode="modal">
                <button className='group relative cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 lg:px-8 lg:py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm lg:text-base'>
                  Start Coding Now
                  <ArrowRight className='size-4 group-hover:translate-x-1 transition-transform' />
                </button>
              </SignInButton>
              <button className='inline-flex items-center cursor-pointer justify-center gap-2 px-6 py-3 lg:px-8 lg:py-3.5 rounded-xl bg-[#0f172a] border border-blue-800/50 text-blue-200 font-semibold hover:bg-blue-900/30 hover:border-blue-700/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm lg:text-base'>
                <VideoIcon className='size-4' />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-4 lg:pt-8 border-t border-blue-900/30">
               {[
                 { value: '10k+', label: 'Active Users' },
                 { value: '50k+', label: 'Sessions' },
                 { value: '99.9%', label: 'Uptime' }
               ].map((stat) => (
                 <div key={stat.label} className="flex flex-col gap-1">
                   <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 pb-1">{stat.value}</div>
                   <div className="text-xs md:text-sm font-medium text-slate-500">{stat.label}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* right image */}
          <div className='relative group flex justify-center'>
            {/* Background glowing blur for image */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 z-0 scale-75"></div>
            
            <div className="relative z-10 w-full max-w-[500px] lg:max-w-none xl:w-[110%] flex items-center justify-center">
              <img 
                src="/herob.png" 
                alt="TalentMeet Platform"
                className='w-full h-auto max-h-[40vh] lg:max-h-[65vh] object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] transform group-hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 ease-out z-10' 
              />
            </div>
          </div>
        </div>
      </main>
      {/* features section */}
      <section className="py-24 relative z-10 bg-[#0a0f1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='text-center mb-16'>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything you Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Succeed</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
              Powerful features designed to make your coding interviews seamless and productive
            </p>
          </div>
          
          {/* features grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* feature1 */}
            <div className='group relative p-8 rounded-2xl bg-[#0f172a] border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 overflow-hidden'>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className='relative z-10 flex flex-col items-center text-center'>
                <div className='bg-blue-500/10 p-4 rounded-2xl mb-6 shadow-inner ring-1 ring-blue-500/20 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500/20 group-hover:ring-blue-400/50'>
                  <VideoIcon className='size-8 text-blue-400' />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">HD Video Call</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Crystal clear video and audio for seamless communication during interviews.
                </p>
              </div>
            </div>

            {/* feature2 */}
            <div className='group relative p-8 rounded-2xl bg-[#0f172a] border border-blue-900/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 overflow-hidden'>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className='relative z-10 flex flex-col items-center text-center'>
                <div className='bg-cyan-500/10 p-4 rounded-2xl mb-6 shadow-inner ring-1 ring-cyan-500/20 group-hover:scale-110 transition-transform duration-300 group-hover:bg-cyan-500/20 group-hover:ring-cyan-400/50'>
                  <Code2 className='size-8 text-cyan-400' />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Live Code Editor</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                 Collaborate in real-time with syntax highlighting and multiple language support.
                </p>
              </div>
            </div>

            {/* feature3 */}
            <div className='group relative p-8 rounded-2xl bg-[#0f172a] border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 overflow-hidden'>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className='relative z-10 flex flex-col items-center text-center'>
                <div className='bg-blue-500/10 p-4 rounded-2xl mb-6 shadow-inner ring-1 ring-blue-500/20 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500/20 group-hover:ring-blue-400/50'>
                  <Users className='size-8 text-blue-400' />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Easy Collaboration</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Share your screen, discuss solutions, and learn from each other in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;