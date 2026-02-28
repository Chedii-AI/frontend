"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, ImageIcon, X } from "lucide-react";

interface UploadDropzoneProps {
    onFileSelect: (file: File) => void;
    disabled?: boolean;
    className?: string;
}

export default function UploadDropzone({
    onFileSelect,
    disabled = false,
    className,
}: UploadDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleFile = useCallback(
        (file: File) => {
            if (!file.type.startsWith("image/")) return;
            setFileName(file.name);
            const url = URL.createObjectURL(file);
            setPreview(url);
            onFileSelect(file);
        },
        [onFileSelect]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            if (disabled) return;
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [disabled, handleFile]
    );

    const handleDragOver = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
        },
        [disabled]
    );

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const clearPreview = useCallback(() => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setFileName("");
    }, [preview]);

    return (
        <div className={cn("w-full", className)}>
            {preview ? (
                /* Image Preview */
                <div className="relative rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
                    <div className="relative aspect-video w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt="Crop preview"
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {/* Remove button */}
                        <button
                            onClick={clearPreview}
                            disabled={disabled}
                            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors disabled:opacity-50"
                            aria-label="Remove image"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        {/* File info */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white">
                                <ImageIcon className="h-3.5 w-3.5" />
                                {fileName}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Dropzone */
                <label
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={cn(
                        "flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-6 sm:p-12 cursor-pointer transition-all duration-200",
                        isDragging
                            ? "border-primary bg-primary/5 scale-[1.02]"
                            : "border-border hover:border-primary/50 hover:bg-muted/50",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <div
                        className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl transition-colors",
                            isDragging ? "bg-primary/10" : "bg-muted"
                        )}
                    >
                        <Upload
                            className={cn(
                                "h-6 w-6 transition-colors",
                                isDragging ? "text-primary" : "text-muted-foreground"
                            )}
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium">
                            {isDragging ? (
                                <span className="text-primary">Drop your image here</span>
                            ) : (
                                <>
                                    <span className="text-primary">Click to upload</span>
                                    {" or drag and drop"}
                                </>
                            )}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG or WEBP (max 10MB)
                        </p>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        disabled={disabled}
                        className="hidden"
                    />
                </label>
            )}
        </div>
    );
}
