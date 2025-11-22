import { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";

export const metadata: Metadata = {
  title: "About Me - Suellen Karin Oliveira Doy",
  description:
    "Learn more about Suellen Karin Oliveira Doy, Senior Software Engineer with expertise in Java, Kotlin, and blockchain systems",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl">
              I'm a <strong>Senior Software Engineer</strong> with{" "}
              <strong>7+ years of experience</strong> specializing in Java,
              Kotlin, Spring Boot, and microservices architecture. Throughout my
              career, I've focused on building scalable, resilient,
              high-performance systems that drive business value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-bold mb-4">
                Professional Expertise
              </h2>
              <p className="mb-4">
                My expertise lies in designing and implementing enterprise-grade
                systems with a focus on financial services, blockchain
                technologies (particularly Corda), and distributed systems. I
                have a proven track record of improving system stability,
                optimizing performance, and eliminating critical incidents that
                impact business operations.
              </p>
              <p className="mb-4">
                I've worked on complex projects involving high-volume
                transaction processing, security-critical applications, and
                compliance with financial regulations. My approach combines
                technical depth with business understanding to deliver solutions
                that meet both technical and commercial requirements.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-2xl font-bold mb-4">Technical Background</h2>
              <p className="mb-4">
                My technical background spans across various domains including
                financial systems, blockchain technologies, and enterprise
                application development. I have deep experience with Java and
                Kotlin ecosystems, Spring Boot, and modern microservices
                architecture patterns.
              </p>
              <p>
                I'm passionate about solving complex technical challenges and
                continuously learning new technologies. I enjoy mentoring junior
                developers and contributing to team success through knowledge
                sharing and collaborative problem-solving.
              </p>
            </AnimatedSection>
          </div>

          <div className="bg-muted/50 dark:bg-muted/10 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">What Drives Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Problem Solving</h3>
                <p>
                  I'm energized by complex technical challenges that require
                  deep analysis and creative solutions.
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Continuous Learning
                </h3>
                <p>
                  Technology evolves rapidly, and I'm committed to staying
                  current with emerging trends and best practices.
                </p>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Impact</h3>
                <p>
                  I'm motivated by work that creates meaningful value for users
                  and drives business success.
                </p>
              </div>
            </div>
          </div>

          <AnimatedSection delay={0.3}>
            <h2 className="text-2xl font-bold mb-4">Personal Interests</h2>
            <p>
              Beyond coding, I'm interested in the intersection of technology
              and finance, particularly how blockchain and distributed ledger
              technologies are reshaping the financial industry. In my free
              time, I enjoy exploring new technical frameworks, contributing to
              open-source projects, and staying updated with the latest
              developments in enterprise architecture and system design.
            </p>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AboutPage;
