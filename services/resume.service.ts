import { PDFDocument, StandardFonts, rgb, PDFFont } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export class ResumeService {
  async generatePDF(resumeData: ResumeData): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();

    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pageWidth = 600;
    const pageHeight = 800;
    const marginLeft = 50;
    const marginRight = 50;
    const usableWidth = pageWidth - marginLeft - marginRight;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - 50;
    const lineGap = 4;

    // Add resume content
    this.addResumeHeader(page, resumeData, helveticaBold, 18, marginLeft, y);
    y -= 30;

    // Add summary
    if (resumeData.summary) {
      y = this.addSectionWithContent(page, 'Summary', resumeData.summary, helveticaBold, helvetica, 12, 11, marginLeft, y, usableWidth, lineGap);
    }

    // Add experience
    if (resumeData.experience.length > 0) {
      y = this.addExperienceSection(page, resumeData.experience, helveticaBold, helvetica, marginLeft, y, usableWidth, lineGap);
    }

    // Add education
    if (resumeData.education.length > 0) {
      y = this.addEducationSection(page, resumeData.education, helveticaBold, helvetica, marginLeft, y, usableWidth, lineGap);
    }

    // Add skills
    if (resumeData.skills.length > 0) {
      y = this.addSkillsSection(page, resumeData.skills, helveticaBold, helvetica, marginLeft, y, usableWidth, lineGap);
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  // New method to generate PDF from markdown content
  async generatePdfFromMarkdown(content: string): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();

    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pageWidth = 600;
    const pageHeight = 800;
    const marginLeft = 50;
    const marginRight = 50;
    const usableWidth = pageWidth - marginLeft - marginRight;

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - 50;
    const lineGap = 4;

    const elements = this.parseMarkdown(content);

    for (const el of elements) {
      const fontSize = this.getFontSizeForType(el.type);
      const font = this.getFontForType(el.type, helvetica, helveticaBold);
      const lineHeight = Math.ceil(fontSize + lineGap);

      const rawLines = el.text.split('\n');

      for (const rawLine of rawLines) {
        if (!rawLine || rawLine.trim() === '') {
          y -= lineHeight;
          if (y < 60) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - 50;
          }
          continue;
        }

        const isBullet = rawLine.trim().startsWith('* ');
        const baseText = isBullet ? rawLine.trim().substring(2) : rawLine.trim();

        const baseIndent = 0;
        const bulletIndentExtra = isBullet ? 12 : 0;
        const textX = marginLeft + baseIndent + bulletIndentExtra;
        const availableWidth = usableWidth - baseIndent - bulletIndentExtra;

        const wrappedLines = this.wrapText(baseText, font, fontSize, availableWidth);

        for (let i = 0; i < wrappedLines.length; i++) {
          if (y < 60) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - 50;
          }

          if (isBullet && i === 0) {
            const bulletX = marginLeft + baseIndent + 4;
            const bulletY = y + fontSize / 2 - 1;
            const rx = 2;
            const ry = 2;
            page.drawEllipse({ x: bulletX, y: bulletY, xScale: rx, yScale: ry, color: rgb(0, 0, 0) });
          }
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

      if (el.type === 'header1') {
        y -= 8;
        // Add divider after header1
        const dividerY = y + 4;
        page.drawLine({
          start: { x: marginLeft, y: dividerY },
          end: { x: page.getWidth() - marginRight, y: dividerY },
          thickness: 1,
          color: rgb(0.5, 0.5, 0.5),
        });
        y -= 8; // Additional spacing after divider
      } else if (el.type === 'header2') {
        y -= 6;
        // Add divider after header2
        const dividerY = y + 3;
        page.drawLine({
          start: { x: marginLeft, y: dividerY },
          end: { x: page.getWidth() - marginRight, y: dividerY },
          thickness: 0.5,
          color: rgb(0.7, 0.7, 0.7),
        });
        y -= 6; // Additional spacing after divider
      }

      if (y < 80) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - 50;
      }
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

  private getFontSizeForType(type: string): number {
    switch (type) {
      case 'header1': return 18;
      case 'header2': return 15;
      case 'header3': return 13;
      case 'list_item': return 11;
      default: return 11;
    }
  }

  private getFontForType(type: string, regular: PDFFont, bold: PDFFont): PDFFont {
    const headers = ['header1', 'header2', 'header3', 'header4', 'header5', 'header6'];
    return headers.includes(type) ? bold : regular;
  }

  private parseMarkdown(content: string) {
    const elements: { text: string; type: string }[] = [];
    const lines = content.split(/\r?\n/);
    let i = 0;

    while (i < lines.length) {
      const raw = lines[i];

      if (raw.startsWith('# ')) {
        elements.push({ text: raw.slice(2).trim(), type: 'header1' });
        i++; continue;
      }

      if (raw.startsWith('## ')) {
        elements.push({ text: raw.slice(3).trim(), type: 'header2' });
        i++; continue;
      }

      if (raw.startsWith('### ')) {
        elements.push({ text: raw.slice(4).trim(), type: 'header3' });
        i++; continue;
      }

      if (raw.startsWith('#### ')) {
        elements.push({ text: raw.slice(5).trim(), type: 'header4' });
        i++; continue;
      }
      if (/^\s*[-*+]\s/.test(raw)) {
                while (i < lines.length && /^\s*[-*+]\s/.test(lines[i])) {
          console.log('Found list item:', lines[i]);
          // convert markdown bullets to ASCII star '*' which we'll render as drawn bullets
          const cleaned = lines[i].replace(/^\s*[-*+]\s/, '* ').trimEnd();
          console.log('Cleaned list item:', cleaned);
          elements.push({ text: cleaned, type: 'list_item' });
          i++;
        }
        continue;
      } else {
        // paragraph (may be empty)
        elements.push({ text: raw.trim(), type: 'paragraph' });
        i++; continue;
      }
      }

    // Clean markdown inline markers but keep ASCII bullets and basic punctuation.
    for (const e of elements) {
      e.text = this.cleanMarkdown(e.text);
    }

    return elements;
  }

  private cleanMarkdown(text: string) {
    const map: Record<string, string> = {
      'ç': 'c','ã':'a','õ':'o','á':'a','à':'a','â':'a','é':'e','ê':'e','í':'i',
      'ó':'o','ô':'o','ú':'u','ü':'u','ñ':'n',
      'Ç':'C','Ã':'A','Õ':'O','Á':'A','À':'A','Â':'A',
      'É':'E','Ê':'E','Í':'I','Ó':'O','Ô':'O','Ú':'U','Ü':'U','Ñ':'N'
    };

    let out = text
      .replace(/→/g, '->')       // troca seta por ASCII
      .replace(/_/g, '')         // remove _
      .replace(/\*\*(.*?)\*\*/g, '$1') // remove **negrito**
      .replace(/\*(.*?)\*/g, '$1')    // remove *itálico*
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // remove links [texto](url)
      .replace(/[\x00-\x1F]/g, '');  // remove caracteres de controle


    out = out.replace(/[^]/g, ch => map[ch] ?? ch); // transforma “á ç ã ü ñ …” → “a c a u n”

    return out;
  }

  private addResumeHeader(page: any, resumeData: ResumeData, font: PDFFont, fontSize: number, x: number, y: number) {
    // Name
    page.drawText(resumeData.name, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });

    // Contact info
    const contactY = y - 15;
    const contactInfo = `${resumeData.email} | ${resumeData.phone}`;
    page.drawText(contactInfo, { x, y: contactY, size: 10, font, color: rgb(0, 0, 0) });
  }

  private addSectionWithContent(page: any, title: string, content: string, boldFont: PDFFont, regularFont: PDFFont,
                                titleSize: number, contentSize: number, x: number, y: number, usableWidth: number, lineGap: number): number {
    let currentY = y;

    // Add section title
    page.drawText(title, { x, y: currentY, size: titleSize, font: boldFont, color: rgb(0, 0, 0) });
    currentY -= (titleSize + lineGap);

    // Add section content
    const wrappedLines = this.wrapText(content, regularFont, contentSize, usableWidth);

    for (const line of wrappedLines) {
      if (currentY < 60) {
        // Add new page if needed
        const newPage = page.doc.addPage([600, 800]);
        page = newPage;
        currentY = 750;
      }
      page.drawText(line, { x, y: currentY, size: contentSize, font: regularFont, color: rgb(0, 0, 0) });
      currentY -= (contentSize + lineGap);
    }

    return currentY;
  }

  private addExperienceSection(page: any, experience: ExperienceItem[], boldFont: PDFFont, regularFont: PDFFont,
                               x: number, y: number, usableWidth: number, lineGap: number): number {
    let currentY = y;

    // Add section title
    page.drawText('Experience', { x, y: currentY, size: 12, font: boldFont, color: rgb(0, 0, 0) });
    currentY -= 16;

    for (const exp of experience) {
      // Position and company
      const positionText = `${exp.position} at ${exp.company}`;
      page.drawText(positionText, { x, y: currentY, size: 11, font: boldFont, color: rgb(0, 0, 0) });
      currentY -= 12;

      // Dates
      const datesText = `${exp.startDate} - ${exp.endDate}`;
      page.drawText(datesText, { x, y: currentY, size: 10, font: regularFont, color: rgb(0.5, 0.5, 0.5) });
      currentY -= 12;

      // Description
      const wrappedDescription = this.wrapText(exp.description, regularFont, 10, usableWidth);
      for (const line of wrappedDescription) {
        if (currentY < 60) {
          // Add new page if needed
          const newPage = page.doc.addPage([600, 800]);
          page = newPage;
          currentY = 750;
        }
        page.drawText(line, { x, y: currentY, size: 10, font: regularFont, color: rgb(0, 0, 0) });
        currentY -= 10;
      }

      currentY -= 8; // Extra space between experience items
    }

    return currentY;
  }

  private addEducationSection(page: any, education: EducationItem[], boldFont: PDFFont, regularFont: PDFFont,
                              x: number, y: number, usableWidth: number, lineGap: number): number {
    let currentY = y;

    // Add section title
    page.drawText('Education', { x, y: currentY, size: 12, font: boldFont, color: rgb(0, 0, 0) });
    currentY -= 16;

    for (const edu of education) {
      // Degree and institution
      const degreeText = `${edu.degree}, ${edu.institution}`;
      page.drawText(degreeText, { x, y: currentY, size: 11, font: boldFont, color: rgb(0, 0, 0) });
      currentY -= 12;

      // Dates
      const datesText = `${edu.startDate} - ${edu.endDate}`;
      page.drawText(datesText, { x, y: currentY, size: 10, font: regularFont, color: rgb(0.5, 0.5, 0.5) });
      currentY -= 8;
    }

    return currentY;
  }

  private addSkillsSection(page: any, skills: string[], boldFont: PDFFont, regularFont: PDFFont,
                           x: number, y: number, usableWidth: number, lineGap: number): number {
    let currentY = y;

    // Add section title
    page.drawText('Skills', { x, y: currentY, size: 12, font: boldFont, color: rgb(0, 0, 0) });
    currentY -= 16;

    // Join skills with commas
    const skillsText = skills.join(', ');
    const wrappedLines = this.wrapText(skillsText, regularFont, 10, usableWidth);

    for (const line of wrappedLines) {
      if (currentY < 60) {
        // Add new page if needed
        const newPage = page.doc.addPage([600, 800]);
        page = newPage;
        currentY = 750;
      }
      page.drawText(line, { x, y: currentY, size: 10, font: regularFont, color: rgb(0, 0, 0) });
      currentY -= 10;
    }

    return currentY;
  }

  private wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
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
        if (font.widthOfTextAtSize(w, fontSize) > maxWidth) {
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

  async generateMarkdown(resumeData: ResumeData): Promise<string> {
    let markdown = `# ${resumeData.name}\n\n`;
    markdown += `**Email:** ${resumeData.email}\n`;
    markdown += `**Phone:** ${resumeData.phone}\n\n`;

    if (resumeData.summary) {
      markdown += `## Summary\n\n`;
      markdown += `${resumeData.summary}\n\n`;
    }

    if (resumeData.experience.length > 0) {
      markdown += `## Experience\n\n`;
      for (const exp of resumeData.experience) {
        markdown += `### ${exp.position} at ${exp.company}\n`;
        markdown += `*${exp.startDate} - ${exp.endDate}*\n\n`;
        markdown += `${exp.description}\n\n`;
      }
    }

    if (resumeData.education.length > 0) {
      markdown += `## Education\n\n`;
      for (const edu of resumeData.education) {
        markdown += `### ${edu.degree}, ${edu.institution}\n`;
        markdown += `*${edu.startDate} - ${edu.endDate}*\n\n`;
      }
    }

    if (resumeData.skills.length > 0) {
      markdown += `## Skills\n\n`;
      markdown += `${resumeData.skills.join(', ')}\n\n`;
    }

    return markdown;
  }

}