"use client";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import Link from "next/link";

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
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button size="lg" asChild>
              <Link href="#projects" onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('projects');
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}>
                View Projects
                <span className="sr-only">View Projects</span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="mailto:doykarin@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Contact Me
              </Link>
            </Button>
          </div>
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Download Resume">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
