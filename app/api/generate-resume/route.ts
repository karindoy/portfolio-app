import { NextRequest } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { format, source } = body;

    if (format === 'pdf') {
      if (source === 'markdown') {
        // Read the markdown file content
        const markdownPath = path.join(process.cwd(), 'public', 'resume.md');
        const content = await fs.readFile(markdownPath, 'utf-8');

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();

        // Embed fonts for different text styles
        const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // Add a page
        let page = pdfDoc.addPage([600, 800]); // [width, height] in points

        let yPosition = 750;
        const lineHeight = 15;

        for (const element of parseMarkdown(content)) {
          // If we reach the bottom of the page, add a new page
          if (yPosition < 50) {
            page = pdfDoc.addPage([600, 800]);
            yPosition = 750;
          }

          const { text, type } = element;
          const lines = text.split('\n');

          for (const line of lines) {
            if (line.trim() === '') continue;

            // Break long lines into multiple lines
            const wrappedLines = wrapText(line.trim(), getFontForType(type, regularFont, boldFont), getFontSizeForType(type), 500); // Max width of 500 units

            for (const wrappedLine of wrappedLines) {
              if (yPosition < 50) {
                page = pdfDoc.addPage([600, 800]);
                yPosition = 750;
              }

              let fontSize = getFontSizeForType(type);
              let font = getFontForType(type, regularFont, boldFont);

              page.drawText(wrappedLine, {
                x: getIndentForType(type),
                y: yPosition,
                size: fontSize,
                font: font,
                color: rgb(0, 0, 0),
              });

              yPosition -= lineHeight;
            }
          }

          // Add extra space after major sections
          if (type === 'header1' || type === 'header2') {
            yPosition -= 10;
          }
        }

        // Serialize the PDF to bytes
        const pdfBytes = await pdfDoc.save();

        // Return the PDF as a response
        return new Response(pdfBytes, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="suellen-karin-doy-resume-md.pdf"',
          },
        });
      }
    } else if (format === 'markdown') {
      // Return the markdown file content
      const markdownPath = path.join(process.cwd(), 'public', 'resume.md');
      const markdownContent = await fs.readFile(markdownPath, 'utf-8');

      return new Response(markdownContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': 'attachment; filename="suellen-karin-doy-resume.md"',
        },
      });
    }

    // If we reach here, it means the request was invalid
    return new Response(
      JSON.stringify({ error: 'Invalid format or source parameter' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating resume:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate resume' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Helper function to wrap text into multiple lines
function wrapText(text: string, font: any, fontSize: number, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (testWidth > maxWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine !== '') {
    lines.push(currentLine);
  }

  return lines;
}

// Helper function to get font size based on element type
function getFontSizeForType(type: string): number {
  switch (type) {
    case 'header1':
      return 16;
    case 'header2':
      return 14;
    case 'header3':
      return 12;
    case 'header4':
    case 'header5':
    case 'header6':
      return 11;
    default:
      return 11;
  }
}

// Helper function to get font based on element type
function getFontForType(type: string, regularFont: any, boldFont: any) {
  switch (type) {
    case 'header1':
    case 'header2':
    case 'header3':
    case 'header4':
    case 'header5':
    case 'header6':
      return boldFont;
    default:
      return regularFont;
  }
}

// Helper function to parse markdown into structured elements
function parseMarkdown(content: string) {
  const elements: { text: string; type: string }[] = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('# ')) {
      // H1 header
      elements.push({ text: line.substring(2), type: 'header1' });
    } else if (line.startsWith('## ')) {
      // H2 header
      elements.push({ text: line.substring(3), type: 'header2' });
    } else if (line.startsWith('### ')) {
      // H3 header
      elements.push({ text: line.substring(4), type: 'header3' });
    } else if (line.startsWith('#### ')) {
      // H4 header
      elements.push({ text: line.substring(5), type: 'header4' });
    } else if (line.startsWith('##### ')) {
      // H5 header
      elements.push({ text: line.substring(6), type: 'header5' });
    } else if (line.startsWith('###### ')) {
      // H6 header
      elements.push({ text: line.substring(7), type: 'header6' });
    } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('+ ')) {
      // List item
      const listItems = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* ') || lines[i].trim().startsWith('+ '))) {
        listItems.push(lines[i].replace(/^- |^\* |^\+ /, '• ')); // Replace with bullet point
        i++;
      }
      i--; // Adjust for the loop increment
      elements.push({ text: listItems.join('\n'), type: 'list_item' });
    } else {
      // Regular paragraph
      elements.push({ text: line, type: 'paragraph' });
    }

    i++;
  }

  // Clean up special characters, bold, italic, link markers, and underscores
  for (const element of elements) {
    element.text = element.text
      .replace(/→/g, '->')  // Replace arrow symbol with text equivalent
      .replace(/_/g, '')    // Remove underscores
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markers
      .replace(/\*(.*?)\*/g, '$1')      // Remove italic markers
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')  // Remove link brackets and URLs
      .replace(/[^\x00-\x7F]/g, function(match) {  // Replace non-ASCII characters
        const replacements: { [key: string]: string } = {
          'ç': 'c', 'ã': 'a', 'õ': 'o', 'á': 'a', 'à': 'a', 'â': 'a', 'é': 'e', 'ê': 'e', 'í': 'i',
          'ó': 'o', 'ô': 'o', 'ú': 'u', 'ü': 'u', 'ñ': 'n', 'ç': 'c', 'Ç': 'C', 'Ã': 'A', 'Õ': 'O',
          'Á': 'A', 'À': 'A', 'Â': 'A', 'É': 'E', 'Ê': 'E', 'Í': 'I', 'Ó': 'O', 'Ô': 'O', 'Ú': 'U',
          'Ü': 'U', 'Ñ': 'N', '£': 'L', '§': 'S', '°': 'o'
        };
        return replacements[match] || match;
      });
  }

  return elements;
}

// Helper function to determine indentation based on element type
function getIndentForType(type: string): number {
  switch (type) {
    case 'header1':
      return 50;
    case 'header2':
      return 50;
    case 'header3':
      return 55;
    case 'header4':
    case 'header5':
    case 'header6':
      return 60;
    case 'list_item':
      return 70;
    default:
      return 50;
  }
}