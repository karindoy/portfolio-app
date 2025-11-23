"use client";

import { AnimatedSection } from "@/components/animated-section";
import {
  Code,
  Cpu,
  Blocks,
  DollarSign
} from "lucide-react";

const Highlights = () => {
  const highlights = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "7+ Years Experience",
      description: "Building robust software solutions across various domains"
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Java & Kotlin Specialist",
      description: "Expert in enterprise-grade JVM technologies"
    },
    {
      icon: <Blocks className="h-8 w-8" />,
      title: "Financial Systems",
      description: "Specialized in banking and blockchain technologies"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "High-Performance",
      description: "Designed scalable, high-throughput platforms"
    }
  ];

  return (
    <section id="highlights" className="py-12 bg-muted/50 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Quick Highlights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into my technical expertise and professional journey
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <AnimatedSection
              key={index}
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              delay={index * 0.1}
            >
              <div className="text-primary mb-4">{highlight.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
              <p className="text-muted-foreground">{highlight.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;