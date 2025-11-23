import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Skills - Suellen Karin Oliveira Doy",
  description:
    "Technical skills and expertise of Suellen Karin Oliveira Doy, Senior Software Engineer",
};

const SkillsPage = () => {
  redirect("/#skills");
};

export default SkillsPage;
