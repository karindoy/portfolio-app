"use client";

import { toast } from "sonner";

// Function to download PDF resume (calls API route)
export const downloadPDFResume = async () => {
  toast.info("Generating PDF resume from Markdown source...");

  try {
    // Call the API route to generate PDF from Markdown
    const response = await fetch('/api/generate-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ format: 'pdf', source: 'markdown' }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    // Get the PDF blob
    const blob = await response.blob();

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'suellen-karin-doy-resume-md.pdf';

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("PDF resume downloaded successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to generate PDF. Downloading LaTeX file instead.");
  }
};