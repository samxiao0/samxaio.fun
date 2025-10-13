import { Github, Linkedin, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'black' | 'white'>(document.body.classList.contains('white') ? 'white' : 'black');

  // Toggle theme between black and white using CSS classes
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'black' ? 'white' : 'black';
      document.body.classList.remove('black', 'white');
      document.body.classList.add(next);
      return next;
    });
  };

  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">
            SAMXIAO
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
            <button
              aria-label={theme === 'black' ? 'Switch to white mode' : 'Switch to black mode'}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              style={{ transition: 'background 0.3s' }}
            >
              {theme === 'black'
                ? (
                  // Sun outline SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                    <g stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="2" x2="12" y2="5" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="5" y2="12" />
                      <line x1="19" y1="12" x2="22" y2="12" />
                      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                    </g>
                  </svg>
                )
                : (
                  // Moon outline SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                )}
            </button>
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link to="/resume" className="hover:text-primary transition-colors">Resume</Link>
            {/* <a href="https://github.com/samxiao0" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a> */}
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              aria-label={theme === 'black' ? 'Switch to white mode' : 'Switch to black mode'}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              style={{ transition: 'background 0.3s' }}
            >
              {theme === 'black'
                ? (
                  // Sun outline SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                    <g stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="2" x2="12" y2="5" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="5" y2="12" />
                      <line x1="19" y1="12" x2="22" y2="12" />
                      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                    </g>
                  </svg>
                )
                : (
                  // Moon outline SVG
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="#000000ff" strokeWidth="2" fill="none" />
                  </svg>
                )}
            </button>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-white/5 transition-colors"
            >
              {open ? (
                <X className="w-5 h-5" strokeWidth={2} />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
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

              {/* <div className="flex items-center gap-4 pt-2 border-t border-border mt-2 pt-3">
                <a href="https://github.com/samxiao0" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
