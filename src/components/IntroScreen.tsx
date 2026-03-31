import { motion } from "framer-motion";

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        className="max-w-lg text-center space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-7xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🔥
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            The 120-Day Heartbeat
          </h1>
          <p className="text-muted-foreground font-mono text-sm tracking-wide">
            A 7-day interactive research simulation
          </p>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-foreground/80 text-left bg-card p-6 rounded-2xl border border-border">
          <p>
            You and <span className="text-primary font-semibold">Alex</span> have been best friends since primary school.
            Four months ago, you started a Snapstreak.
          </p>
          <p>
            That little <span className="text-streak">🔥 120</span> has become more than a number.
            It's a digital promise that you'll check in every single day.
          </p>
          <p>
            But lately, the check-ins have become a <span className="text-obligation font-medium">Behavioral Chore</span>.
            Instead of life updates, you send photos of your shoes or the ceiling.
          </p>
          <p className="font-mono text-xs text-muted-foreground pt-2 border-t border-border">
            Your mission: survive 7 days while monitoring your Obligation Meter.
            Are you maintaining a friendship—or just enforcing rules?
          </p>
        </div>

        <motion.button
          onClick={onStart}
          className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base glow-streak hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Begin the Experiment
        </motion.button>
      </motion.div>
    </div>
  );
}
