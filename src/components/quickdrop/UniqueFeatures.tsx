import { motion } from "framer-motion";
import { QrCode, Lock, Timer, Sparkles, TrendingUp, FileText } from "lucide-react";

export function UniqueFeatures() {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Text & File Sharing",
      description: "Share both files and text content. Perfect for code snippets, notes, and assignments.",
      gradient: "from-accent to-primary",
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code Sharing",
      description: "Generate instant QR codes for easy mobile sharing. Scan and go!",
      gradient: "from-primary to-accent",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Password Protection",
      description: "Add an extra layer of security with password-protected links.",
      gradient: "from-amber to-primary",
    },
    {
      icon: <Timer className="w-6 h-6" />,
      title: "Auto-Expiring Links",
      description: "Set custom expiration times from 5 minutes to 24 hours.",
      gradient: "from-cyan to-primary",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Custom URLs",
      description: "Create memorable, branded links that are easy to share.",
      gradient: "from-accent to-cyan",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-Time Analytics",
      description: "Track views and downloads with live link analytics.",
      gradient: "from-emerald to-cyan",
    },
  ];

  return (
    <div className="py-20 gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">What Makes Us Different</span>
          </div>
          <h2 className="mb-4 font-display">Unique Features You Won't Find Elsewhere</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            QuickDrop isn't just another file-sharing tool. We've packed it with innovative
            features designed specifically for modern students and creators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="h-full bg-card rounded-2xl p-6 shadow-medium hover:shadow-large transition-all border border-border hover:border-primary/30">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform shadow-soft`}
                >
                  {feature.icon}
                </div>

                <h3 className="mb-2 font-display">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>

                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            All features are{" "}
            <span className="gradient-text font-semibold">completely free</span>{" "}
            and require no registration!
          </p>
        </motion.div>
      </div>
    </div>
  );
}