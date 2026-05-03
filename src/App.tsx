import { AnimatePresence } from 'motion/react';
import { AssistantLayout } from './components/AssistantLayout';

export default function App() {
  return (
    <div className="h-[100dvh] relative w-full overflow-hidden text-slate-900 font-sans bg-[#f7f8fa]">
      {/* Ultra-soft abstract pure white/light mesh background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-white/80 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-50/40 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-slate-100/60 blur-[130px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />

      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <AssistantLayout key="assistant" />
        </AnimatePresence>
      </div>
    </div>
  );
}
