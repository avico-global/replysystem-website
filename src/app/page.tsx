import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  CogIcon,
  ChartBarIcon,
  InboxIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const benefits = [
    {
      icon: InboxIcon,
      title: "Unified Request Management",
      description:
        "Capture and organize all client requests from any channel in one centralized system.",
      details:
        "Email, web forms, chat, phone calls, and integrations all flow into a single, organized queue.",
      metric: "100% visibility",
    },
    {
      icon: CogIcon,
      title: "Intelligent Automation",
      description:
        "Reduce manual work with smart workflows that handle routine tasks automatically.",
      details:
        "Auto-assignment, deadline tracking, escalations, and custom triggers save hours every day.",
      metric: "75% time saved",
    },
    {
      icon: UserGroupIcon,
      title: "Branded Client Experience",
      description:
        "Provide clients with a professional, self-service portal that matches your brand.",
      details:
        "Custom branding, real-time updates, file sharing, and approval workflows in your colors.",
      metric: "40% fewer emails",
    },
    {
      icon: ChartBarIcon,
      title: "Actionable Analytics",
      description:
        "Make data-driven decisions with comprehensive reporting and real-time dashboards.",
      details:
        "Track response times, satisfaction scores, team performance, and business trends.",
      metric: "Real-time insights",
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security",
      description:
        "Keep your data safe with bank-level security and compliance standards.",
      details:
        "SOC 2 compliance, role-based access, audit trails, and data encryption built-in.",
      metric: "99.9% uptime",
    },
    {
      icon: ArrowTrendingUpIcon,
      title: "Scalable Growth",
      description:
        "Grow your business without growing your support headaches or team size.",
      details:
        "Handle 10x more requests with the same team through automation and efficiency.",
      metric: "10x capacity",
    },
  ];

  return (
    <div className="bg-white">
      {/* Enhanced Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-white via-yellow-50/30 to-yellow-100/50">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-yellow-400/5 to-yellow-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            {/* Main Headline */}
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
              <span className="block">Support That</span>
              <span className="block bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                Scales With You
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-gray-600 sm:text-2xl">
              Transform client support from chaos to clarity. ReplySystem
              centralizes requests, automates workflows, and delivers
              exceptional service experiences that grow with your business.
            </p>

            {/* Key Value Props */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span>30-day free trial</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link href="/register" className="group">
                <Button
                  size="xl"
                  className="relative overflow-hidden bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Trial
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Button>
              </Link>

              <Link href="/demo" className="group">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-2 border-gray-300 hover:border-yellow-500 hover:text-yellow-600 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Watch Demo
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Enhanced Key Benefits Section */}
      <div className="py-24 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-yellow-600">
              Key Benefits
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Transform your client support experience
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stop juggling emails, spreadsheets, and phone calls. Our platform
              centralizes everything so you can focus on delivering exceptional
              service that makes clients love working with you.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-xl hover:border-yellow-300 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Icon and Metric */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500 group-hover:bg-yellow-400 group-hover:scale-110 transition-all duration-300">
                      <benefit.icon
                        className="h-7 w-7 text-black"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                        {benefit.metric}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {benefit.description}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {benefit.details}
                    </p>
                  </div>

                  {/* Hover Effect Accent */}
                  <div className="absolute inset-x-0 -bottom-px h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-yellow-500">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Ready to Transform Your Client Support?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-yellow-900">
              Join hundreds of businesses already saving time and delighting
              clients with ReplySystem. Get a personalized demo tailored to your
              specific needs.
            </p>

            {/* Value Props */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center justify-center gap-x-2 text-yellow-900">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Free 30-day trial</span>
              </div>
              <div className="flex items-center justify-center gap-x-2 text-yellow-900">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Setup in under 1 week
                </span>
              </div>
              <div className="flex items-center justify-center gap-x-2 text-yellow-900">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">
                  No credit card required
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
              <Link href="/demo">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V7a3 3 0 01-3 3H6a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3z"
                    />
                  </svg>
                  Get a Live Demo
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-black text-black hover:bg-black hover:text-yellow-500"
                >
                  Talk to Sales
                </Button>
              </Link>
            </div>

            {/* Trust Signal */}
            <p className="mt-8 text-sm text-yellow-800">
              Trusted by successfull businesses • Average 4.9/5 rating • 24/7
              support included
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
