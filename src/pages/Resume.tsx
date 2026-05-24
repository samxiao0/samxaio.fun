import Nav from "@/components/Nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Resume() {
  return (
    <div>
      <Nav />
      <main id="main-content" className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">SYED MOHAMMAD SAMEER</h1>
          <p className="text-sm text-muted-foreground mb-2">Kadapa, Andhra Pradesh, India – 516001</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground items-center mb-3">
            <span>📧 <a className="text-primary hover:underline" href="mailto:syedsame2244@gmail.com">syedsame2244@gmail.com</a></span>
            <span>📞 +91 9951970441</span>
            <span>🔗 <a className="text-primary hover:underline" href="https://github.com/samxiao0">github.com/samxiao0</a></span>
            <span>🔗 <a className="text-primary hover:underline" href="https://www.linkedin.com/in/samxiao0">linkedin.com/in/samxiao0</a></span>
            <span>🌐 <a className="text-primary hover:underline" href="https://samxiao.me">samxiao.me</a></span>
          </div>
          <a
            href="/resume.pdf"
            download="SYED_MOHAMMAD_SAMEER_Resume.pdf"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            📄 Download Resume
          </a>
        </div>

        <div className="grid gap-6">
          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                AI & ML undergraduate with hands-on experience in developing full-stack web applications and AI-powered systems using Python, React, Firebase, and Computer Vision technologies. Built and deployed practical solutions including attendance automation systems, civic issue reporting platforms, and AI-powered detection applications. Strong interest in software engineering, real-time systems, and scalable application development.
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
              <CardTitle>Technical Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                <li>Developed and deployed multiple full-stack web applications using React, TypeScript, Firebase, and Supabase.</li>
                <li>Experience building AI-powered systems using Computer Vision, YOLOv7, and real-time image analysis workflows.</li>
                <li>Built geolocation-enabled and realtime-enabled systems with modern web technologies and cloud services.</li>
                <li>Led technical events and student coordination activities as President of ThinkBotz.</li>
                <li>Experimented with LLaMA-based conversational AI assistant customization and AI automation workflows.</li>
              </ul>
            </CardContent>
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
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold">BunkMaar – Student Attendance Management System</h4>
                  <p className="mt-1">Tech Stack: React, TypeScript, Vite, Tailwind CSS, Zustand, Firebase, Recharts, PWA</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Developed a PWA-ready student attendance platform using React, TypeScript, Zustand, and Firebase for real-time attendance management.</li>
                    <li>Implemented timetable, calendar, subject analytics, and attendance prediction features to estimate required attendance percentages.</li>
                    <li>Designed responsive mobile-first interfaces with dark/light themes and offline-capable PWA functionality.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Civic Eye – AI Civic Issue Reporting Platform (Ongoing)</h4>
                  <p className="mt-1">Tech Stack: React, TypeScript, Supabase, Deno, Tailwind CSS, React-Leaflet, AI/ML</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Built a full-stack civic issue reporting platform using React, TypeScript, Supabase, and Deno serverless functions for real-time issue management.</li>
                    <li>Implemented live camera-based location capture with EXIF GPS extraction and reverse geolocation for accurate automatic area tagging.</li>
                    <li>Developed AI-powered image analysis workflows to classify issue type, department, and priority using structured AI responses.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Group Photo Attendance System (Ongoing)</h4>
                  <p className="mt-1">Tech Stack: Python, Computer Vision, AI/ML</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Building a two-stage pipeline using face detection and face recognition models for automated attendance systems.</li>
                    <li>Researching optimization strategies for multi-face recognition and automated attendance processing.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
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
                  <br />
                  <span className="text-muted-foreground ml-2">• Native</span>
                </div>
                <div>
                  <span className="font-medium">Hindi</span>
                  <br />
                  <span className="text-muted-foreground ml-2">• Fluent</span>
                </div>
                <div>
                  <span className="font-medium">Telugu</span>
                  <br />
                  <span className="text-muted-foreground ml-2">• Native</span>
                </div>
                <div>
                  <span className="font-medium">Urdu</span>
                  <br />
                  <span className="text-muted-foreground ml-2">• Conversational</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
