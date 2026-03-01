export type SeverityLevel = "Low" | "Moderate" | "High" | "Severe";

export interface Report {
    id?: string;
    disease: string;
    confidence: number;
    severity: SeverityLevel;
    treatment: string;
    follow_up: string;
    severityGuide?: string;
    date?: string;
    imageUrl?: string;
    cropType?: string;
    preventiveMeasures?: string[];
    timeline?: TimelineEvent[];
}

export interface TimelineEvent {
    date: string;
    action: string;
    status: "completed" | "pending" | "upcoming";
}

export interface AnalysisResult {
    report: Report;
    isLoading: boolean;
    error: string | null;
}
