import { cn } from "@/lib/utils";
import { SeverityLevel } from "@/types/report";
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

interface SeverityBadgeProps {
    severity: SeverityLevel;
    size?: "sm" | "md" | "lg";
    showIcon?: boolean;
    className?: string;
}

const severityConfig: Record<
    SeverityLevel,
    { bg: string; text: string; border: string; icon: React.ElementType }
> = {
    Low: {
        bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
        text: "text-emerald-700 dark:text-emerald-400",
        border: "border-emerald-500/20",
        icon: CheckCircle,
    },
    Moderate: {
        bg: "bg-amber-500/10 dark:bg-amber-500/15",
        text: "text-amber-700 dark:text-amber-400",
        border: "border-amber-500/20",
        icon: AlertCircle,
    },
    Severe: {
        bg: "bg-red-500/10 dark:bg-red-500/15",
        text: "text-red-700 dark:text-red-400",
        border: "border-red-500/20",
        icon: AlertTriangle,
    },
};

const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
    lg: "text-base px-3 py-1.5 gap-2",
};

const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
};

export default function SeverityBadge({
    severity,
    size = "md",
    showIcon = true,
    className,
}: SeverityBadgeProps) {
    const config = severityConfig[severity];
    const Icon = config.icon;

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border font-semibold",
                config.bg,
                config.text,
                config.border,
                sizeClasses[size],
                className
            )}
        >
            {showIcon && <Icon className={iconSizes[size]} />}
            {severity}
        </span>
    );
}
