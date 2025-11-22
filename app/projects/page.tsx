import { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LayoutDashboard,
  Blocks,
  Building2,
  Globe,
  Truck,
  Stethoscope,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Projects - Suellen Karin Oliveira Doy",
  description:
    "Showcase of projects by Suellen Karin Oliveira Doy, Senior Software Engineer specializing in Java, Kotlin, and blockchain systems",
};

const ProjectsPage = () => {
  const projects = [
    {
      title: "Corporate Customer Registration System",
      company: "C6 Bank (2024–2025)",
      description:
        "Restructured architecture to improve scalability for increased transactions. Optimized React components for backoffice workflow, improved search performance & security, and eliminated recurring incidents.",
      tech: ["Java", "Kotlin", "Spring Boot", "React", "AWS", "Corda"],
      icon: <Building2 className="h-6 w-6" />,
      status: "Completed",
    },
    {
      title: "Blockchain OTC Exchange",
      company: "Bradesco (R$ 10M tokenization)",
      description:
        "Designed backend architecture for asset tokenization using Corda. Built APIs with Kotlin & Spring Boot, deployed to AWS with Docker. Facilitated R$ 10 million in tokenized assets.",
      tech: ["Kotlin", "Spring Boot", "Corda", "AWS", "Docker", "Blockchain"],
      icon: <Globe className="h-6 w-6" />,
      status: "Completed",
    },
    {
      title: "Global R3 Blockchain Project",
      company: "Confidential",
      description:
        "Developed Kotlin/Java blockchain solutions with Corda for a global project. Created API endpoints with Spring Boot, comprehensive documentation, and extensive unit tests.",
      tech: ["Kotlin", "Java", "Corda", "Spring Boot", "Blockchain"],
      icon: <Blocks className="h-6 w-6" />,
      status: "Completed",
    },
    {
      title: "Open Finance Solutions",
      company: "Central Bank of Brazil",
      description:
        "Implemented Java APIs aligned with Open Finance requirements, focusing on security, compliance, and testing. Improved financial data standardization and system reliability.",
      tech: ["Java", "Spring Boot", "Security", "Compliance", "Open Finance"],
      icon: <LayoutDashboard className="h-6 w-6" />,
      status: "Completed",
    },
    {
      title: "Freight Negotiation System",
      company: "Logistics Platform",
      description:
        "Built Angular frontend with Kotlin/Java APIs and Corda for tracking. Implemented microservices architecture that improved process efficiency by 85%.",
      tech: ["Angular", "Kotlin", "Java", "Corda", "Microservices"],
      icon: <Truck className="h-6 w-6" />,
      status: "Completed",
    },
    {
      title: "Medical Exam Workflow System",
      company: "Internship Project",
      description:
        "Developed an automated workflow system that reduced medical exam processing time by 60%. Implemented with Java and Spring Boot, focusing on efficiency and accuracy.",
      tech: ["Java", "Spring Boot", "Workflow", "Automation"],
      icon: <Stethoscope className="h-6 w-6" />,
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold mb-4 text-center">
            Projects & Case Studies
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A showcase of impactful projects I've contributed to throughout my
            career
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index} className="h-full" delay={index * 0.1}>
              <Card className="flex flex-col h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3">
                      {project.icon}
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </div>
                  <CardDescription className="text-primary font-medium">
                    {project.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-100">
                      {project.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
