import { useState, useCallback } from "react";
import { GameState, initialGameState, Choice } from "./gameData";

export function useGameState() {
  const [state, setState] = useState<GameState>(initialGameState);
  const [phase, setPhase] = useState<"intro" | "playing" | "audit">("intro");

  const startGame = useCallback(() => {
    setState(initialGameState);
    setPhase("playing");
  }, []);

  const makeChoice = useCallback((day: number, choice: Choice) => {
    setState((prev) => {
      const newObligation = Math.max(0, Math.min(100, prev.obligationMeter + choice.obligationDelta));
      const newState: GameState = {
        ...prev,
        obligationMeter: newObligation,
        genuineConnections: prev.genuineConnections + (choice.genuineCount ? 1 : 0),
        maintenanceSnaps: prev.maintenanceSnaps + (choice.type === "maintenance" ? 1 : 0),
        totalVisits: prev.totalVisits + 1,
        choices: { ...prev.choices, [day]: choice.id },
        surrogateAccepted: choice.type === "surrogate" ? true : prev.surrogateAccepted,
        streakRestored: choice.type === "restore" ? true : prev.streakRestored,
        streakAlive: choice.type === "let-go" ? false : prev.streakAlive,
      };
      return newState;
    });
  }, []);

  const nextDay = useCallback(() => {
    setState((prev) => {
      if (prev.currentDay >= 6) {
        setPhase("audit");
        return prev;
      }
      return { ...prev, currentDay: prev.currentDay + 1 };
    });
  }, []);

  const goToAudit = useCallback(() => setPhase("audit"), []);
  const restart = useCallback(() => {
    setState(initialGameState);
    setPhase("intro");
  }, []);

  return { state, phase, startGame, makeChoice, nextDay, goToAudit, restart };
}
