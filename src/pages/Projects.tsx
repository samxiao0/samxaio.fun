import { Button } from "@/components/ui/button";
import { Github, ArrowLeft, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import { Link } from "react-router-dom";

const Projects = () => {
  type RepoItem = {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    updated_at: string;
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
      <div className="fixed bottom-8 right-8">
        <a
          href="#"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-muted transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </a>
      </div>
      <main id="main-content" className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
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
            repos.map((repo) => (
              <div key={repo.id} className="group">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium group-hover:text-primary transition-colors"
                >
                  {repo.name}
                </a>
                {repo.description && <p className="text-sm text-muted-foreground">{repo.description}</p>}
              </div>
            ))
          )}
        </div>
  </main>
  
    </div>
  );
};

export default Projects;
