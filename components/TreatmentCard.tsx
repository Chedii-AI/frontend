import { cn } from "@/lib/utils";
import { Pill, CalendarClock, ShieldCheck, Heart } from "lucide-react";

interface TreatmentCardProps {
    treatment: string;
    followUp: string;
    preventiveMeasures?: string[];
    className?: string;
}

export default function TreatmentCard({
    treatment,
    followUp,
    preventiveMeasures,
    className,
}: TreatmentCardProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {/* Treatment Plan */}
            <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Pill className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold">Treatment Plan</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {treatment}
                </p>
            </div>

            {/* Follow-up */}
            <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                        <CalendarClock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="font-semibold">Follow-up</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {followUp}
                </p>
            </div>

            {/* Preventive Measures */}
            {preventiveMeasures && preventiveMeasures.length > 0 && (
                <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="font-semibold">Preventive Measures</h3>
                    </div>
                    <ul className="space-y-2">
                        {preventiveMeasures.map((measure, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Heart className="h-3.5 w-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
                                <span>{measure}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
