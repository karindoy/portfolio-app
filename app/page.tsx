import { Metadata } from "next";
import Hero from "@/components/hero";
import Highlights from "@/components/highlights";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceSection from "@/components/experience-section";
import ContactSection from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Suellen Karin Oliveira Doy - Senior Software Engineer",
  description:
    "Senior Software Engineer specializing in Java, Kotlin, Spring Boot, and blockchain systems",
};

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Highlights />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}
