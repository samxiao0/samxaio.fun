import Nav from "@/components/Nav";

export default function About() {
  return (
    <div>
      <Nav />
      <main id="main-content" className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-bold mb-6">About</h1>
        <div className="prose prose-invert">
          <p>
            Hello — I&apos;m SAMXIAO. I&apos;m a 3rd-year B.Tech CSE (AI &amp; ML) student who likes building projects that blend software engineering with machine learning. I enjoy learning new tools and shipping things that solve problems.
          </p>
          <p>
            This site is a small portfolio and playground for my projects and experiments. You can find recent updates on the home page and detailed project listings on the Projects page.
          </p>
        </div>
      </main>
    </div>
  );
}
