import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Experience - Suellen Karin Oliveira Doy",
  description:
    "Professional experience of Suellen Karin Oliveira Doy, Senior Software Engineer specializing in Java, Kotlin, and blockchain systems",
};

const ExperiencePage = () => {
  // Redirect to the home page with the #experience anchor
  redirect("/#experience");
};

export default ExperiencePage;
