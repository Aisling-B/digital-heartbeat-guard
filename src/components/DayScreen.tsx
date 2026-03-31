import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DayData, Choice, GameState } from "@/game/gameData";
import ObligationMeter from "./ObligationMeter";

interface DayScreenProps {
  dayData: DayData;
  gameState: GameState;
  onChoice: (choice: Choice) => void;
  onNext: () => void;
}

export default function DayScreen({ dayData, gameState, onChoice, onNext }: DayScreenProps) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [narrativeIndex, setNarrativeIndex] = useState(0);
  const allNarrativeShown = narrativeIndex >= dayData.narrative.length;

  const handleNarrativeTap = () => {
    if (narrativeIndex < dayData.narrative.length) {
      setNarrativeIndex((i) => i + 1);
    }
  };

  const handleChoice = (choice: Choice) => {
    if (chosen) return;
    setChosen(choice.id);
    onChoice(choice);
  };

  const streakDisplay = dayData.day === 6 ? "💀" : `🔥 ${dayData.streakCount}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-phone rounded-3xl border border-border overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Phone header */}
        <div className="px-6 pt-6 pb-3 flex justify-between items-center border-b border-border">
          <div>
            <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
              Day {dayData.day + 1} of 7
            </span>
            <h2 className="text-lg font-semibold mt-0.5">{dayData.title}</h2>
          </div>
          <div className="text-right">
            <motion.span
              className="text-2xl"
              key={dayData.streakCount}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {streakDisplay}
            </motion.span>
            {dayData.hourglass && (
              <div className="text-xs text-streak animate-hourglass-pulse mt-1">
                ⏳ {dayData.hourglassTime}
              </div>
            )}
          </div>
        </div>

        {/* Obligation meter */}
        <div className="px-6 py-3">
          <ObligationMeter value={gameState.obligationMeter} />
        </div>

        {/* System alert */}
        {dayData.systemAlert && (
          <motion.div
            className="mx-6 mb-3 px-4 py-2.5 bg-secondary rounded-lg border border-border text-xs font-mono text-streak"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {dayData.systemAlert}
          </motion.div>
        )}

        {/* Narrative area */}
        <div
          className="px-6 py-4 min-h-[200px] cursor-pointer select-none"
          onClick={handleNarrativeTap}
        >
          <AnimatePresence mode="wait">
            {dayData.narrative.slice(0, narrativeIndex + 1).map((text, i) => (
              <motion.p
                key={i}
                className="text-sm leading-relaxed mb-3 text-foreground/90"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {text}
              </motion.p>
            ))}
          </AnimatePresence>

          {!allNarrativeShown && (
            <motion.p
              className="text-xs text-muted-foreground mt-4"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              tap to continue...
            </motion.p>
          )}

          {/* Alex's Content Section */}
          {allNarrativeShown && (dayData.alexMessage || (dayData as any).alexImage) && (
            <motion.div
              className="flex flex-col items-start mt-4 space-y-2"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs text-muted-foreground font-mono ml-1">Alex</p>
              
              {(dayData as any).alexImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-border w-full aspect-[4/3] bg-black">
                  <img 
                    src={(dayData as any).alexImage} 
                    alt="Incoming snap" 
                    className="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      // Debugging fallback if image fails
                      console.error("Image failed to load:", (dayData as any).alexImage);
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-white/20 text-8xl font-bold -rotate-12 select-none font-serif">S</span>
                  </div>
                </div>
              ) : (
                <div className="bg-chat-bubble px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[80%]">
                  <p className="text-sm">{dayData.alexMessage}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Choices */}
        {allNarrativeShown && (
          <motion.div
            className="px-6 pb-6 space-y-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {!chosen ? (
              dayData.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left px-4 py-3.5 rounded-xl border border-border bg-secondary hover:border-primary/50 transition-all duration-200 group"
                >
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {choice.text}
                  </p>
                  {choice.description && (
                    <p className="text-xs text-muted-foreground mt-1">{choice.description}</p>
                  )}
                </button>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="px-4 py-3 bg-chat-self rounded-2xl rounded-br-sm ml-auto max-w-[80%]">
                  <p className="text-sm text-white">
                    {dayData.choices.find((c) => c.id === chosen)?.text}
                  </p>
                </div>
                <button
                  onClick={onNext}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  {dayData.day >= 6 ? "See Your Audit →" : "Next Day →"}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
