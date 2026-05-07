import { motion } from "framer-motion";
import { Upload, Share2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-card/70 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onTabChange("landing")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-primary">
              <Share2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold gradient-text">
              QuickDrop
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            <NavButton
              label="Home"
              active={activeTab === "landing"}
              onClick={() => onTabChange("landing")}
            />
            <NavButton
              label="Upload"
              active={activeTab === "upload"}
              onClick={() => onTabChange("upload")}
              icon={<Upload className="w-4 h-4" />}
            />
            <NavButton
              label="About"
              active={activeTab === "about"}
              onClick={() => onTabChange("about")}
              icon={<Info className="w-4 h-4" />}
            />
          </div>

          <div className="flex md:hidden gap-2">
            <Button
              variant={activeTab === "landing" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange("landing")}
              className={activeTab === "landing" ? "gradient-primary" : ""}
            >
              Home
            </Button>
            <Button
              variant={activeTab === "upload" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange("upload")}
              className={activeTab === "upload" ? "gradient-primary" : ""}
            >
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavButton({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium ${
        active
          ? "gradient-primary text-primary-foreground shadow-primary"
          : "text-foreground hover:bg-muted"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      {label}
    </motion.button>
  );
}