import Head from "next/head";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Head>
        <title>Team Flow - Streamline Collaboration</title>
        <meta
          name="description"
          content="Manage teams with confidence. Track progress, collaborate seamlessly, and achieve goals together."
        />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-black bg-white shadow-md">
        <div className="container flex h-16 items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold text-black sketch-border p-2">
            Team Flow
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/login">
              <Button className="sketch-border">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button className="sketch-border bg-black text-white">Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-5xl font-extrabold text-black sketch-border p-4">Manage your teams with confidence</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-700">
          Streamline collaboration, track progress, and achieve goals together. The all-in-one platform for guides and students.
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/signup">
            <Button className="sketch-border bg-black text-white">
              Get Started <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="#features">
            <Button className="sketch-border">Learn more</Button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <div id="features" className="p-10 my-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative overflow-hidden rounded-lg border border-black bg-white p-6 shadow-md sketch-border hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 border border-black">
                <CheckCircle className="h-6 w-6 text-black" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-black sketch-border">{feature.title}</h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black py-6 text-center">
        <p className="text-sm text-gray-700">© {new Date().getFullYear()} Team Flow. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Features Data
const features = [
  {
    title: "Team Progress Tracking",
    description: "Monitor team performance and progress with intuitive dashboards and real-time updates.",
  },
  {
    title: "Guide & Student Roles",
    description: "Dedicated interfaces for guides and students with role-specific features and permissions.",
  },
  {
    title: "Collaborative Workspace",
    description: "Create, manage, and organize teams efficiently in a unified platform.",
  },
];

// Custom Sketch-Style Class
const sketchStyle = `
  .sketch-border {
    border: 2px solid black;
    box-shadow: 3px 3px 0px black;
    transition: transform 0.1s ease-in-out;
  }
  .sketch-border:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0px black;
  }
`;

export const GlobalStyles = () => <style>{sketchStyle}</style>;
