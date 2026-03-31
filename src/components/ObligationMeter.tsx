import { motion } from "framer-motion";

interface ObligationMeterProps {
  value: number;
}

export default function ObligationMeter({ value }: ObligationMeterProps) {
  const getColor = () => {
    if (value < 30) return "bg-genuine";
    if (value < 60) return "bg-streak";
    return "bg-obligation";
  };

  const getLabel = () => {
    if (value < 20) return "Free";
    if (value < 40) return "Relaxed";
    if (value < 60) return "Pressured";
    if (value < 80) return "Obligated";
    return "Trapped";
  };

  const getGlow = () => {
    if (value < 30) return "glow-genuine";
    if (value < 60) return "glow-streak";
    return "glow-obligation";
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center font-mono text-xs">
        <span className="text-muted-foreground tracking-widest uppercase">Obligation</span>
        <span className={value >= 60 ? "text-obligation" : value >= 30 ? "text-streak" : "text-genuine"}>
          {getLabel()} — {value}%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getColor()} ${getGlow()}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
