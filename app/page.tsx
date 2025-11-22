import { Metadata } from "next";
import Hero from "@/components/hero";
import Highlights from "@/components/highlights";
import { AnimatedSection } from "@/components/animated-section";

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
      <AnimatedSection className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Welcome to My Portfolio</h2>
          <p className="text-lg text-muted-foreground mb-8">
            I&apos;m a Senior Software Engineer with extensive experience in
            building scalable, high-performance systems. With expertise in Java,
            Kotlin, Spring Boot, and blockchain technologies, I&apos;ve
            contributed to several high-impact projects in the financial and
            distributed systems domains.
          </p>
          <p className="text-lg text-muted-foreground">
            Explore my projects, experience, and skills to learn more about my
            technical capabilities and professional journey.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
