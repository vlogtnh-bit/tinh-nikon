import React from 'react';
import { ChatInterface } from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nikon-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-0 md:p-4 overflow-hidden">
      <div className="w-full max-w-4xl h-screen md:h-[90vh] bg-glass-dark backdrop-blur-xl border border-glass-light md:rounded-2xl shadow-2xl flex flex-col relative overflow-hidden ring-1 ring-white/10">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-nikon-yellow flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(255,225,0,0.5)]">
              AT
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide text-gray-100">
                Anh Tình <span className="text-nikon-yellow">Đẹp Trai</span>
              </h1>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Đang online chờ cà khịa
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors" title="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </button>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 overflow-hidden relative">
            <ChatInterface />
        </main>
        
      </div>
      
      <div className="mt-4 text-xs text-gray-500 hidden md:block">
        Powered by <span className="text-nikon-yellow">Tình Nikon's Brain</span> & Gemini 2.5
      </div>
    </div>
  );
};

export default App;