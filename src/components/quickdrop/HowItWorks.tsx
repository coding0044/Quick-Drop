import { motion } from "framer-motion";
import { Upload, Link2, Download } from "lucide-react";

export function HowItWorks() {
  return (
    <div className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 font-display">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your files or text in three simple steps. No registration required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            step={1}
            icon={<Upload className="w-8 h-8" />}
            title="Upload File or Text"
            description="Drag and drop your file or paste your text. We support all file types and any text content."
            delay={0}
          />
          <StepCard
            step={2}
            icon={<Link2 className="w-8 h-8" />}
            title="Get Your Link"
            description="Instantly receive a secure, shareable link. Copy it with one click."
            delay={0.2}
          />
          <StepCard
            step={3}
            icon={<Download className="w-8 h-8" />}
            title="Share & Download"
            description="Send the link to anyone. They can download the file instantly, no login needed."
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
}

interface StepCardProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function StepCard({ step, icon, title, description, delay }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <div className="bg-muted/50 rounded-2xl p-8 h-full border border-border hover:border-primary/30 transition-colors">
        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold shadow-primary">
          {step}
        </div>

        <div className="w-16 h-16 rounded-2xl bg-card shadow-medium flex items-center justify-center text-primary mb-6 mt-4">
          {icon}
        </div>

        <h3 className="mb-3 font-display">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
}