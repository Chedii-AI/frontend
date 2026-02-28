"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getReportById } from "@/lib/api";
import { Report } from "@/types/report";
import SeverityBadge from "@/components/SeverityBadge";
import ConfidenceMeter from "@/components/ConfidenceMeter";
import TreatmentCard from "@/components/TreatmentCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
    ArrowLeft,
    Download,
    Calendar,
    Bug,
    Sprout,
    Clock,
    CheckCircle2,
    Circle,
    Timer,
} from "lucide-react";

export default function ReportDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [report, setReport] = useState<Report | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchReport() {
            try {
                const id = params.id as string;
                const data = await getReportById(id);
                if (!data) {
                    setError(true);
                } else {
                    setReport(data);
                }
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchReport();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <LoadingSpinner text="Loading report..." />
            </div>
        );
    }

    if (error || !report) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
                    <Bug className="h-7 w-7 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold mb-2">Report Not Found</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                    The report you&apos;re looking for doesn&apos;t exist or has been removed.
                </p>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const statusIcons = {
        completed: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
        pending: <Timer className="h-4 w-4 text-amber-500" />,
        upcoming: <Circle className="h-4 w-4 text-muted-foreground" />,
    };

    return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </motion.button>

            <div className="space-y-6">
                {/* Report Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden"
                >
                    {/* Image placeholder */}
                    <div className="relative h-40 sm:h-48 md:h-64 bg-gradient-to-br from-forest-100 to-sage-100 dark:from-forest-950/50 dark:to-sage-950/50">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <Sprout className="h-12 w-12 text-primary/30 mx-auto mb-2" />
                                <p className="text-xs text-muted-foreground">Crop Image</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-5">
                        {/* Title Row */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                                    <Bug className="h-6 w-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{report.disease}</h1>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                                        {report.cropType && (
                                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                                <Sprout className="h-3.5 w-3.5" />
                                                {report.cropType}
                                            </span>
                                        )}
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(report.date).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <SeverityBadge severity={report.severity} size="lg" />
                        </div>

                        {/* Confidence */}
                        <ConfidenceMeter confidence={report.confidence} size="md" />

                        {/* Download PDF Button (UI only) */}
                        <button className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
                            <Download className="h-4 w-4" />
                            Download PDF Report
                        </button>
                    </div>
                </motion.div>

                {/* Treatment Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <TreatmentCard
                        treatment={report.treatment}
                        followUp={report.follow_up}
                        preventiveMeasures={report.preventiveMeasures}
                    />
                </motion.div>

                {/* Timeline */}
                {report.timeline && report.timeline.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-semibold">Action Timeline</h3>
                        </div>

                        <div className="space-y-0">
                            {report.timeline.map((event, i) => (
                                <div key={i} className="flex gap-4">
                                    {/* Vertical line + icon */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-8 w-8 items-center justify-center">
                                            {statusIcons[event.status]}
                                        </div>
                                        {i < report.timeline!.length - 1 && (
                                            <div className="w-px flex-1 bg-border" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="pb-6">
                                        <p className="text-sm font-medium">{event.action}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {new Date(event.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                            {" · "}
                                            <span className="capitalize">{event.status}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
