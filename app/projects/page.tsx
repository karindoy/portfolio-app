import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Projects - Suellen Karin Oliveira Doy",
  description:
    "Showcase of projects by Suellen Karin Oliveira Doy, Senior Software Engineer specializing in Java, Kotlin, and blockchain systems",
};

const ProjectsPage = () => {
  redirect("/#projects");
};

export default ProjectsPage;
