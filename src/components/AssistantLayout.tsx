import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, FileText, Landmark, Clock, Building2, MapPin, Search, LayoutDashboard, X } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { CalendarView } from "./CalendarView";
import { cn } from "@/lib/utils";

export const AssistantLayout: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center py-[clamp(0rem,2vw,1rem)] px-[clamp(0rem,4vw,2rem)] overflow-hidden relative bg-[#f7f8fa]">
      {/* Top Navbar */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-[1400px] flex-shrink-0 mb-[clamp(0.5rem,2vw,1.5rem)] flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-black/5 sm:border-none sm:bg-white/50 sm:glass px-[clamp(1rem,4vw,1.5rem)] py-[clamp(0.75rem,2vw,1.25rem)] rounded-none sm:rounded-[2rem] z-20 shadow-sm sm:shadow-none"
      >
        <div className="flex flex-col">
          <h1 className="font-heading font-semibold text-[clamp(1.1rem,3vw,1.4rem)] text-black tracking-tight leading-tight">Democracy, Simplified.</h1>
          <span className="text-[clamp(11px,1.5vw,13px)] text-slate-600 font-light mt-0.5 hidden sm:block">Next-Generation Electoral Intelligence</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={() => setShowSidebar(true)}
            aria-label="Toggle Insights Sidebar"
            className="md:hidden flex items-center justify-center p-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full bg-black/5 sm:bg-white/50 border border-black/5 sm:border-white/60 hover:bg-black hover:text-white transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-black focus:outline-none"
          >
            <LayoutDashboard className="w-[18px] h-[18px] sm:w-4 sm:h-4 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline text-[13px] font-medium tracking-wide">Insights</span>
          </button>
          <button 
            onClick={() => setShowCalendar(true)}
            aria-label="Open Calendar"
            className="hidden sm:flex items-center space-x-2 bg-white/50 hover:bg-black hover:text-white text-slate-700 px-5 py-2.5 rounded-full border border-white/60 hover:border-black transition-all shadow-sm duration-300 focus-visible:ring-2 focus-visible:ring-black focus:outline-none"
          >
            <CalendarIcon className="w-4 h-4" aria-hidden="true" />
            <span className="text-[13px] font-medium tracking-wide">Calendar</span>
          </button>
          <div className="flex items-center space-x-1.5 sm:space-x-3 bg-white sm:bg-white/80 px-2.5 py-1.5 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-full border border-black/5 sm:border-white shadow-sm">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" />
            <span className="text-[10px] sm:text-[13px] font-medium text-black uppercase sm:normal-case tracking-wider sm:tracking-normal">
              <span className="hidden sm:inline">Republic of India</span>
              <span className="sm:hidden">IND</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1400px] flex flex-1 min-h-0 pb-0 sm:pb-4 px-0 sm:px-0 z-10 relative gap-[clamp(0rem,3vw,2rem)]">
        
        {/* Mobile Overlay Background */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transform-gpu will-change-transform"
            />
          )}
        </AnimatePresence>

        {/* Left Column: Deep Context Panels (Sidebar) */}
        <div 
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[clamp(280px,85vw,400px)] bg-white/95 backdrop-blur-3xl md:bg-transparent p-5 sm:p-6 md:p-0 shadow-[20px_0_40px_rgba(0,0,0,0.1)] md:shadow-none transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:static md:transform-none flex flex-col pt-16 md:pt-0 border-r border-black/5 md:border-none will-change-transform transform-gpu",
            showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          {/* Mobile Sidebar Close Button */}
          <button 
            onClick={() => setShowSidebar(false)}
            aria-label="Close Sidebar"
            className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full md:hidden block transition-colors focus-visible:ring-2 focus-visible:ring-black focus:outline-none"
          >
            <X className="w-5 h-5 text-black" aria-hidden="true" />
          </button>

          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
            className="flex-1 flex flex-col space-y-5 sm:space-y-6 overflow-y-auto pr-1 md:pr-2 no-scrollbar pb-6 md:pb-10 overscroll-contain will-change-scroll"
          >
            {/* Parliamentary Data Node */}
          <Card className="hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500 group border-white/80">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-[16px] sm:text-lg">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/5 flex items-center justify-center mr-3">
                  <Landmark className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                Parliamentary Intel
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/50 rounded-2xl border border-white shadow-sm backdrop-blur-sm hover:bg-white/80 transition-colors">
                  <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-widest mb-1.5">Lok Sabha</p>
                  <p className="font-heading font-medium text-2xl text-black">543</p>
                  <p className="text-[12px] text-slate-600 mt-0.5 font-light">Lower House</p>
                </div>
                <div className="p-4 bg-white/50 rounded-2xl border border-white shadow-sm backdrop-blur-sm hover:bg-white/80 transition-colors">
                  <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-widest mb-1.5">Rajya Sabha</p>
                  <p className="font-heading font-medium text-2xl text-black">245</p>
                  <p className="text-[12px] text-slate-600 mt-0.5 font-light">Upper House</p>
                </div>
              </div>
            <div className="relative group">
              <div className="mt-5 flex items-center justify-between text-xs text-slate-600 bg-white/60 border border-white p-3 rounded-xl shadow-sm backdrop-blur-md cursor-text hover:bg-white/80 transition-colors">
                <span className="flex items-center font-medium"><Search className="w-3.5 h-3.5 mr-2 text-black" /> Neural Sync Search</span>
                <span className="flex items-center text-[10px] uppercase tracking-wider text-black font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" /> Live
                </span>
              </div>
              
              {/* Dropdown suggestions */}
              <div className="absolute top-12 left-0 right-0 bg-white/90 backdrop-blur-xl border border-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="p-2 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Trending Queries</div>
                  <button className="flex items-center w-full px-3 py-2 text-[13px] text-slate-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-left focus-visible:ring-2 focus-visible:ring-black focus:outline-none" onClick={() => (document.querySelector('input[placeholder*="Initialize query"]') as HTMLInputElement)?.focus()}>
                    <Clock className="w-3.5 h-3.5 mr-2 opacity-50" aria-hidden="true" />
                    When is the next Lok Sabha election?
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-[13px] text-slate-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-left focus-visible:ring-2 focus-visible:ring-black focus:outline-none" onClick={() => (document.querySelector('input[placeholder*="Initialize query"]') as HTMLInputElement)?.focus()}>
                    <Landmark className="w-3.5 h-3.5 mr-2 opacity-50" aria-hidden="true" />
                    Current composition of Rajya Sabha
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-[13px] text-slate-600 hover:text-black hover:bg-black/5 rounded-lg transition-colors text-left focus-visible:ring-2 focus-visible:ring-black focus:outline-none" onClick={() => (window.open("https://voters.eci.gov.in/", "_blank"))}>
                    <FileText className="w-3.5 h-3.5 mr-2 opacity-50" aria-hidden="true" />
                    How to fill Form 6
                  </button>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>

          {/* Timeline & Future Projections */}
          <Card className="hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500 border-white/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-[16px] sm:text-lg">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/5 flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                Matrix Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-7">
                <div className="relative pl-6 border-l-[1.5px] border-black/10">
                  <div className="absolute w-3.5 h-3.5 bg-black rounded-full -left-[8px] top-1.5 ring-4 ring-white" />
                  <p className="text-[15px] font-medium text-black tracking-tight">Assembly Phase (2026)</p>
                  <p className="text-[13px] text-slate-600 mt-1.5 leading-relaxed font-light">Kerala, Tamil Nadu, West Bengal, Assam, Puducherry counting.</p>
                </div>
                <div className="relative pl-6 border-l-[1.5px] border-black/10">
                  <div className="absolute w-3.5 h-3.5 bg-white border-[2.5px] border-black rounded-full -left-[8px] top-1.5 ring-4 ring-white" />
                  <p className="text-[15px] font-medium text-black tracking-tight">Presidential Election (2027)</p>
                  <p className="text-[13px] text-slate-600 mt-1.5 leading-relaxed font-light">Electoral College configuration projections pending final state outputs.</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute w-3.5 h-3.5 bg-slate-200 rounded-full -left-[7px] top-1.5" />
                  <p className="text-[15px] font-medium text-slate-700 tracking-tight">Delimitation (2027+)</p>
                  <p className="text-[13px] text-slate-600 mt-1.5 leading-relaxed font-light">Constituency borders and 33% Women's Reservation integration.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Form / Process Reference */}
          <Card className="border-white/80 shrink-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-[clamp(15px,2vw,18px)]">
                <div className="w-[clamp(2rem,4vw,2.5rem)] h-[clamp(2rem,4vw,2.5rem)] rounded-full bg-black/5 flex items-center justify-center mr-3 shrink-0">
                  <FileText className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)] text-black" />
                </div>
                ECI Action Forms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <ActionItem title="Form 6" subtitle="General Voter Registration (18+)" url="https://voters.eci.gov.in/" />
              <ActionItem title="Form 8" subtitle="Corrections & Address Shifting" url="https://voters.eci.gov.in/" />
              <ActionItem title="Form 6A" subtitle="Overseas/NRI Enrollment" url="https://voters.eci.gov.in/" />
            </CardContent>
          </Card>
          </motion.div>
        </div>

        {/* Right Column: AI Chat Interface */}
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
          className="flex-1 flex flex-col h-full min-h-0 min-w-0 z-20"
        >
          <ChatInterface />
        </motion.div>
        
      </div>
      
      <AnimatePresence>
        {showCalendar && <CalendarView onClose={() => setShowCalendar(false)} />}
      </AnimatePresence>
    </div>
  );
};

const ActionItem = ({ title, subtitle, url }: { title: string, subtitle: string, url: string }) => (
  <a 
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${title}: ${subtitle}`}
    className="block w-full text-left p-[clamp(1rem,3vw,1.25rem)] rounded-[clamp(1rem,2vw,1.5rem)] bg-white/40 hover:bg-black hover:text-white border border-white/60 hover:border-black backdrop-blur-sm transition-all duration-200 group shadow-sm active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-black focus:outline-none"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="font-heading font-medium text-[clamp(14px,2vw,16px)] text-black group-hover:text-white transition-colors">{title}</p>
        <p className="text-[clamp(11px,1.5vw,13px)] text-slate-600 group-hover:text-white/70 mt-1 font-light transition-colors">{subtitle}</p>
      </div>
      <div className="w-[clamp(2rem,4vw,2.5rem)] h-[clamp(2rem,4vw,2.5rem)] rounded-full border border-black/10 group-hover:border-white/20 flex items-center justify-center transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right opacity-50 group-hover:opacity-100 group-hover:text-white transition-all group-hover:translate-x-0.5" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </div>
  </a>
);
