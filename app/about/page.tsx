import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "About Me - Suellen Karin Oliveira Doy",
  description:
    "Learn more about Suellen Karin Oliveira Doy, Senior Software Engineer with expertise in Java, Kotlin, and blockchain systems",
};

const AboutPage = () => {
  // Redirect to the home page with the #about anchor
  redirect("/#about");
};

export default AboutPage;
