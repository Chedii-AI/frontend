"use client";

import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    className?: string;
}

export default function LoadingSpinner({
    size = "md",
    text = "Analyzing...",
    className,
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "h-8 w-8",
        md: "h-12 w-12",
        lg: "h-16 w-16",
    };

    const iconSizes = {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
    };

    return (
        <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
            <div className="relative">
                {/* Outer ring */}
                <div
                    className={cn(
                        "rounded-full border-2 border-primary/20 border-t-primary animate-spin",
                        sizeClasses[size]
                    )}
                />
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className={cn("text-primary animate-pulse", iconSizes[size])} />
                </div>
            </div>
            {text && (
                <p className="text-sm text-muted-foreground animate-pulse font-medium">{text}</p>
            )}
        </div>
    );
}
