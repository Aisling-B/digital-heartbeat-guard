import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, MessageCircle, Brain, AlertCircle, Hourglass, Zap } from "lucide-react";
import { DayData } from "@/game/gameData";
import { GameState } from "@/game/useGameState";
import ObligationMeter from "./ObligationMeter";
import { Button } from "./ui/button";

interface DayScreenProps {
  dayData: DayData;
  gameState: GameState;
  onChoice: (choiceType: "maintenance" | "connection" | "closeApp") => void;
  onNext: () => void;
}

export default function DayScreen({ dayData, gameState, onChoice, onNext }: DayScreenProps) {
  const [currentNarrativeIdx, setCurrentNarrativeIdx] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Reset narrative index when day changes
  useEffect(() => {
    setCurrentNarrativeIdx(0);
    setShowContent(false);
  }, [dayData.day]);

  const allNarrativeShown = currentNarrativeIdx >= dayData.narrative.length;

  const handleNarrativeNext = () => {
    if (currentNarrativeIdx < dayData.narrative.length) {
      setCurrentNarrativeIdx(prev => prev + 1);
    } else {
      setShowContent(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background overflow-hidden">
      <motion.div 
        className={`w-full max-w-md bg-card rounded-[3rem] border-8 border-muted shadow-2xl overflow-hidden flex flex-col relative transition-all duration-700 ${gameState.mentalEnergy < 30 ? "grayscale-[0.5] brightness-90" : ""}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Header - Simulated Snapchat Top Bar */}
        <header className="bg-snap-yellow px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">A</div>
            <p className="text-white font-black italic uppercase tracking-tighter">Alex</p>
          </div>
          <div className="flex items-center gap-2 bg-black/10 rounded-full px-4 py-2">
            {dayData.hourglass && (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                <Hourglass className="w-4 h-4 text-destructive" />
              </motion.div>
            )}
            <span className="text-xl">🔥</span>
            <span className="text-white font-black text-2xl tracking-tighter">{gameState.streak}</span>
          </div>
        </header>

        {/* Research Metrics - Always Visible to show the "Cost" of the Chore */}
        <div className="p-6 space-y-4 bg-muted/30 border-b z-10">
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground">
              <span className="flex items-center gap-1"><Brain className="w-3 h-3" /> Cognitive Load</span>
              <span>{gameState.mentalEnergy}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-energy" 
                initial={{ width: 0 }}
                animate={{ width: `${gameState.mentalEnergy}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground">
              <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3 text-destructive" /> Perceived Obligation</span>
              <span>{gameState.obligation}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-destructive" 
                initial={{ width: 0 }}
                animate={{ width: `${gameState.obligation}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area / Snap Viewport */}
        <div className="flex-1 flex flex-col relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!showContent ? (
              <motion.div 
                key="narrative"
                className="p-8 flex flex-col items-center justify-center text-center h-full space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-snap-yellow text-6xl font-black italic opacity-20">DAY {dayData.day + 1}</div>
                <p className="text-lg font-bold leading-tight text-foreground">
                  {dayData.narrative[currentNarrativeIdx]}
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleNarrativeNext}
                  className="rounded-full px-8 font-bold border-2"
                >
                  {currentNarrativeIdx < dayData.narrative.length - 1 ? "Keep Going" : "Check Phone"}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="snap-view"
                className="relative h-full w-full bg-black flex flex-col"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {/* Visualizing the "Maintenance Snap" Concept [cite: 3511, 3512] */}
                {dayData.alexImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={dayData.alexImage} 
                      className="w-full h-full object-cover opacity-60 blur-[1px]" 
                      alt="Snap from Alex"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white/30 text-[12rem] font-black -rotate-12 select-none">S</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center bg-zinc-900">
                     <Zap className="w-16 h-16 text-muted-foreground/20 animate-pulse" />
                  </div>
                )}
                
                <div className="absolute top-6 left-6 right-6">
                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                      <p className="text-[10px] font-black text-snap-yellow uppercase mb-1">Incoming Message</p>
                      <p className="text-sm font-bold text-white italic">"{dayData.alexMessage}"</p>
                   </div>
                </div>

                {/* Interaction Drawer */}
                <motion.div 
                  className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-20"
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                >
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Button 
                      onClick={() => onChoice("maintenance")}
                      className="h-20 flex flex-col gap-1 bg-snap-purple hover:bg-snap-purple/90 rounded-3xl"
                    >
                      <Camera className="w-6 h-6" />
                      <span className="text-[10px] font-black uppercase">Service Chore</span>
                    </Button>
                    <Button 
                      onClick={() => onChoice("connection")}
                      disabled={gameState.mentalEnergy < 35}
                      className="h-20 flex flex-col gap-1 bg-snap-blue hover:bg-snap-blue/90 rounded-3xl disabled:opacity-30"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Genuine Effort</span>
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => onChoice("closeApp")}
                    className="w-full text-destructive hover:text-destructive/80 font-black text-[10px] uppercase tracking-[0.2em]"
                  >
                    Lose {gameState.streak}-Day Investment
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress Fact Footer [cite: 4078, 4080] */}
        <footer className="p-4 bg-muted/10 text-center border-t">
           <p className="text-[9px] text-muted-foreground font-medium italic">
             "33% of users feel pressured to open the app every day because of the streak."
           </p>
        </footer>
      </motion.div>
    </div>
  );
}
