import { NextRequest } from 'next/server';
import { ResumeService } from '@/services/resume.service';
import { GenerateResumeRequest } from '@/types/resume.types';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { format, source }: GenerateResumeRequest = await request.json();
    const markdownPath = path.join(process.cwd(), 'public', 'resume.md');
    const resumeService = new ResumeService();

    if (format === 'markdown' && source === 'markdown') {
      const markdownContent = await fs.readFile(markdownPath, 'utf-8');
      return new Response(markdownContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': 'attachment; filename="suellen-karin-doy-resume.md"',
        },
      });
    }

    if (format === 'pdf' && source === 'markdown') {
      const content = await fs.readFile(markdownPath, 'utf-8');
      const pdfBuffer = await resumeService.generatePdfFromMarkdown(content);
      const uint8Array = new Uint8Array(pdfBuffer);
      const pdfBlob = new Blob([uint8Array], { type: 'application/pdf' });

      return new Response(pdfBlob, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="suellen-karin-doy-resume-md.pdf"',
        },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error generating resume:', err);
    return new Response(JSON.stringify({ error: 'Failed to generate resume' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}