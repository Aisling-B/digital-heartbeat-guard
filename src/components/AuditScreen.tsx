import { motion } from "framer-motion";
import { GameState } from "@/game/gameData";

interface AuditScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

export default function AuditScreen({ gameState, onRestart }: AuditScreenProps) {
  const totalChoices = Object.keys(gameState.choices).length;
  const genuinePercent = totalChoices > 0 ? Math.round((gameState.genuineConnections / totalChoices) * 100) : 0;
  const maintenancePercent = 100 - genuinePercent;

  // Simulated monthly visits based on behavior
  const monthlyVisits = 841;
  const connectionVisits = Math.round(monthlyVisits * (genuinePercent / 100));
  const obligationVisits = monthlyVisits - connectionVisits;

  const getVerdict = () => {
    if (genuinePercent >= 70) return {
      title: "The Conscious Connector",
      description: "You chose connection over compliance. The streak was never your priority—Alex was. You understand that presence isn't measured in daily logins.",
      color: "text-genuine",
    };
    if (genuinePercent >= 40) return {
      title: "The Conflicted Keeper",
      description: "You oscillated between genuine care and digital obligation. The streak had a hold on you, but you fought back. The tension you felt? That's the design working as intended.",
      color: "text-streak",
    };
    return {
      title: "The Streak Enforcer",
      description: "The number owned you. Every choice prioritized the counter over the connection. You weren't maintaining a friendship—you were servicing an algorithm's retention metric.",
      color: "text-obligation",
    };
  };

  const verdict = getVerdict();

  const stats = [
    { label: "Genuine Connections", value: gameState.genuineConnections, total: totalChoices, color: "text-genuine" },
    { label: "Maintenance Snaps", value: gameState.maintenanceSnaps, total: totalChoices, color: "text-obligation" },
    { label: "Final Obligation Level", value: `${gameState.obligationMeter}%`, color: gameState.obligationMeter > 60 ? "text-obligation" : "text-genuine" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-lg space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center space-y-2">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Social Health Audit</p>
          <h1 className="text-2xl sm:text-3xl font-bold">{verdict.title}</h1>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <p className={`text-sm leading-relaxed ${verdict.color}`}>
            {verdict.description}
          </p>

          <div className="border-t border-border pt-4 space-y-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex justify-between items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className={`font-mono font-semibold ${stat.color}`}>
                  {typeof stat.value === "number" && stat.total
                    ? `${stat.value}/${stat.total}`
                    : stat.value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Monthly projection */}
          <motion.div
            className="border-t border-border pt-4 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              Monthly Projection (841 visits)
            </p>
            <div className="flex gap-2 h-8 rounded-lg overflow-hidden">
              <motion.div
                className="bg-genuine rounded-l-lg flex items-center justify-center text-xs font-mono font-bold text-primary-foreground"
                initial={{ width: 0 }}
                animate={{ width: `${genuinePercent}%` }}
                transition={{ duration: 1, delay: 1 }}
              >
                {genuinePercent > 15 && `${connectionVisits}`}
              </motion.div>
              <motion.div
                className="bg-obligation rounded-r-lg flex items-center justify-center text-xs font-mono font-bold text-accent-foreground"
                initial={{ width: 0 }}
                animate={{ width: `${maintenancePercent}%` }}
                transition={{ duration: 1, delay: 1 }}
              >
                {maintenancePercent > 15 && `${obligationVisits}`}
              </motion.div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>🤝 Connection</span>
              <span>⚙️ Obligation</span>
            </div>
          </motion.div>

          {/* Key decisions */}
          <motion.div
            className="border-t border-border pt-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Key Decisions</p>
            {gameState.surrogateAccepted && (
              <p className="text-sm text-obligation">
                ⚠️ You let a stranger impersonate your best friend to protect a number.
              </p>
            )}
            {gameState.streakRestored && (
              <p className="text-sm text-obligation">
                💳 You paid real money to restore a metric of artificial connection.
              </p>
            )}
            {!gameState.streakAlive && (
              <p className="text-sm text-genuine">
                🕊️ You chose to let the streak die. The friendship didn't need a scoreboard.
              </p>
            )}
            {!gameState.surrogateAccepted && gameState.choices[4] && (
              <p className="text-sm text-genuine">
                ✊ You refused the surrogate. Identity matters more than numbers.
              </p>
            )}
          </motion.div>
        </div>

        <motion.div
          className="bg-card border border-border rounded-2xl p-6 text-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-sm text-foreground/80 italic">
            "The streak was designed to measure your commitment to an app—not to each other.
            Every ⏳ was a nudge. Every 🔥 was a reward loop.
            The question was never 'Will you lose the streak?'
            It was 'Will you lose yourself?'"
          </p>
        </motion.div>

        <motion.button
          onClick={onRestart}
          className="w-full py-3 rounded-xl border border-border bg-secondary text-foreground font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Start Over
        </motion.button>
      </motion.div>
    </div>
  );
}
