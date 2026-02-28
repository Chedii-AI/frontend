"use client";

import Link from "next/link";
import { Report } from "@/types/report";
import SeverityBadge from "./SeverityBadge";
import ConfidenceMeter from "./ConfidenceMeter";
import { Calendar, ArrowRight, Sprout } from "lucide-react";
import { motion } from "framer-motion";

interface ReportCardProps {
    report: Report;
    index?: number;
}

export default function ReportCard({ report, index = 0 }: ReportCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link href={`/reports/${report.id}`}>
                <div className="group relative rounded-2xl border border-border/50 bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer">
                    {/* Decorative gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                                    <Sprout className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {report.disease}
                                    </h3>
                                    {report.cropType && (
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {report.cropType}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <SeverityBadge severity={report.severity} size="sm" />
                        </div>

                        {/* Confidence */}
                        <ConfidenceMeter confidence={report.confidence} size="sm" />

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{new Date(report.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                View Report
                                <ArrowRight className="h-3 w-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
