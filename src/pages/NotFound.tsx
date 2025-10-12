import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "@/components/Nav";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Nav />
      <main id="main-content" className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center py-20">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
