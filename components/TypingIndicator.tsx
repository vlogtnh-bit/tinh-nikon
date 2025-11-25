import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-6 justify-start">
      <div className="flex max-w-[85%] flex-row items-end gap-2">
        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-lg bg-nikon-yellow text-black">
          AT
        </div>
        <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-gray-800/80 border border-white/5 shadow-md flex items-center gap-1.5 h-[46px]">
          <span className="w-2 h-2 bg-nikon-yellow rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-nikon-yellow rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-nikon-yellow rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};