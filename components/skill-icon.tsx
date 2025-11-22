import { Code, Database, Wrench, Layout, Globe, GitBranch } from "lucide-react";

type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export const getIconForSkill = (skill: string): IconType => {
  const skillLower = skill.toLowerCase();

  // Languages & Frameworks
  if (
    [
      "kotlin",
      "java",
      "javascript",
      "typescript",
      "python",
      "go",
      "rust",
      "c#",
      "c++",
      "swift",
    ].includes(skillLower)
  ) {
    return Code;
  }

  if (
    [
      "spring boot",
      "react",
      "angular",
      "vue",
      "node.js",
      "express",
      "django",
      "flask",
      "laravel",
    ].includes(skillLower)
  ) {
    return Layout;
  }

  // Databases
  if (
    [
      "postgresql",
      "mongodb",
      "redis",
      "mysql",
      "mariadb",
      "cassandra",
      "oracle",
    ].includes(skillLower)
  ) {
    return Database;
  }

  // Tools
  if (
    [
      "docker",
      "kubernetes",
      "jenkins",
      "git",
      "linux",
      "aws",
      "azure",
      "gcp",
    ].includes(skillLower)
  ) {
    return Wrench;
  }

  // Concepts
  if (
    [
      "microservices",
      "rest api",
      "graphql",
      "websockets",
      "oauth",
      "jwt",
    ].includes(skillLower)
  ) {
    return Globe;
  }

  // Blockchain
  if (
    ["blockchain", "corda", "ethereum", "bitcoin", "web3", "solidity"].includes(
      skillLower
    )
  ) {
    return GitBranch;
  }

  // Default
  return Code;
};
