import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ExpirationTimerProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

export function ExpirationTimer({ duration, onDurationChange }: ExpirationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const percentage = (timeLeft / (duration * 60)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-cyan/5 to-cyan/10 rounded-xl p-4 border border-cyan/30"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-cyan" />
          <span className="text-sm font-medium">Link Expiration</span>
        </div>
        <Select value={duration.toString()} onValueChange={(v) => onDurationChange(Number(v))}>
          <SelectTrigger className="w-24 h-8 text-sm bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 min</SelectItem>
            <SelectItem value="15">15 min</SelectItem>
            <SelectItem value="30">30 min</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="1440">24 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Time remaining:</span>
          <span className="text-cyan font-mono font-medium">{formatTime(timeLeft)}</span>
        </div>

        <div className="h-2 bg-cyan/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan to-primary"
            initial={{ width: "100%" }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1 }}
          />
        </div>

        <p className="text-xs text-cyan">
          Link will automatically expire after {duration} {duration === 1 ? "minute" : "minutes"}
        </p>
      </div>
    </motion.div>
  );
}