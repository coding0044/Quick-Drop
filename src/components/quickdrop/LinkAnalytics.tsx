import { motion } from "framer-motion";
import { Eye, Download, TrendingUp } from "lucide-react";

interface LinkAnalyticsProps {
  views: number;
  downloads: number;
}

export function LinkAnalytics({ views, downloads }: LinkAnalyticsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald/5 to-emerald/10 rounded-xl p-4 border border-emerald/30"
    >
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-emerald" />
        <span className="text-sm font-medium">Link Analytics</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-3 border border-emerald/20">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-emerald" />
            <span className="text-xs text-muted-foreground">Views</span>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-2xl font-bold text-emerald"
          >
            {views}
          </motion.div>
        </div>

        <div className="bg-card rounded-lg p-3 border border-emerald/20">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-4 h-4 text-emerald" />
            <span className="text-xs text-muted-foreground">Downloads</span>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="text-2xl font-bold text-emerald"
          >
            {downloads}
          </motion.div>
        </div>
      </div>

      <p className="text-xs text-emerald mt-3">
        Track who's viewing and downloading your file
      </p>
    </motion.div>
  );
}