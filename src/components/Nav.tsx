import { Github, Linkedin, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">
            SAMXIAO
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link to="/resume" className="hover:text-primary transition-colors">Resume</Link>
            <a href="https://github.com/samxiao0" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md bg-transparent hover:bg-muted transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden w-full bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-4">
            {/* <div className="flex items-center justify-between mb-3">
              <Link to="/" onClick={() => setOpen(false)} className="text-lg font-semibold">SAMXIAO</Link>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md bg-transparent hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div> */}

            <div className="flex flex-col gap-3">
              <Link to="/" onClick={() => setOpen(false)} className="text-sm hover:text-primary transition-colors">Home</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="text-sm hover:text-primary transition-colors">About</Link>
              <Link to="/projects" onClick={() => setOpen(false)} className="text-sm hover:text-primary transition-colors">Projects</Link>
              <Link to="/resume" onClick={() => setOpen(false)} className="text-sm hover:text-primary transition-colors">Resume</Link>

              <div className="flex items-center gap-4 pt-2">
                <a href="https://github.com/samxiao0" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
