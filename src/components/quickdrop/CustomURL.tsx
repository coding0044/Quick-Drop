import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface CustomURLProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  customSlug: string;
  onSlugChange: (slug: string) => void;
}

export function CustomURL({
  enabled,
  onToggle,
  customSlug,
  onSlugChange,
}: CustomURLProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-4 border border-accent/30"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-accent" />
          <span className="text-sm font-medium">Custom URL</span>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </div>

      {enabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">quickdrop.app/</span>
            <Input
              type="text"
              placeholder="my-custom-link"
              value={customSlug}
              onChange={(e) => onSlugChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              className="flex-1 bg-card"
            />
          </div>
          <p className="text-xs text-accent">
            Create a memorable, easy-to-share link
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}