import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { ChevronLeft, ChevronRight, Filter, Calendar as CalendarIcon, X, Search, ChevronDown } from 'lucide-react';
import { ELECTION_EVENTS, STATES_LIST, ElectionEventType, ElectionEvent } from '@/data/electionEvents';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface CalendarViewProps {
  onClose: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026
  
  // Filters
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<ElectionEventType | 'All'>('All');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');

  // Days mapping
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const filteredEvents = useMemo(() => {
    return ELECTION_EVENTS.filter(event => {
      if (selectedState !== 'All' && event.state !== selectedState) return false;
      if (selectedType !== 'All' && event.type !== selectedType) return false;
      return true;
    });
  }, [selectedState, selectedType]);

  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter(event => {
      // Create a date from the event string, being careful with timezones.
      // ELECTION_EVENTS dates are YYYY-MM-DD
      const [y, m, d] = event.date.split('-').map(Number);
      const eventDate = new Date(y, m - 1, d);
      return isSameDay(day, eventDate);
    });
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getTypeColor = (type: ElectionEventType) => {
    switch (type) {
      case 'Assembly': return 'bg-orange-100 text-orange-900 border-orange-200';
      case 'Lok Sabha': return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'History': return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'Key Date': return 'bg-rose-100 text-rose-900 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white/40 backdrop-blur-3xl"
    >
      <div className="glass rounded-[2rem] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-white/30 pointer-events-none" />
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-black/5 bg-white/20 backdrop-blur-md gap-4 z-10 relative">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center mr-4 shadow-sm">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[1.3rem] font-heading font-medium text-black tracking-tight leading-none">Electoral Calendar</h2>
              <p className="text-[12px] text-slate-500 font-light mt-1 tracking-wide">Democratic timelines & projections</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-50">
            {/* Filters */}
            <div className="flex items-center space-x-1 sm:space-x-2 bg-white/50 border border-white/80 rounded-xl p-1 shadow-sm backdrop-blur-sm relative z-50">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black ml-2 opacity-50" />
              
              {/* Click-away overlay */}
              {(isTypeOpen || isStateOpen) && (
                <div 
                  className="fixed inset-0 z-[90]" 
                  onClick={() => { setIsTypeOpen(false); setIsStateOpen(false); }}
                />
              )}
              
              {/* Type Dropdown */}
              <div className="relative z-[100]">
                <button
                  onClick={() => { setIsTypeOpen(!isTypeOpen); setIsStateOpen(false); }}
                  className="flex items-center justify-between min-w-[90px] sm:min-w-[110px] bg-transparent text-[12px] sm:text-[13px] font-medium text-black focus:outline-none py-1.5 px-2 sm:px-3 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <span className="truncate">{selectedType === 'All' ? 'All Types' : selectedType}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1.5 sm:ml-2 shrink-0" />
                </button>
                <AnimatePresence>
                  {isTypeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[calc(100%+0.5rem)] left-0 w-40 bg-white/95 backdrop-blur-xl border border-white shadow-xl rounded-xl py-2 overflow-hidden z-[100]"
                    >
                      {['All', 'Assembly', 'Lok Sabha', 'Key Date', 'History'].map(type => (
                        <button
                          key={type}
                          onClick={() => { setSelectedType(type as any); setIsTypeOpen(false); }}
                          className={cn(
                            "w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 transition-colors",
                            selectedType === type ? "font-medium text-black bg-slate-50/50" : "text-slate-600 font-light"
                          )}
                        >
                          {type === 'All' ? 'All Types' : type}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px h-5 bg-black/10 mx-0.5 sm:mx-1" />
              
              {/* State Dropdown */}
              <div className="relative z-[100]">
                <button
                  onClick={() => { setIsStateOpen(!isStateOpen); setIsTypeOpen(false); }}
                  className="flex items-center justify-between min-w-[100px] sm:min-w-[130px] max-w-[130px] sm:max-w-[160px] bg-transparent text-[12px] sm:text-[13px] font-medium text-black focus:outline-none py-1.5 px-2 sm:px-3 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <span className="truncate">{selectedState === 'All' ? 'All States' : selectedState}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1.5 sm:ml-2 shrink-0" />
                </button>
                <AnimatePresence>
                  {isStateOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[calc(100%+0.5rem)] right-0 w-[240px] sm:w-64 bg-white/95 backdrop-blur-xl border border-white shadow-xl rounded-xl overflow-hidden z-[100] flex flex-col"
                    >
                      <div className="p-2 border-b border-black/5">
                        <div className="flex items-center bg-black/5 rounded-lg px-3 py-2">
                          <Search className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
                          <input 
                            type="text" 
                            placeholder="Search states..."
                            value={stateSearch}
                            onChange={e => setStateSearch(e.target.value)}
                            className="bg-transparent text-[13px] border-none outline-none w-full placeholder:text-slate-500 font-light flex-1"
                          />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto no-scrollbar py-2">
                        <button
                          onClick={() => { setSelectedState('All'); setIsStateOpen(false); setStateSearch(''); }}
                          className={cn(
                            "w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 transition-colors",
                            selectedState === 'All' ? "font-medium text-black bg-slate-50/50" : "text-slate-600 font-light"
                          )}
                        >
                          All States
                        </button>
                        {STATES_LIST.filter(st => st.toLowerCase().includes(stateSearch.toLowerCase())).map(st => (
                          <button
                            key={st}
                            onClick={() => { setSelectedState(st); setIsStateOpen(false); setStateSearch(''); }}
                            className={cn(
                              "w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 transition-colors",
                              selectedState === st ? "font-medium text-black bg-slate-50/50" : "text-slate-600 font-light"
                            )}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-black hover:text-white bg-white/50 border border-white/60 text-slate-500 transition-all shadow-sm backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Nav */}
        <div className="px-8 py-5 flex items-center justify-between border-b border-black/5 bg-white/40 z-10 relative">
          <h3 className="text-2xl font-medium font-heading text-black tracking-tight">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          <div className="flex items-center space-x-2">
            <button onClick={prevMonth} className="p-2.5 rounded-xl bg-white/50 border border-white/80 hover:bg-black hover:text-white transition-colors shadow-sm">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentDate(new Date(2026, 4, 1))} className="px-4 py-2.5 text-[13px] font-medium rounded-xl bg-white/50 border border-white/80 hover:bg-black hover:text-white transition-colors shadow-sm">
              Today
            </button>
            <button onClick={nextMonth} className="p-2.5 rounded-xl bg-white/50 border border-white/80 hover:bg-black hover:text-white transition-colors shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 flex flex-col min-h-0 p-8 overflow-auto z-10 relative">
          <div className="grid grid-cols-7 gap-px mb-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="text-center text-[10px] font-semibold uppercase tracking-widest text-black/40 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3 flex-1 auto-rows-fr">
            {days.map((day, idx) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isTodayDate = isSameDay(day, new Date(2026, 4, 3)); 

              return (
                <div 
                  key={idx} 
                  className={cn(
                    "min-h-[110px] border shadow-sm rounded-2xl p-3 transition-colors overflow-hidden flex flex-col",
                    isCurrentMonth ? "bg-white/60 border-white/80 backdrop-blur-md hover:bg-white/90" : "bg-white/20 border-white/30 backdrop-blur-sm opacity-60",
                    isTodayDate && "ring-2 ring-black border-transparent bg-white shadow-md relative"
                  )}
                >
                  {isTodayDate && <div className="absolute top-0 right-0 w-8 h-8 bg-black/5 rounded-bl-3xl" />}
                  <div className="flex justify-between items-start mb-3">
                    <span className={cn(
                      "text-[13px] font-medium w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                      isTodayDate ? "bg-black text-white" : "text-black"
                    )}>
                      {format(day, 'd')}
                    </span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-1 space-y-2 no-scrollbar">
                    {dayEvents.map(event => (
                      <div 
                        key={event.id}
                        className={cn(
                          "px-2.5 py-2 rounded-xl text-[11px] leading-tight cursor-help shadow-sm border",
                          getTypeColor(event.type)
                        )}
                        title={event.description}
                      >
                        <p className="font-semibold tracking-tight truncate">{event.title}</p>
                        {event.state && <p className="opacity-80 truncate mt-0.5">{event.state}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
