import React from 'react';
import { Message, Sender } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === Sender.BOT;

  // Helper to parse text and render links
  const renderContent = (text: string) => {
    // Regex to capture URLs
    const parts = text.split(/(https?:\/\/[^\s]+)/g);
    
    return parts.map((part, i) => {
      if (part.match(/^https?:\/\//)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline break-all hover:opacity-80 transition-opacity ${
              isBot ? 'text-nikon-yellow font-medium' : 'text-blue-800'
            }`}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-lg 
          ${isBot ? 'bg-nikon-yellow text-black' : 'bg-gray-700 text-white'}`}>
          {isBot ? 'AT' : 'Me'}
        </div>

        {/* Bubble */}
        <div
          className={`relative px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-md
            ${isBot 
              ? 'bg-gray-800/80 text-gray-100 rounded-bl-none border border-white/5' 
              : 'bg-gradient-to-r from-nikon-yellow to-yellow-500 text-black font-medium rounded-br-none'
            }
          `}
        >
          {/* Content with link parsing */}
          <div className="whitespace-pre-wrap break-words">
            {renderContent(message.text)}
          </div>
          
          {/* Timestamp */}
          <div className={`text-[10px] mt-1 opacity-50 flex ${isBot ? 'justify-start' : 'justify-end'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};