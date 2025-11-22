import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t py-6">
      <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Suellen Karin Oliveira Doy. All rights
          reserved.
        </div>
        <div className="flex space-x-4">
          <Link
            href="mailto:doykarin@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
