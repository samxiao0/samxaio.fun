import Nav from "@/components/Nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Resume() {
  return (
    <div>
      <Nav />
      <main id="main-content" className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Sam Xiao</h1>
          <p className="text-xl text-muted-foreground mb-4">CSE(AI&ML) Student | AI & ML Enthusiast</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground items-center">
            <span>📧 syedsame2244@gmail.com</span>
            <span>📱 +91 9951970441</span>
            <a href="https://www.samxiao.fun/"><span aria-brailleroledescription="website">🌐 samxiao.fun</span></a>
            <span>📍 KADAPA, AP</span>
            <a
              href="/resume.pdf"
              download="Samxiao_Resume.pdf"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              📄 Download Resume
            </a>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Passionate computer science student specializing in Artificial Intelligence and Machine Learning.
                Experienced in full-stack development with modern web technologies. Strong foundation in data analysis,
                algorithm design, and software engineering principles. Eager to apply technical skills to solve real-world problems.
              </p>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg">Bachelor of Technology (B.Tech) — Computer Science & Engineering (AI & ML)</h3>
                  <p className="text-primary font-medium">Annamacharya Institute of Technology & Sciences (AITS), Kadapa</p>
                  
                  <p className="text-muted-foreground">2023 – 2027 (Present)</p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">Current CGPA: 8.34</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Highlights:</strong> Coursework in Artificial Intelligence, Machine Learning, Data Structures, and Web Development.
                    Built real-world projects including an Attendance Management System, Student Association Website, and Object Detection Software.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Senior Secondary (Class XII) — PCMB</h3>
                  <p className="text-primary font-medium">Kendriya Vidyalaya, Kadapa</p>
                  <p className="text-muted-foreground">Central Board of Secondary Education (CBSE)</p>
                  <p className="text-muted-foreground">Completed in 2022</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Secondary School (Class X)</h3>
                  <p className="text-primary font-medium">Montesorrie Indus School, Kurnool</p>
                  <p className="text-muted-foreground">Central Board of Secondary Education (CBSE)</p>
                  <p className="text-muted-foreground">Completed in 2020</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                     <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Java</Badge>
                    <Badge variant="secondary">C++</Badge>
                    <Badge variant="secondary">SQL</Badge> 
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Frameworks & Libraries</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">Express.js</Badge>
                    <Badge variant="secondary">TensorFlow</Badge>
                    <Badge variant="secondary">PyTorch</Badge>
                    <Badge variant="secondary">Scikit-learn</Badge>
                    <Badge variant="secondary">Pandas</Badge>
                    <Badge variant="secondary">NumPy</Badge> 
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                     <Badge variant="secondary">Git</Badge>
                    <Badge variant="secondary">Docker</Badge>
                    <Badge variant="secondary">AWS</Badge>
                    <Badge variant="secondary">MongoDB</Badge>
                    <Badge variant="secondary">PostgreSQL</Badge>
                    <Badge variant="secondary">Linux</Badge>
                    <Badge variant="secondary">VS Code</Badge> 
                  </div>
                </div>
              </div>
            </CardContent> */}
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg">Software Engineering Intern</h3>
                  <p className="text-primary font-medium">Tech Company Name</p>
                  <p className="text-muted-foreground">June 2024 - August 2024</p>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
                    <li>Developed and maintained web applications using React and TypeScript</li>
                    <li>Implemented machine learning models for data analysis and prediction</li>
                    <li>Collaborated with cross-functional teams in agile development environment</li>
                    <li>Optimized application performance and improved user experience</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Research Assistant</h3>
                  <p className="text-primary font-medium">University AI Lab</p>
                  <p className="text-muted-foreground">January 2024 - Present</p>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
                    <li>Conducted research on computer vision algorithms for autonomous systems</li>
                    <li>Developed Python scripts for data preprocessing and model training</li>
                    <li>Published findings in university research journal</li>
                    <li>Mentored junior students in machine learning concepts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Freelance Developer</h3>
                  <p className="text-primary font-medium">Self-Employed</p>
                  <p className="text-muted-foreground">2023 - Present</p>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
                    <li>Built custom web applications for small businesses using modern technologies</li>
                    <li>Developed responsive websites with React, Next.js, and Tailwind CSS</li>
                    <li>Implemented e-commerce solutions with payment integration</li>
                    <li>Maintained 99% client satisfaction rate through effective communication</li>
                  </ul>
                </div>
              </div>
            </CardContent> */}
          </Card>  

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Key Projects</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">AI-Powered Chatbot</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Developed an intelligent chatbot using NLP techniques and transformer models.
                    Features include sentiment analysis, intent recognition, and multi-language support.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">TensorFlow</Badge>
                    <Badge variant="outline">Flask</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Personal Portfolio Website</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Built a responsive portfolio website showcasing projects and skills.
                    Implemented dark/light theme toggle and smooth animations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Tailwind CSS</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Data Visualization Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Created an interactive dashboard for analyzing sales data with real-time updates.
                    Integrated multiple data sources and implemented advanced filtering capabilities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Pandas</Badge>
                    <Badge variant="outline">Plotly</Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                For more detailed project information, visit the <a href="/projects" className="text-primary hover:underline">Projects</a> page.
              </p>
            </CardContent> */}
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">AWS Certified Cloud Practitioner</h4>
                  <p className="text-sm text-muted-foreground">Amazon Web Services • 2024</p>
                </div>
                <div>
                  <h4 className="font-medium">Google Data Analytics Professional Certificate</h4>
                  <p className="text-sm text-muted-foreground">Google • 2023</p>
                </div>
                <div>
                  <h4 className="font-medium">Deep Learning Specialization</h4>
                  <p className="text-sm text-muted-foreground">Coursera • 2023</p>
                </div>
              </div>
            </CardContent> */}
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">English</span>
                  <br></br>
                  <span className="text-muted-foreground ml-2">• Native</span>
                </div>
                <div>
                  <span className="font-medium">Mandarin Chinese</span>
                  <br></br>
                  <span className="text-muted-foreground ml-2">• Fluent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
