import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Image } from 'lucide-react'; 
import { Message, Sender } from '../types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { sendMessageToGemini } from '../services/geminiService';
import { INITIAL_GREETING } from '../constants';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      text: INITIAL_GREETING,
      sender: Sender.BOT,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Reset height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: Sender.USER,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Placeholder for Bot Message ID
      const botMsgId = (Date.now() + 1).toString();
      let accumulatedText = "";

      // Add placeholder bot message initially
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          text: "",
          sender: Sender.BOT,
          timestamp: new Date(),
        }
      ]);

      await sendMessageToGemini(userText, (chunkText) => {
        accumulatedText = chunkText;
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMsgId ? { ...msg, text: accumulatedText } : msg
          )
        );
      });

    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Chết cha, não tao bị lag nhẹ rồi. Hỏi lại phát nữa đi homie!",
          sender: Sender.BOT,
          timestamp: new Date(),
          isError: true
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-transparent to-black/20">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 pt-6 pb-2 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && messages[messages.length - 1]?.sender !== Sender.BOT && <TypingIndicator />}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 pt-2 bg-gradient-to-t from-black/60 to-transparent">
        <div className="relative flex items-end gap-2 bg-gray-900/90 border border-white/10 rounded-2xl p-2 shadow-xl backdrop-blur-md ring-1 ring-white/5 transition-all focus-within:ring-nikon-yellow/50 focus-within:border-nikon-yellow/50">
          
          <button className="p-2 text-gray-400 hover:text-nikon-yellow transition-colors rounded-full hover:bg-white/5">
            <Image className="w-5 h-5" />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nói gì đi ba..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm md:text-base p-2 max-h-32 resize-none focus:outline-none scrollbar-hide"
          />

          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className={`p-2 rounded-xl transition-all duration-200 mb-0.5 flex items-center justify-center
              ${inputValue.trim() && !isTyping 
                ? 'bg-nikon-yellow text-black hover:bg-yellow-400 shadow-[0_0_10px_rgba(255,225,0,0.3)] transform hover:scale-105 active:scale-95' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2 text-[10px] text-gray-600 font-mono">
          Anh Tình Đẹp Trai có thể mắc lỗi (nhưng hiếm lắm, tin tao đi).
        </div>
      </div>
    </div>
  );
};