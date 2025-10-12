const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-transparent">
      <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="font-medium">SYED MOHAMMAD SAMEER</span>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-3 text-sm">
            <a href="/" className="hover:text-foreground">Home</a>
            <a href="/projects" className="hover:text-foreground">Projects</a>
            <a href="#about" className="hover:text-foreground">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://github.com/samxiao0" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
