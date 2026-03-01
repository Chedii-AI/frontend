import { Report } from "@/types/report";
import { mockReports } from "./mockData";

const API_DELAY = 2000;


/**
 * Simulate API call delay
 */
function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Analyze a crop image and return disease detection results.
 * Currently uses mock data; will connect to Azure endpoint later.
 *
 * @param file - The image file to analyze
 * @returns A report with disease detection results
 */
export async function analyzeImage(file: File): Promise<Report> {
    // TODO: Replace with Azure API call
    // const formData = new FormData();
    // formData.append("image", file);
    // const response = await fetch(`${API_BASE_URL}/analyze`, {
    //   method: "POST",
    //   body: formData,
    // });
    // return response.json();

    await delay(API_DELAY);

    // Randomly select a mock report and give it a new ID
    const randomIndex = Math.floor(Math.random() * mockReports.length);
    const baseReport = mockReports[randomIndex];

    return {
        ...baseReport,
        id: `rpt-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        imageUrl: URL.createObjectURL(file),
    };
}

/**
 * Fetch all reports for the dashboard.
 * Currently returns mock data; will connect to Azure endpoint later.
 *
 * @returns Array of all reports
 */
export async function getReports(): Promise<Report[]> {
    // TODO: Replace with Azure API call
    // const response = await fetch(`${API_BASE_URL}/reports`);
    // return response.json();

    await delay(800);
    return mockReports;
}

/**
 * Fetch a single report by ID.
 * Currently returns mock data; will connect to Azure endpoint later.
 *
 * @param id - The report ID to fetch
 * @returns The report if found, null otherwise
 */
export async function getReportById(id: string): Promise<Report | null> {
    // TODO: Replace with Azure API call
    // const response = await fetch(`${API_BASE_URL}/reports/${id}`);
    // if (!response.ok) return null;
    // return response.json();

    await delay(600);
    return mockReports.find((r) => r.id === id) || null;
}
