import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Zap } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Fast & Secure File Sharing</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 font-display"
            >
              Share Instantly.
              <br />
              <span className="gradient-text">Stay Anonymous.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8 max-w-lg"
            >
              QuickDrop makes file and text sharing effortless. Upload assignments, notes, code snippets, and files,
              then share them with friends securely and privately in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="gradient-primary shadow-primary hover:opacity-90 transition-opacity"
                onClick={onGetStarted}
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload File
              </Button>
              <Button size="lg" variant="outline" className="border-2">
                Learn More
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              <StatItem value="10K+" label="Files Shared" />
              <StatItem value="5K+" label="Happy Users" />
              <StatItem value="100%" label="Secure" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block h-[500px]"
          >
            <FloatingCard delay={0} top={20} right={40} />
            <FloatingCard delay={0.5} top={120} right={120} />
            <FloatingCard delay={1} top={220} right={20} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-display font-bold gradient-text">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function FloatingCard({ delay, top, right }: { delay: number; top: number; right: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute w-64 h-48 rounded-2xl glass border border-border shadow-large"
      style={{ top: `${top}px`, right: `${right}px` }}
    >
      <div className="p-6">
        <div className="w-12 h-12 rounded-xl gradient-primary mb-4 shadow-primary" />
        <div className="h-3 bg-muted rounded mb-2 w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </motion.div>
  );
}