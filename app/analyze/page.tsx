"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeImage } from "@/lib/api";
import { Report } from "@/types/report";
import UploadDropzone from "@/components/UploadDropzone";
import LoadingSpinner from "@/components/LoadingSpinner";
import SeverityBadge from "@/components/SeverityBadge";
import ConfidenceMeter from "@/components/ConfidenceMeter";
import TreatmentCard from "@/components/TreatmentCard";
import {
    Scan,
    AlertCircle,
    Microscope,
    RotateCcw,
    Bug,
} from "lucide-react";

export default function AnalyzePage() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<Report | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = useCallback((selectedFile: File) => {
        setFile(selectedFile);
        setResult(null);
        setError(null);
    }, []);

    const handleAnalyze = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const report = await analyzeImage(file);
            setResult(report);
        } catch {
            setError("Analysis failed. Please try again with a different image.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setResult(null);
        setError(null);
    };

    return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Microscope className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Crop Analysis</h1>
                        <p className="text-sm text-muted-foreground">
                            Upload an image to detect diseases and get treatment recommendations
                        </p>
                    </div>
                </div>
            </motion.div>

            <div className="space-y-6">
                {/* Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <UploadDropzone
                        onFileSelect={handleFileSelect}
                        disabled={isLoading}
                    />
                </motion.div>

                {/* Analyze / Reset buttons */}
                {file && !result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading}
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>Analyzing...</>
                            ) : (
                                <>
                                    <Scan className="h-5 w-5" />
                                    Analyze Image
                                </>
                            )}
                        </button>
                    </motion.div>
                )}

                {/* Loading State */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="rounded-2xl border border-border/50 bg-card p-8 sm:p-12"
                        >
                            <LoadingSpinner size="lg" text="AI is analyzing your crop image..." />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error State */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6"
                        >
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-destructive">Analysis Failed</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{error}</p>
                                    <button
                                        onClick={handleReset}
                                        className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:underline"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Section */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            {/* Disease Summary */}
                            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-5">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                                            <Bug className="h-6 w-6 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{result.disease}</h2>
                                            {result.cropType && (
                                                <p className="text-sm text-muted-foreground">
                                                    Detected on {result.cropType}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <SeverityBadge severity={result.severity} size="lg" />
                                </div>

                                <ConfidenceMeter confidence={result.confidence} size="md" />
                            </div>

                            {/* Treatment Info */}
                            <TreatmentCard
                                treatment={result.treatment}
                                followUp={result.follow_up}
                                preventiveMeasures={result.preventiveMeasures}
                            />

                            {/* New Analysis Button */}
                            <button
                                onClick={handleReset}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-6 py-3 text-base font-semibold hover:bg-muted transition-colors"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Analyze Another Image
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
