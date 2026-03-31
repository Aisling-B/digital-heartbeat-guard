import IntroScreen from "@/components/IntroScreen";
import DayScreen from "@/components/DayScreen";
import AuditScreen from "@/components/AuditScreen";
import { useGameState } from "@/game/useGameState";
import { days } from "@/game/gameData";

const Index = () => {
  const { state, phase, startGame, makeChoice, nextDay, goToAudit, restart } = useGameState();

  if (phase === "intro") return <IntroScreen onStart={startGame} />;

  if (phase === "audit") return <AuditScreen gameState={state} onRestart={restart} />;

  const currentDayData = days[state.currentDay];

  return (
    <DayScreen
      key={state.currentDay}
      dayData={currentDayData}
      gameState={state}
      onChoice={(choice) => makeChoice(state.currentDay, choice)}
      onNext={state.currentDay >= 6 ? goToAudit : nextDay}
    />
  );
};

export default Index;
