import { NextRequest } from 'next/server';
import { PDFDocument, StandardFonts, rgb, PDFFont } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { format, source } = await request.json();

    const markdownPath = path.join(process.cwd(), 'public', 'resume.md');

    if (format === 'markdown') {
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

      const pdfDoc = await PDFDocument.create();
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      let page = pdfDoc.addPage([600, 800]);
      let yPosition = 750;
      const lineHeight = 15;

      for (const element of parseMarkdown(content)) {
        const { text, type } = element;

        if (yPosition < 60) {
          page = pdfDoc.addPage([600, 800]);
          yPosition = 750;
        }

        const fontSize = getFontSizeForType(type);
        const font = getFontForType(type, fontRegular, fontBold);
        const maxWidth = 500;

        const rawLines = text.split('\n');

        for (const rawLine of rawLines) {
          if (!rawLine.trim()) continue;

          const wrapped = wrapText(rawLine, font, fontSize, maxWidth);

          for (const w of wrapped) {
            if (yPosition < 60) {
              page = pdfDoc.addPage([600, 800]);
              yPosition = 750;
            }

            page.drawText(w, {
              x: getIndentForType(type),
              y: yPosition,
              size: fontSize,
              font,
              color: rgb(0, 0, 0),
            });

            yPosition -= lineHeight;
          }
        }

        if (['header1', 'header2'].includes(type)) {
          yPosition -= 10;
        }
      }

      const pdfBytes = await pdfDoc.save();

      return new Response(pdfBytes, {
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
  } catch (error) {
    console.error('Error generating resume:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate resume' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/* ------------------------- Helpers ------------------------- */

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(test, fontSize) > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function getFontSizeForType(type: string): number {
  return {
    header1: 16,
    header2: 14,
    header3: 12,
    header4: 11,
    header5: 11,
    header6: 11,
  }[type] ?? 11;
}

function getFontForType(type: string, regular: PDFFont, bold: PDFFont): PDFFont {
  return ['header1', 'header2', 'header3', 'header4', 'header5', 'header6'].includes(type)
    ? bold
    : regular;
}

function parseMarkdown(content: string) {
  const elements: { text: string; type: string }[] = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('# ')) elements.push({ text: line.slice(2), type: 'header1' });
    else if (line.startsWith('## ')) elements.push({ text: line.slice(3), type: 'header2' });
    else if (line.startsWith('### ')) elements.push({ text: line.slice(4), type: 'header3' });
    else if (line.startsWith('#### ')) elements.push({ text: line.slice(5), type: 'header4' });
    else if (line.startsWith('##### ')) elements.push({ text: line.slice(6), type: 'header5' });
    else if (line.startsWith('###### ')) elements.push({ text: line.slice(7), type: 'header6' });

    else if (/^\s*[-*+]\s/.test(line)) {
      const list = [];
      while (i < lines.length && /^\s*[-*+]\s/.test(lines[i])) {
        list.push(lines[i].replace(/^\s*[-*+]\s/, '• '));
        i++;
      }
      i--;
      elements.push({ text: list.join('\n'), type: 'list_item' });
    }

    else {
      elements.push({ text: line.trim(), type: 'paragraph' });
    }

    i++;
  }

  for (const e of elements) {
    e.text = cleanMarkdown(e.text);
  }

  return elements;
}

function cleanMarkdown(text: string) {
  const map: Record<string, string> = {
    ç: 'c', ã: 'a', õ: 'o', á: 'a', à: 'a', â: 'a', é: 'e', ê: 'e', í: 'i',
    ó: 'o', ô: 'o', ú: 'u', ü: 'u', ñ: 'n',
    Ç: 'C', Ã: 'A', Õ: 'O', Á: 'A', À: 'A', Â: 'A',
    É: 'E', Ê: 'E', Í: 'I', Ó: 'O', Ô: 'O', Ú: 'U', Ü: 'U', Ñ: 'N',
  };

  return text
    .replace(/→/g, '->')
    .replace(/_/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[^\x00-\x7F]/g, m => map[m] ?? '');
}

function getIndentForType(type: string): number {
  return {
    header1: 50,
    header2: 50,
    header3: 55,
    header4: 60,
    header5: 60,
    header6: 60,
    list_item: 70,
  }[type] ?? 50;
}
