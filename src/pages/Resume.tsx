import Nav from "@/components/Nav";

export default function Resume() {
  return (
    <div>
      <Nav />
      <main id="main-content" className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-bold mb-6">Resume</h1>
        <div className="space-y-4 text-muted-foreground">
          <p><strong>Education</strong>: B.Tech Computer Science &amp; Engineering (AI &amp; ML), 3rd Year</p>
          <p><strong>Skills</strong>: Python, TypeScript, React, Machine Learning, Data Analysis</p>
          <p><strong>Experience</strong>: Personal projects, hackathons and academic projects — check Projects for details.</p>
        </div>
      </main>
    </div>
  );
}
