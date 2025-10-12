import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap } from "lucide-react";

const Index = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack online shopping experience with payment integration and real-time inventory management.",
      tags: ["React", "Node.js", "PostgreSQL"],
      link: "#"
    },
    {
      title: "AI Dashboard",
      description: "Analytics dashboard with machine learning insights and predictive modeling capabilities.",
      tags: ["TypeScript", "Python", "TensorFlow"],
      link: "#"
    },
    {
      title: "Mobile Fitness App",
      description: "Cross-platform fitness tracking application with personalized workout recommendations.",
      tags: ["React Native", "Firebase", "Redux"],
      link: "#"
    },
    {
      title: "Social Media Tool",
      description: "Content management platform for scheduling and analyzing social media posts across multiple channels.",
      tags: ["Vue.js", "Express", "MongoDB"],
      link: "#"
    }
  ];

  const skills = [
    { name: "React", icon: Code },
    { name: "TypeScript", icon: Code },
    { name: "Node.js", icon: Zap },
    { name: "UI/UX Design", icon: Palette },
    { name: "PostgreSQL", icon: Code },
    { name: "GraphQL", icon: Zap }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gradient">Portfolio</h2>
            <div className="hidden md:flex gap-8">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
              <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              Available for opportunities
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Creating Digital
              <span className="text-gradient block mt-2">Experiences</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Full-stack developer and designer passionate about building beautiful, functional, and user-centric digital experiences.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                <a href="#contact" className="flex items-center gap-2">
                  Get in Touch
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/80">
                <a href="#projects">View Projects</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-center">About Me</h2>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            <p>
              I'm a passionate developer with a keen eye for design and a love for creating seamless user experiences. 
              With expertise in modern web technologies, I transform complex problems into elegant solutions.
            </p>
            <p>
              My journey in tech has led me to work on diverse projects ranging from e-commerce platforms to AI-powered 
              applications. I believe in writing clean, maintainable code and designing interfaces that users love.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 card-hover group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <a 
                    href={project.link}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex}
                      variant="secondary"
                      className="bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card 
                  key={index}
                  className="p-6 bg-card border-border hover:border-primary/50 card-hover text-center group"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:glow-primary transition-all" />
                  <h3 className="font-semibold">{skill.name}</h3>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
            <Mail className="w-5 h-5 mr-2" />
            <a href="mailto:hello@example.com">hello@example.com</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
