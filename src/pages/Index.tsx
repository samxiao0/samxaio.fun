import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowUp, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";

const Index = () => {
  
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
  const DESIRED_REPOS: string[] = [];

  const [recentRepos, setRecentRepos] = useState<RepoItem[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [repoError, setRepoError] = useState<string | null>(null);

  // fetchRepos can be called on mount and manually via the Refresh button
  const fetchRepos = async () => {
    setLoadingRepos(true);
    setRepoError(null);

    try {
      // If DESIRED_REPOS is set, fetch each repo individually and preserve the specified order.
      if (DESIRED_REPOS.length > 0) {
        const results = await Promise.all(
          DESIRED_REPOS.map(async (name) => {
            try {
              const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}`);
              if (!res.ok) throw new Error(`Failed to fetch ${name}: ${res.status}`);
              const r = await res.json();
              return {
                id: r.id,
                name: r.name,
                html_url: r.html_url,
                description: r.description,
                updated_at: r.updated_at,
              } as RepoItem;
            } catch (err: any) {
              console.error(err);
              return null;
            }
          })
        );

        const repos = (results.filter(Boolean) as RepoItem[]).slice(0, MAX_REPOS);
        setRecentRepos(repos);
        return;
      }

      // request most recently updated first; add direction=desc
      const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${MAX_REPOS}&sort=updated&direction=desc`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
      const data = await res.json();

      const repos = (data as any[]).map((r) => ({
        id: r.id,
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        updated_at: r.updated_at,
      })) as RepoItem[];

      // client-side safety: sort by updated_at desc
      repos.sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at));
      setRecentRepos(repos);
    } catch (err: any) {
      console.error("Failed to fetch GitHub repos:", err);
      setRecentRepos([]);
      setRepoError(err?.message ?? String(err));
    } finally {
      setLoadingRepos(false);
    }
  };

  useEffect(() => {
    // run on mount
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main id="main-content" className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        {/* Profile Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src="/channels4_profile-1024x576.jpg" 
              alt="Profile"
              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-border"
            />
          </div>
          
          <h1 className="text-5xl font-bold mb-3">SYED MOHAMMAD SAMEER</h1>
          <p className="text-xl text-muted-foreground mb-6">Student</p>
          
          <div className="flex justify-center gap-4 mb-8">
            <a 
              href="mailto:syedsame2244@gmail.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/samxiao0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="text-left max-w-2xl mx-auto space-y-4">
            <p className="text-lg">Welcome 👋,</p>
            
            <p className="text-base leading-relaxed text-foreground/90">
             I’m SAMXIAO, a passionate 3rd-year B.Tech CSE (AI & ML) student driven by curiosity and innovation. I love building things that blend logic with creativity — from intelligent software to sleek, functional designs. With a mindset rooted in questioning everything and learning constantly, I strive to master the art of programming and artificial intelligence. Whether it’s coding, designing, or exploring new tech trends, I’m all about turning ideas into impact. My journey is just beginning, but every line of code I write brings me closer to shaping the future I envision.
            </p>
            
           
            
            <p className="text-lg">Thanks for visiting!</p>
          </div>

          <div className="mt-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              Learn more
            </Button>
          </div>
        </div>

        {/* Recent Section */}
        <section id="recent" className="mt-24" data-aos="fade-up">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold mb-8">Recently updated</h2>
      <div className="mb-8">
        <Button size="sm" onClick={() => fetchRepos()} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>
    </div>
          
          <div className="space-y-6">
            {loadingRepos ? (
              <p className="text-muted-foreground">Loading repositories…</p>
            ) : repoError ? (
              <>
                <p className="text-destructive">Error: {repoError}</p>
                <p className="text-muted-foreground">Try clicking Refresh or check the console for details.</p>
              </>
            ) : recentRepos.length === 0 ? (
              <p className="text-muted-foreground">No repositories found.</p>
            ) : (
              recentRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                      {repo.name}
                    </h3>
                    <time className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(repo.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  {repo.description && <p className="text-sm text-muted-foreground mt-1">{repo.description}</p>}
                </a>
              ))
            )}
          </div>
        </section>

        
      </main>

      {/* Back to Top
      <div className="fixed bottom-8 right-8">
        <a 
          href="#" 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-muted transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </a>
      </div> */}
    </div>
  );
};

export default Index;
