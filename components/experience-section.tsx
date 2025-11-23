import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Building2, Code, DollarSign } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      company: "Act Digital @ C6 Bank",
      position: "Software Engineer (Senior)",
      period: "May 2024 – Present",
      description: [
        "Developing scalable financial systems with high transaction volumes",
        "Implementing microservices architecture for improved system resilience",
        "Working with Kotlin, Java, and Spring Boot in the banking domain",
        "Focusing on security, compliance, and performance optimization",
      ],
      icon: <Building2 className="h-6 w-6" />,
      achievements: [
        "Improved system stability by eliminating recurring critical incidents",
        "Optimized performance for high-volume transaction processing",
        "Implemented security enhancements for financial compliance",
      ],
    },
    {
      id: 2,
      company: "7COMm",
      position: "Software Engineer (Intern → Junior → Mid → Senior)",
      period: "Aug 2020 – Apr 2024",
      description: [
        "Progressed through all levels from intern to senior engineer",
        "Designed backend architecture for blockchain solutions",
        "Developed APIs using Kotlin, Java, and Spring Boot",
        "Worked on distributed systems and financial technology projects",
      ],
      icon: <Code className="h-6 w-6" />,
      achievements: [
        "Led development of R$ 10M blockchain OTC exchange project",
        "Implemented Corda-based solutions for global blockchain project",
        "Improved system performance and reliability through architecture improvements",
      ],
    },
    {
      id: 3,
      company: "São Paulo State Health Department",
      position: "Software Developer",
      period: "Jun 2018 – Dec 2019",
      description: [
        "Developed systems for public health administration",
        "Created automated workflows to improve efficiency",
        "Implemented solutions that reduced processing time by 60%",
        "Focused on accuracy and reliability for critical health data",
      ],
      icon: <DollarSign className="h-6 w-6" />,
      achievements: [
        "Reduced medical exam processing time by 60% through automation",
        "Improved data accuracy and system reliability",
        "Enhanced user experience for public health workers",
      ],
    },
  ];

  return (
    <div id="experience" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold mb-4 text-center">
            Professional Experience
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A timeline of my professional journey and key accomplishments
          </p>
        </AnimatedSection>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <AnimatedSection
              key={exp.id}
              className="relative pl-8 border-l-2 border-border"
              delay={index * 0.1}
            >
              <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary"></div>

              <Card className="border-0 shadow-none hover:shadow-sm transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center text-2xl">
                        <div className="bg-primary/10 p-2 rounded-lg mr-3">
                          {exp.icon}
                        </div>
                        {exp.position}
                      </CardTitle>
                      <h3 className="text-xl font-semibold mt-1">
                        {exp.company}
                      </h3>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    <h4 className="font-semibold text-lg mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
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

export default ExperienceSection;
