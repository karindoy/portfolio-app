export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface GenerateResumeRequest {
  format: 'pdf' | 'markdown';
  source: 'data' | 'markdown';
  resumeData?: ResumeData;
  markdownPath?: string;
}

export interface GenerateResumeResponse {
  success: boolean;
  message: string;
  fileName?: string;
  fileUrl?: string;
}