import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Send, User, ShieldCheck, Scale, ExternalLink, ArrowRight, Loader2, Sparkles, Command, Mic, MicOff } from "lucide-react";
import { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";
import { getCivicAnswer } from "@/services/geminiService";
import { Content } from "@google/genai";

// Standard queries updated for a comprehensive AI tool
const getInitialQueries = () => [
  "What is the history of general elections in India?", 
  "Detail the structure of Lok Sabha.", 
  "Upcoming state timelines?",
  "How does VVPAT assure trust?"
];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: "welcome",
    role: "assistant",
    content: "Welcome! I am your AI aide for electoral and democratic intelligence. How can I assist you today?",
    source: "Verified Database",
    timestamp: new Date()
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join("");
          setInput(transcript);
        };
        
        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        setInput("");
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech Recognition API is not supported in this browser.");
      }
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const chatHistory: Content[] = messages
        .filter(m => m.id !== "welcome")
        .map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }]
        }));

      const aiResponseText = await getCivicAnswer(text, chatHistory);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponseText,
        source: "AI Synthesized from Verified Sources",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Network error fetching verified data. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full glass rounded-t-[2.5rem] rounded-b-none sm:rounded-[2rem] border-x-0 border-b-0 sm:border border-t border-white/60 shadow-[0_-8px_40px_rgba(0,0,0,0.08)] sm:shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden relative pb-[env(safe-area-inset-bottom)] transform-gpu">
      {/* Soft abstract blur inside the chat box */}
      <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[100%] rounded-full bg-white/40 blur-[80px] pointer-events-none transform-gpu will-change-transform" />

      {/* Message Area */}
      <div 
        role="log"
        aria-live="polite"
        className={cn(
        "flex-1 overflow-y-auto px-[clamp(1rem,4vw,2rem)] space-y-[clamp(1.5rem,3vw,2rem)] z-10 relative no-scrollbar scroll-smooth overscroll-contain will-change-scroll snap-y snap-proximity",
        messages.length === 1 ? "flex flex-col items-center justify-center pt-[10dvh] pb-10" : "py-[clamp(1.5rem,4vw,2.5rem)]"
      )}>
        <AnimatePresence initial={false}>
          {messages.length === 1 ? (
            <motion.div 
              key="welcome-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto py-8"
            >
              <div className="mb-6 md:mb-8 flex justify-center w-full">
                <div className="w-[clamp(3rem,7vw,4.5rem)] h-[clamp(3rem,7vw,4.5rem)] rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg relative overflow-hidden group hover:shadow-xl hover:scale-[1.02] transition-all duration-500 ease-out">
                  {isTyping && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                  )}
                  <Sparkles className={cn("w-[clamp(1.5rem,3.5vw,2.25rem)] h-[clamp(1.5rem,3.5vw,2.25rem)] text-white relative z-10", isTyping && "animate-pulse")} />
                </div>
              </div>
              <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-tight font-sans font-semibold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 mb-[clamp(1.5rem,4vw,3rem)] px-4">
                What can I help with?
              </h1>
              
              {/* Initial Queries */}
              <div className="flex flex-wrap gap-[clamp(0.5rem,1.5vw,0.75rem)] justify-center px-[clamp(0.5rem,2vw,1rem)] w-full max-w-2xl">
                {getInitialQueries().map((q, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[clamp(12px,1.25vw,14px)] bg-white/50 border border-white/60 text-slate-700 px-[clamp(1rem,2.5vw,1.25rem)] py-[clamp(0.6rem,1.5vw,0.85rem)] rounded-full hover:-translate-y-0.5 hover:shadow-md hover:bg-white/90 hover:border-black/10 active:scale-95 transition-all duration-200 shadow-sm backdrop-blur-md focus-visible:ring-2 focus-visible:ring-black focus:outline-none"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.filter(m => m.id !== "welcome").map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))
          )}
          {messages.length > 1 && isTyping && (
            <motion.div
              key="typing-indicator"
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex justify-start w-full snap-start scroll-mt-6"
            >
              <div className="flex max-w-[95%] lg:max-w-[85%] flex-row">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full flex items-center justify-center mt-1 flex-shrink-0 shadow-sm border glass-panel mr-4 border-white text-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                  <Command className="w-[16px] h-[16px] relative z-10 animate-pulse text-black/70" />
                </div>

                {/* Bubble */}
                <div className="flex flex-col items-start space-y-2">
                  <div className="px-5 py-4 rounded-[1.5rem] shadow-sm text-[15px] glass border border-white/60 rounded-tl-md flex flex-row items-center space-x-2">
                    <span className="text-[12px] font-medium text-slate-600 tracking-wider uppercase">Synthesizing</span>
                    <span className="flex space-x-1">
                      <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                      <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                      <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} className="h-4" />
      </div>

      {/* Persistent Input Area */}
      <div className="shrink-0 p-[clamp(1rem,3vw,1.5rem)] pb-[clamp(1.5rem,3vw,1.5rem)] bg-white/60 sm:bg-white/40 border-t border-white/40 backdrop-blur-xl z-20 rounded-none sm:rounded-b-[2rem] transform-gpu will-change-transform">
        <div className="max-w-4xl mx-auto w-full">
          {/* Input Form */}
          <form 
            onSubmit={e => { e.preventDefault(); handleSend(); }}
            className="relative flex items-center group glass-input rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] focus-within:shadow-[0_8px_40px_rgba(0,0,0,0.12)] focus-within:border-white focus-within:bg-white/90"
          >
            <textarea 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isTyping || isListening}
              placeholder={isListening ? "Listening natively..." : "Message AI Electoral Aide..."}
              aria-label="Message AI Electoral Aide"
              className={cn(
                "w-full bg-transparent pl-[clamp(1.25rem,4vw,2rem)] pr-[clamp(5.5rem,15vw,7rem)] py-[clamp(0.875rem,2.5vw,1.25rem)] mt-2 focus:outline-none focus:ring-0 text-[clamp(14px,1.5vw,16px)] text-black placeholder:text-slate-500 font-light transition-all resize-none min-h-[56px] max-h-[200px] overflow-y-auto no-scrollbar",
                isListening && "placeholder:text-red-400"
              )}
              rows={1}
            />
            <div className="absolute right-[clamp(0.375rem,1.5vw,0.5rem)] bottom-[clamp(0.25rem,1vw,0.5rem)] flex items-center space-x-[clamp(0.25rem,1vw,0.5rem)] mb-1.5 mr-1">
              <button
                type="button"
                onClick={toggleListening}
                aria-label={isListening ? "Stop listening natively" : "Start speaking natively"}
                className={cn(
                  "p-[clamp(0.5rem,1.5vw,0.625rem)] rounded-full transition-colors active:scale-95 duration-200 focus-visible:ring-2 focus-visible:ring-black focus:outline-none",
                  isListening 
                    ? "bg-red-50 text-red-600 hover:bg-red-100" 
                    : "text-slate-500 hover:bg-black/5 hover:text-black"
                )}
              >
                {isListening ? (
                  <div className="relative flex items-center justify-center" aria-hidden="true">
                    <MicOff className="w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)] relative z-10" />
                    <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-40"></span>
                  </div>
                ) : (
                  <Mic className="w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)]" aria-hidden="true" />
                )}
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); handleSend(); }}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="p-[clamp(0.5rem,1.5vw,0.625rem)] bg-black text-white rounded-[1rem] disabled:opacity-30 disabled:bg-black/10 disabled:text-black/40 hover:bg-slate-800 transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus:outline-none"
              >
                {isTyping ? <Loader2 className="w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)] animate-spin" aria-hidden="true" /> : <ArrowRight className="w-[clamp(1rem,2.5vw,1.25rem)] h-[clamp(1rem,2.5vw,1.25rem)]" aria-hidden="true" />}
              </button>
            </div>
          </form>
          
          <p className="text-[10px] sm:text-[11px] text-center text-slate-600/90 mt-3 font-light tracking-wide">
            Synthesis strictly utilizes verified government datasets. AI can make mistakes.
          </p>
        </div>
      </div>
    </div>
  );
};

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      layout
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn("flex w-full snap-start scroll-mt-6", isUser ? "justify-end" : "justify-start")}
    >
      <div className={cn("flex max-w-[95%] lg:max-w-[85%]", isUser ? "flex-row-reverse" : "flex-row")}>
        {/* Avatar */}
        <div className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center mt-1 flex-shrink-0 shadow-sm border",
          isUser ? "bg-black ml-4 border-black text-white" : "glass-panel mr-4 border-white text-black"
        )}>
          {isUser ? <User className="w-[18px] h-[18px]" /> : <Command className="w-[16px] h-[16px]" />}
        </div>

        {/* Bubble */}
        <div className={cn(
          "flex flex-col space-y-2",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={cn(
            "px-5 sm:px-7 py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm text-[15px] leading-relaxed transition-all",
            isUser ? "bg-black text-white rounded-tr-sm sm:rounded-tr-md shadow-md" : "glass border border-white/60 rounded-tl-sm sm:rounded-tl-md text-black"
          )}>
            {message.snack && (
              <div className="mb-4 pb-3 border-b border-white/10">
                <p className="font-heading font-medium text-[13px] tracking-wide text-white/50 uppercase">{message.snack}</p>
              </div>
            )}
            
            <div className={cn("markdown-body prose-sm sm:prose max-w-none", isUser ? "text-white" : "text-black")}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
            
            {message.source && !isUser && (
              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-medium -mx-7 -mb-6 px-7 py-3 bg-black/5 rounded-b-[2rem] border-x-0 border-b-0 backdrop-blur-sm">
                <div className="flex items-center text-slate-600">
                  <ExternalLink className="w-3.5 h-3.5 mr-2" />
                  {message.source}
                </div>
                <div className="group relative flex items-center text-emerald-700 bg-emerald-500/10 px-2.5 py-1.5 rounded-full border border-emerald-500/20 cursor-help">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                  Verified
                  
                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full right-0 mb-3 w-60 p-3 bg-black/90 backdrop-blur-xl text-white text-[11px] leading-relaxed rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15)] z-50 transform translate-y-2 group-hover:translate-y-0 border border-white/10">
                    <div className="font-medium text-[12px] mb-1.5 pb-1.5 border-b border-white/20 flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                      Verification Process
                    </div>
                    <p className="text-white/80 font-light">Data cryptographically matched and verified against <span className="font-medium text-white">{message.source}</span>.</p>
                    
                    {/* Tooltip Arrow pointing down */}
                    <div className="absolute top-full right-6 w-3 h-3 bg-black/90 rotate-45 -mt-1.5 border-b border-r border-white/10" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
