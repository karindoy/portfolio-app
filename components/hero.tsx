"use client";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";

const Hero = () => {
  return (
    <section id="hero" className="py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Suellen Karin Oliveira Doy
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Senior Software Engineer — building scalable, resilient,
            high-performance systems.
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Specializing in Java, Kotlin, Spring Boot, and blockchain
            technologies with 7+ years of experience in financial systems and
            distributed architectures.
          </p>
          <div className="flex justify-center space-x-12">
            <a
              href="https://github.com/karindoy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="GitHub"
                className="transform"
                style={{ transform: "scale(2)", transformOrigin: "center" }}
              >
                <FaGithub className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://linkedin.com/in/doykarin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="LinkedIn"
                className="transform"
                style={{ transform: "scale(2)", transformOrigin: "center" }}
              >
                <FaLinkedin className="h-5 w-5" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Download Resume"
              className="transform"
              style={{ transform: "scale(2)", transformOrigin: "center" }}
            >
              <FaFileDownload className="h-5 w-5" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
