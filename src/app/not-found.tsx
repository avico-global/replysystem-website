// app/not-found.tsx
"use client"
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* <Header /> */}

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-7xl font-bold text-destructive mb-4">404</h1>
            <h2 className="text-3xl font-bold text-foreground mb-3">Page Not Found</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* Helpful suggestions */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-4">Here are some helpful links:</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-primary hover:text-primary/80 transition font-medium"
                >
                  Go to Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition font-medium"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition font-medium"
                >
                  View Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Call to action button */}
          <Link
            href="/"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Return Home
          </Link>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
