import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Moon, ArrowUp } from "lucide-react";

const Index = () => {
  const recentPosts = [
    { title: "Building Scalable Systems", date: "2024-01-15" },
    { title: "Lessons from Technical Leadership", date: "2024-01-08" },
    { title: "DevOps Best Practices", date: "2023-12-20" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-lg font-semibold hover:text-primary transition-colors">
              Your Name
            </a>
            <div className="flex items-center gap-6">
              <a href="#about" className="text-sm hover:text-primary transition-colors">
                About
              </a>
              <a href="#recent" className="text-sm hover:text-primary transition-colors">
                Blog
              </a>
              <button 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        {/* Profile Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" 
              alt="Profile"
              className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-border"
            />
          </div>
          
          <h1 className="text-5xl font-bold mb-3">Your Name</h1>
          <p className="text-xl text-muted-foreground mb-6">Software Engineer</p>
          
          <div className="flex justify-center gap-4 mb-8">
            <a 
              href="mailto:hello@example.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com" 
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
              I'm a software engineer, technical leader, and problem-solver with 15+ years of experience 
              turning ideas into impactful technology. From starting as a founding engineer at a 7-person 
              startup to working at hyper-growth companies, I've built and scaled systems for fintech, 
              AI/ML, and data-driven products. Along the way, I've worn many hats — from backend, infosec, 
              and DevOps to data engineering and MLOps — crafting solutions that handle scale and drive value.
            </p>
            
            <p className="text-base leading-relaxed text-foreground/90">
              Always love tackling tough problems with a pragmatic approach, combining first-principles 
              thinking with practical execution. For me, leadership isn't about titles—it's about rolling 
              up my sleeves, mentoring others, and fostering a culture where collaboration, accountability, 
              and innovation thrive. Whether I'm building products from the ground up or aligning engineering 
              with business priorities, my focus is always on keeping things simple, solving problems 
              effectively, empowering teams and delivering results.
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
        <section id="recent" className="mt-24">
          <h2 className="text-3xl font-bold mb-8">Recent</h2>
          
          <div className="space-y-6">
            {recentPosts.map((post, index) => (
              <a 
                key={index}
                href="#"
                className="block group"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <time className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Tags Section */}
        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-4 text-muted-foreground">Tags</h3>
        </section>
      </main>

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
    </div>
  );
};

export default Index;
