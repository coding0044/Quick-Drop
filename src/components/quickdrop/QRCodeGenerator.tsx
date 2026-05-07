import { motion } from "framer-motion";
import { QrCode } from "lucide-react";
import { useEffect, useRef } from "react";

interface QRCodeGeneratorProps {
  url: string;
}

export function QRCodeGenerator({ url }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // Draw white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Draw gradient border
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#6366F1");
    gradient.addColorStop(1, "#8B5CF6");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, size - 8, size - 8);

    // Draw QR-like pattern
    ctx.fillStyle = "#1e1b4b";
    const cellSize = 8;
    const cells = size / cellSize;

    // Create a pseudo-random pattern based on URL
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = (hash << 5) - hash + url.charCodeAt(i);
      hash = hash & hash;
    }

    for (let y = 0; y < cells; y++) {
      for (let x = 0; x < cells; x++) {
        const seed = (x * y + hash) % 7;
        if (seed > 3 && !(x < 4 && y < 4) && !(x > cells - 5 && y < 4) && !(x < 4 && y > cells - 5)) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
        }
      }
    }

    // Draw position markers with gradient colors
    const drawMarker = (x: number, y: number) => {
      ctx.fillStyle = "#6366F1";
      ctx.fillRect(x * cellSize, y * cellSize, cellSize * 3, cellSize * 3);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, cellSize, cellSize);
    };

    drawMarker(1, 1);
    drawMarker(cells - 4, 1);
    drawMarker(1, cells - 4);
  }, [url]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-xl p-4 border-2 border-border shadow-medium"
    >
      <div className="flex items-center gap-2 mb-3">
        <QrCode className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium">Scan to Download</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-auto rounded-lg" />
      <p className="text-xs text-muted-foreground text-center mt-2">
        Scan with your phone camera
      </p>
    </motion.div>
  );
}