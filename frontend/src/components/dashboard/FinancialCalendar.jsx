import React, { useState } from 'react';
import { Mic, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinancialCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();
  
  // Adjust first day to start on Monday (1) instead of Sunday (0)
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const events = [
    { day: 14, type: 'salary', color: '#c6ff00', title: 'Salary Credit', message: 'Your Salary is scheduled to be credited today.' },
    { day: 5, type: 'emi', color: '#f43f5e', title: 'EMI Payment', message: 'Your Home Loan EMI payment is due today.' },
    { day: 10, type: 'sip', color: '#4d7cfe', title: 'SIP Deduction', message: 'Your Mutual Fund SIP will be auto-deducted.' },
    { day: 25, type: 'bill', color: '#f59e0b', title: 'Bill Due', message: 'Your Credit Card bill is due today. Should I pay it?' },
  ];

  const today = new Date();
  
  // Find event for selected day
  const activeEvent = selectedDay ? events.find(e => e.day === selectedDay) : null;

  return (
    <div className="bg-[#4d7cfe] rounded-[2.5rem] p-8 text-white h-full relative overflow-hidden shadow-[0_0_50px_rgba(77,124,254,0.3)]">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black">AI Financial Calendar</h3>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">{currentMonth} {currentYear}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                <ChevronLeft size={16} />
              </button>
              <button onClick={handleNextMonth} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 text-center">
            {days.map((d, i) => (
              <span key={`header-${i}`} className="text-[10px] font-black opacity-40 uppercase tracking-tighter">
                {d}
              </span>
            ))}
            {[...Array(startingDay)].map((_, i) => (
              <div key={`empty-${i}`} className="h-9 w-9"></div>
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const event = events.find(e => e.day === day);
              const isToday = 
                day === today.getDate() && 
                currentDate.getMonth() === today.getMonth() && 
                currentDate.getFullYear() === today.getFullYear();
              
              const isSelected = selectedDay === day;

              return (
                <div 
                  key={`day-${i}`} 
                  onClick={() => setSelectedDay(day)}
                  className={`h-9 w-9 rounded-2xl flex items-center justify-center text-xs font-black relative cursor-pointer transition-all hover:scale-110
                    ${isToday ? 'bg-white text-[#4d7cfe] shadow-xl' : isSelected ? 'bg-white/30 text-white shadow-inner' : 'hover:bg-white/10'}
                  `}
                >
                  {day}
                  {event && (
                    <div 
                      className="absolute bottom-1 w-1 h-1 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <div 
            onClick={() => { if(activeEvent) document.dispatchEvent(new CustomEvent('open-voice-assistant')) }}
            className={`p-5 rounded-3xl bg-black/20 border border-white/10 backdrop-blur-sm group transition-all ${activeEvent ? 'cursor-pointer hover:bg-black/30' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 min-w-[40px] rounded-2xl bg-[#c6ff00] flex items-center justify-center text-black shadow-[0_0_20px_rgba(198,255,0,0.5)]">
                {activeEvent ? <Mic size={18} /> : <Calendar size={18} />}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-0.5">
                  {activeEvent ? 'AI Voice Reminder' : 'Daily Status'}
                </p>
                <p className="text-sm font-bold leading-tight">
                  {activeEvent ? activeEvent.message : selectedDay ? "No financial events scheduled for this day." : "Select a day to view details."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
