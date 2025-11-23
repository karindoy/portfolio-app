const Footer = () => {
  return (
    <footer className="border-t py-6 p-1">
      <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Suellen Karin Oliveira Doy. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
