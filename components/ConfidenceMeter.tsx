"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface ConfidenceMeterProps {
    confidence: number; // 0 to 1
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
    className?: string;
}

export default function ConfidenceMeter({
    confidence,
    size = "md",
    showLabel = true,
    className,
}: ConfidenceMeterProps) {
    const val = confidence <= 1 ? confidence * 100 : confidence;
    const percentage = Number(val.toFixed(2));
    const displayPercentage = val.toFixed(2);

    const getColor = () => {
        if (percentage >= 85) return "from-emerald-500 to-emerald-400";
        if (percentage >= 70) return "from-amber-500 to-amber-400";
        return "from-red-500 to-red-400";
    };

    const getTrackColor = () => {
        if (percentage >= 85) return "bg-emerald-500/10";
        if (percentage >= 70) return "bg-amber-500/10";
        return "bg-red-500/10";
    };

    const heights = {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
    };

    return (
        <div className={cn("w-full", className)}>
            {showLabel && (
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                            Confidence
                        </span>
                    </div>
                    <span className="text-sm font-bold tabular-nums">{displayPercentage}%</span>
                </div>
            )}
            <div
                className={cn(
                    "w-full rounded-full overflow-hidden",
                    getTrackColor(),
                    heights[size]
                )}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className={cn(
                        "h-full rounded-full bg-gradient-to-r",
                        getColor()
                    )}
                />
            </div>
        </div>
    );
}
