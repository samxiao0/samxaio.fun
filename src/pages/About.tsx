import Nav from "@/components/Nav";

export default function About() {
  return (
    <div>
      <Nav />
      <main id="main-content" className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-bold mb-6">About</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-xl leading-relaxed mb-6 font-medium">
            Hey! I'm Sam Xiao, a computer science student who's obsessed with AI and building practical apps. Currently in my third year of B.Tech CSE (AI & ML) at Annamacharya Institute of Technology & Sciences, maintaining an 8.34 CGPA.
          </p>

          <p className="mb-6">
            <strong>What I love:</strong> Experimenting with different AI tools to create student-focused apps that actually solve real problems. I've built attendance systems, object detection software, and student association websites. Right now, I'm deep into web development and learning to set up my own servers — because nothing beats the freedom of controlling your own infrastructure!
          </p>

          <p className="mb-6 text-muted-foreground">
            This site is my playground for projects and ideas. Check out my work, grab my resume, or let's collaborate on something cool. I'm always up for a chat about AI, web dev, or that next big idea.
          </p>

          <div className="bg-card p-6 rounded-lg border mt-8">
            <h3 className="text-xl font-semibold mb-3">Quick Facts</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>🎓 8.34 CGPA in B.Tech CSE (AI & ML)</li>
              <li>🏫 Annamacharya Institute of Technology & Sciences, Kadapa</li>
              <li>🤖 AI enthusiast & app builder</li>
              <li>🎓 Student app specialist</li>
              <li>🖥️ Learning server management</li>
              <li>🌐 Web development focused</li>
              <li>🤝 Open to collaborations</li>
            </ul>
          </div>
        </div>
       
      </main>
    </div>
  );
}
