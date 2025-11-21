import { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { getIconForSkill } from "@/components/skill-icon";
import { Code, Database, Wrench, Globe, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills - Suellen Doykarin",
  description: "Technical skills and expertise of Suellen Doykarin, Senior Software Engineer",
};

const SkillsPage = () => {
  const skillsCategories = [
    {
      title: "Languages & Frameworks",
      icon: <Code className="h-5 w-5" />,
      skills: ["Kotlin", "Java", "JavaScript", "SQL", "Spring Boot", "Javalin", "Corda", "JUnit", "MockK", "Mockito"],
    },
    {
      title: "Databases",
      icon: <Database className="h-5 w-5" />,
      skills: ["PostgreSQL", "MongoDB", "Redis", "SQL Server"],
    },
    {
      title: "Tools & Infrastructure",
      icon: <Wrench className="h-5 w-5" />,
      skills: ["Docker", "Git", "JMeter", "AWS (EC2, RDS, S3, SQS, CloudWatch)"],
    },
    {
      title: "Concepts & Architecture",
      icon: <Globe className="h-5 w-5" />,
      skills: ["Microservices", "REST APIs", "MVC", "Distributed Systems", "Blockchain/Corda"],
    },
    {
      title: "Soft Skills",
      icon: <Cpu className="h-5 w-5" />,
      skills: ["Teamwork", "Problem Solving", "Adaptability", "Fast Learning"],
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold mb-4 text-center">Skills & Expertise</h1>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and professional competencies
          </p>
        </AnimatedSection>

        <div className="space-y-16">
          {skillsCategories.map((category, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 p-2 rounded-lg mr-4">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = getIconForSkill(skill);
                    return (
                      <div 
                        key={skillIndex} 
                        className="flex flex-col items-center p-4 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <IconComponent className="h-8 w-8 mb-2 text-primary" />
                        <span className="text-center text-sm font-medium">{skill}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;