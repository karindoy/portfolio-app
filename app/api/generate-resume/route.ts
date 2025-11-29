import { NextRequest } from 'next/server';
import { PDFDocument, StandardFonts, rgb, PDFFont } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { format, source } = await request.json();
    const markdownPath = path.join(process.cwd(), 'public', 'resume.md');

    // Return raw markdown if requested
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

    // Generate PDF from markdown
    if (format === 'pdf' && source === 'markdown') {
      const content = await fs.readFile(markdownPath, 'utf-8');

      const pdfDoc = await PDFDocument.create();

      // Built-in Helvetica fonts (no fontkit)
      const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Page setup
      const pageWidth = 600;
      const pageHeight = 800;
      const marginLeft = 50;
      const marginRight = 50;
      const usableWidth = pageWidth - marginLeft - marginRight;

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - 50; // top margin
      const lineGap = 4; // extra space between lines

      // Parse markdown to structured elements
      const elements = parseMarkdown(content);

      for (const el of elements) {
        const fontSize = getFontSizeForType(el.type);
        const font = getFontForType(el.type, helvetica, helveticaBold);
        const lineHeight = Math.ceil(fontSize + lineGap);

        // If element is multi-line (list_item joined with \n), split and handle bullets
        const rawLines = el.text.split('\n');

        for (const rawLine of rawLines) {
          if (!rawLine || rawLine.trim() === '') {
            y -= lineHeight; // paragraph gap
            if (y < 60) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              y = pageHeight - 50;
            }
            continue;
          }

          // Detect bullet (we converted bullets to '* ' in parser)
          const isBullet = rawLine.trim().startsWith('* ');
          const baseText = isBullet ? rawLine.trim().substring(2) : rawLine.trim();

          // For wrapping we must consider reduced width when there's an indent
          const baseIndent = getIndentForType(el.type); // base left offset
          const bulletIndentExtra = isBullet ? 12 : 0; // space reserved for bullet
          const textX = marginLeft + baseIndent + bulletIndentExtra;
          const availableWidth = usableWidth - baseIndent - bulletIndentExtra;

          // Wrap the text into lines that fit availableWidth
          const wrappedLines = wrapText(baseText, font, fontSize, availableWidth);

          // Draw wrapped lines: first line includes bullet as drawn circle,
          // subsequent lines are drawn shifted to align with text (no bullet)
          for (let i = 0; i < wrappedLines.length; i++) {
            if (y < 60) { // bottom margin -> new page
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              y = pageHeight - 50;
            }

            if (isBullet && i === 0) {
              // draw small filled circle (bullet) left of the text
              const bulletX = marginLeft + baseIndent + 4; // position slightly right of margin
              const bulletY = y + fontSize / 2 - 1; // center bullet vertically relative to text
              const rx = 2; // radius x
              const ry = 2; // radius y
              page.drawEllipse({ x: bulletX, y: bulletY, xScale: rx, yScale: ry, color: rgb(0, 0, 0) });
            }

            // draw text (without any '*' marker)
            page.drawText(wrappedLines[i], {
              x: textX,
              y,
              size: fontSize,
              font,
              color: rgb(0, 0, 0),
              lineHeight,
            });

            y -= lineHeight;
          }
        }

        // Add extra spacing after headers
        if (el.type === 'header1') y -= 8;
        if (el.type === 'header2') y -= 6;

        // If near bottom, add a page
        if (y < 80) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - 50;
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
  } catch (err) {
    console.error('Error generating resume:', err);
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
  let current = '';

  for (const w of words) {
    const test = current ? `${current} ${w}` : w;
    const width = font.widthOfTextAtSize(test, fontSize);
    if (width <= maxWidth) {
      current = test;
    } else {
      if (current) lines.push(current);
      // if single word wider than maxWidth, force-break word (rare)
      if (font.widthOfTextAtSize(w, fontSize) > maxWidth) {
        // break word into characters
        let buf = '';
        for (const ch of w) {
          const t = buf + ch;
          if (font.widthOfTextAtSize(t, fontSize) <= maxWidth) {
            buf = t;
          } else {
            if (buf) lines.push(buf);
            buf = ch;
          }
        }
        if (buf) current = buf;
        else current = '';
      } else {
        current = w;
      }
    }
  }
  if (current) lines.push(current);
  return lines;
}

function getFontSizeForType(type: string): number {
  switch (type) {
    case 'header1': return 18;
    case 'header2': return 15;
    case 'header3': return 13;
    case 'list_item': return 11;
    default: return 11;
  }
}

function getFontForType(type: string, regular: PDFFont, bold: PDFFont): PDFFont {
  const headers = ['header1', 'header2', 'header3', 'header4', 'header5', 'header6'];
  return headers.includes(type) ? bold : regular;
}

function parseMarkdown(content: string) {
  const elements: { text: string; type: string }[] = [];
  const lines = content.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];

    if (raw.startsWith('# ')) {
      elements.push({ text: raw.slice(2).trim(), type: 'header1' });
      i++; continue;
    } else if (raw.startsWith('## ')) {
      elements.push({ text: raw.slice(3).trim(), type: 'header2' });
      i++; continue;
    } else if (raw.startsWith('### ')) {
      elements.push({ text: raw.slice(4).trim(), type: 'header3' });
      i++; continue;
    } else if (raw.startsWith('#### ')) {
      elements.push({ text: raw.slice(5).trim(), type: 'header4' });
      i++; continue;
    } else if (/^\s*[-*+]\s/.test(raw)) {
      // collect contiguous list items
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*+]\s/.test(lines[i])) {
        // convert markdown bullets to ASCII star '*' which we'll render as drawn bullets
        const cleaned = lines[i].replace(/^\s*[-*+]\s/, '* ').trimEnd();
        items.push(cleaned);
        i++;
      }
      elements.push({ text: items.join('\n'), type: 'list_item' });
      continue;
    } else {
      // paragraph (may be empty)
      elements.push({ text: raw.trim(), type: 'paragraph' });
      i++; continue;
    }
  }

  // Clean markdown inline markers but keep ASCII bullets and basic punctuation.
  for (const e of elements) {
    e.text = cleanMarkdown(e.text);
  }

  return elements;
}

function cleanMarkdown(text: string) {
  const map: Record<string, string> = {
    'ç': 'c','ã':'a','õ':'o','á':'a','à':'a','â':'a','é':'e','ê':'e','í':'i',
    'ó':'o','ô':'o','ú':'u','ü':'u','ñ':'n',
    'Ç':'C','Ã':'A','Õ':'O','Á':'A','À':'A','Â':'A',
    'É':'E','Ê':'E','Í':'I','Ó':'O','Ô':'O','Ú':'U','Ü':'U','Ñ':'N'
  };

  let out = text
    .replace(/→/g, '->')
    .replace(/_/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[\x00-\x1F]/g, '');

  out = out.replace(/[^]/g, ch => map[ch] ?? ch);

  return out;
}

function getIndentForType(type: string): number {
  switch (type) {
    case 'header1': return 0;
    case 'header2': return 0;
    case 'list_item': return 0;
    default: return 0;
  }
}
