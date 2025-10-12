import { Button } from "@/components/ui/button";
import { Github, ArrowLeft, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ProjectCard";

const Projects = () => {
  type RepoItem = {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    updated_at: string;
    language?: string | null;
    stargazers_count?: number;
    forks_count?: number;
  };

const GITHUB_USERNAME = "samxiao0"; // update if needed
  const MAX_REPOS = 5;
  // Keep DESIRED_REPOS empty here — Projects page will use its own DESIRED_REPOS list.
  const DESIRED_REPOS: string[] = ["SEM22",
    "samxaio.fun",
    "final-hackathon",
    "PRIVATE-CHAT",
    "AIMLPHOTOS",
    "student-website",
    "college2025",
    "clg",
    "my-resume2.0",
    "ThinkBotz112",
    "thinkbotz"

  ];

  // Featured projects data
  const projects = [
    {
      title: "AI Task Manager",
      description: "Smart task management app with AI-powered priority suggestions and natural language processing.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      tags: ["TypeScript", "OpenAI", "PostgreSQL", "Docker"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/samxiao0/ai-task-manager",
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather visualization with interactive maps, forecasts, and historical data analysis.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
      tags: ["React", "D3.js", "API", "Tailwind"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/samxiao0/weather-dashboard",
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio website with dark mode, animations, and responsive design.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["React", "Vite", "Tailwind", "TypeScript"],
      liveUrl: "https://samxaio.fun",
      githubUrl: "https://github.com/samxiao0/samxaio.fun",
    },
  ];

  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedNames, setFailedNames] = useState<string[]>([]);

  // Refactor fetch logic into a callable function so Refresh can re-run without page reload
  const fetchAll = async () => {
    setLoading(true);
    setErrorMessage(null);
    setFailedNames([]);

    try {
      // Try proxy first (if configured/running); if that fails, fall back to calling GitHub directly.
      const proxyBase = (import.meta.env.VITE_API_PROXY as string | undefined) || "http://localhost:5000";
      const proxyUrl = `${proxyBase}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`;

      let listRes: Response | null = null;
      let usedProxy = false;
      let lastErrorMessage: string | null = null;

      // Attempt proxy fetch
      try {
        listRes = await fetch(proxyUrl);
        if (listRes && listRes.ok) {
          usedProxy = true;
        } else if (listRes) {
          // parse proxy error message if present and fall through to direct fetch
          try {
            const body = await listRes.json();
            if (body && body.message) lastErrorMessage = `proxy: ${body.message}`;
          } catch {}
        }
      } catch (err: any) {
        // network error to proxy, we'll try direct
        lastErrorMessage = `proxy network error: ${err?.message ?? String(err)}`;
      }

      // If proxy wasn't usable, try GitHub API directly (may use client token if set)
      if (!usedProxy) {
        const githubUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc`;
        const clientToken = (import.meta.env.VITE_GITHUB_TOKEN as string | undefined) || undefined;
        try {
          const opts = clientToken ? { headers: { Authorization: `token ${clientToken}` } } : undefined;
          listRes = await fetch(githubUrl, opts as any);
          if (!listRes.ok) {
            let msg = `status ${listRes.status}`;
            try {
              const body = await listRes.json();
              if (body && body.message) msg += ` - ${body.message}`;
            } catch {}
            throw new Error(lastErrorMessage ? `${lastErrorMessage} ; direct: ${msg}` : msg);
          }
        } catch (err: any) {
          throw err;
        }
      }

      // At this point listRes should be a successful response
      if (!listRes) throw new Error(lastErrorMessage ?? "No response from proxy or GitHub");
      const allRepos = await listRes.json();

      const successes: RepoItem[] = [];
      const failed: string[] = [];

      if (DESIRED_REPOS.length > 0) {
        // Find each desired repo in the user's repo list
        for (const name of DESIRED_REPOS) {
          const found = allRepos.find((r: any) => String(r.name).toLowerCase() === name.toLowerCase());
          if (found) {
            successes.push({
              id: found.id,
              name: found.name,
              html_url: found.html_url,
              description: found.description,
              updated_at: found.updated_at,
              language: found.language,
              stargazers_count: found.stargazers_count,
              forks_count: found.forks_count,
            } as RepoItem);
          } else {
            failed.push(`${name} (not found)`);
          }
        }
      } else {
        // No whitelist — show recent repos
        const take = (allRepos as any[]).slice(0, MAX_REPOS);
        for (const r of take) {
          successes.push({
            id: r.id,
            name: r.name,
            html_url: r.html_url,
            description: r.description,
            updated_at: r.updated_at,
            language: r.language,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
          } as RepoItem);
        }
      }

      setRepos(successes);
      if (failed.length > 0) {
        setErrorMessage(`Failed to fetch ${failed.length} repo(s)`);
        setFailedNames(failed);
      }
  // Note: requests are proxied through the server to avoid exposing tokens client-side.
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message ?? String(err));
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <Nav />
      {/* Back to Top */}
      {/* <div className="fixed bottom-8 right-8">
        <a
          href="#"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-muted transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </a>
      </div> */}
      <main id="main-content" className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Featured Projects Section */}
        <section className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Here are some of my highlighted projects that showcase my skills and experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        {/* GitHub Repositories Section */}
        <section data-aos="fade-up">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">All GitHub Repositories</h2>
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={() => { fetchAll(); }}>
              Refresh
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {loading ? (
            <p className="text-muted-foreground">Loading projects…</p>
          ) : errorMessage ? (
            <div>
              <p className="text-destructive">{errorMessage}</p>
              {failedNames.length > 0 && (
                <ul className="text-sm text-muted-foreground mt-2">
                  {failedNames.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              )}
              <p className="text-muted-foreground mt-2">Check the repo names in <code>src/pages/Projects.tsx</code> or try Refresh.</p>
            </div>
          ) : repos.length === 0 ? (
            <p className="text-muted-foreground">No projects configured. Add repo names to DESIRED_REPOS in src/pages/Projects.tsx</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.map((repo) => (
                <div 
                  key={repo.id} 
                  className="group relative border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm"
                >
                  {/* Repo Name with Icon */}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mb-3 group/link"
                  >
                    <Github className="w-5 h-5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                    <h3 className="text-xl font-bold group-hover/link:text-primary transition-colors">
                      {repo.name}
                    </h3>
                  </a>
                  
                  {/* Description */}
                  {repo.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {repo.description}
                    </p>
                  )}
                  
                  {/* Footer - Stats & Date */}
                  <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/50">
                    {/* Left side - Language & Stats */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-primary"></span>
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count !== undefined && repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          ⭐ {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count !== undefined && repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          🍴 {repo.forks_count}
                        </span>
                      )}
                    </div>
                    
                    {/* Right side - Updated date */}
                    <time className="text-xs text-muted-foreground">
                      {new Date(repo.updated_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </section>
  </main>
  
    </div>
  );
};

export default Projects;
