import { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact - Suellen Karin Oliveira Doy",
  description:
    "Get in touch with Suellen Karin Oliveira Doy, Senior Software Engineer specializing in Java, Kotlin, and blockchain systems",
};

const ContactPage = () => {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "doykarin@gmail.com",
      description: "Send me a direct message",
      action: "Open Email",
      link: "mailto:doykarin@gmail.com",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      title: "LinkedIn",
      value: "linkedin.com/in/doykarin",
      description: "Connect with me professionally",
      action: "View Profile",
      link: "https://linkedin.com/in/doykarin",
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "GitHub",
      value: "github.com/karindoy",
      description: "Check out my projects",
      action: "View Profile",
      link: "https://github.com/karindoy",
    },
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl font-bold mb-4 text-center">Get In Touch</h1>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            I&apos;m currently available for new opportunities. Feel free to
            reach out if you&apos;d like to connect!
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {contactMethods.map((method, index) => (
            <AnimatedSection key={index} className="h-full" delay={index * 0.1}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3">
                      {method.icon}
                    </div>
                    <CardTitle>{method.title}</CardTitle>
                  </div>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground font-medium mb-4">
                    {method.value}
                  </p>
                  <Button asChild>
                    {method.link.startsWith('http') ? (
                      <Link href={method.link} target="_blank" rel="noopener noreferrer">
                        {method.action}
                      </Link>
                    ) : (
                      <Link href={method.link}>{method.action}</Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="text-center max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                Let&apos;s Work Together
              </CardTitle>
              <CardDescription>
                I&apos;m currently available for freelance projects and
                full-time positions. Whether you have a question or just want to
                say hi, I&apos;ll try my best to get back to you!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild>
                <Link href="mailto:doykarin@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Link>
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ContactPage;
