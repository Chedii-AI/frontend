"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { getReports } from "@/lib/api";
import { Report, SeverityLevel } from "@/types/report";
import Sidebar from "@/components/Sidebar";
import ReportCard from "@/components/ReportCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
    LayoutDashboard,
    Search,
    SlidersHorizontal,
    FileX2,
} from "lucide-react";

const severityOptions: (SeverityLevel | "All")[] = [
    "All",
    "Low",
    "Moderate",
    "Severe",
];

export default function DashboardPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [severityFilter, setSeverityFilter] = useState<SeverityLevel | "All">(
        "All"
    );

    useEffect(() => {
        async function fetchReports() {
            try {
                const data = await getReports();
                setReports(data);
            } catch (err) {
                console.error("Failed to fetch reports:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchReports();
    }, []);

    const filteredReports = useMemo(() => {
        return reports.filter((report) => {
            const matchesSearch =
                searchQuery === "" ||
                report.disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
                report.cropType?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesSeverity =
                severityFilter === "All" || report.severity === severityFilter;

            return matchesSearch && matchesSeverity;
        });
    }, [reports, searchQuery, severityFilter]);

    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            <Sidebar />

            <div className="flex-1 overflow-auto">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-1">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <LayoutDashboard className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Dashboard</h1>
                                <p className="text-sm text-muted-foreground">
                                    View and manage your crop analysis reports
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col sm:flex-row gap-3 mb-6"
                    >
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by disease or crop..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Severity Filter */}
                        <div className="relative">
                            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <select
                                value={severityFilter}
                                onChange={(e) =>
                                    setSeverityFilter(e.target.value as SeverityLevel | "All")
                                }
                                className="appearance-none rounded-xl border border-border bg-background pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all cursor-pointer"
                            >
                                {severityOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option === "All" ? "All Severity" : option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </motion.div>

                    {/* Content */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <LoadingSpinner text="Loading reports..." />
                        </div>
                    ) : filteredReports.length === 0 ? (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
                                <FileX2 className="h-7 w-7 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">No Reports Found</h3>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                {searchQuery || severityFilter !== "All"
                                    ? "No reports match your search criteria. Try adjusting your filters."
                                    : "You haven't analyzed any crops yet. Go to the Analyze page to get started."}
                            </p>
                        </motion.div>
                    ) : (
                        /* Report Grid */
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredReports.map((report, i) => (
                                <ReportCard key={report.id} report={report} index={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
