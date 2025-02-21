import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-20 pl-4">
            <span className="text-xl font-bold">Team Flow</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section
          className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 flex justify-center items-center"
        >
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Manage your teams with confidence
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Streamline collaboration, track progress, and achieve goals
              together. The all-in-one platform for guides and students.
            </p>
            <div className="space-x-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="container space-y-6 py-8 md:py-12 lg:py-24"
        >
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-lg border bg-background p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex h-14 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Team Flow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Team Progress Tracking",
    description:
      "Monitor team performance and progress with intuitive dashboards and real-time updates.",
  },
  {
    title: "Guide & Student Roles",
    description:
      "Dedicated interfaces for guides and students with role-specific features and permissions.",
  },
  {
    title: "Collaborative Workspace",
    description:
      "Create, manage, and organize teams efficiently in a unified platform.",
  },
];
