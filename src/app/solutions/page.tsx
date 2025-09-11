"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useState } from "react";
import {
  InboxIcon,
  ArrowPathIcon,
  CogIcon,
  UserGroupIcon,
  LinkIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  ServerStackIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Solutions() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const coreFeatures = [
    {
      icon: InboxIcon,
      title: "Omnichannel Intake",
      description: "Capture requests from any channel in one unified system.",
      details:
        "Web forms, email forwarding, chat widgets, API integrations, and mobile submissions all flow into a single ticket queue.",
      benefits: ["Unified inbox", "No missed requests", "Consistent tracking"],
      color: "bg-yellow-500",
    },
    {
      icon: ArrowPathIcon,
      title: "Smart Routing",
      description: "Automatically assign tickets to the right team members.",
      details:
        "Route by department, priority level, client type, or custom rules. Load balancing ensures even distribution of work.",
      benefits: [
        "Faster response times",
        "Balanced workloads",
        "Expertise matching",
      ],
      color: "bg-yellow-500",
    },
    {
      icon: CogIcon,
      title: "Workflow Automations",
      description: "Reduce manual work with intelligent automation.",
      details:
        "Set up triggers for deadlines, escalations, notifications, and status updates. Create custom workflows for any process.",
      benefits: ["Time savings", "Consistency", "Never miss deadlines"],
      color: "bg-yellow-500",
    },
    {
      icon: UserGroupIcon,
      title: "Branded Client Portal",
      description: "Give clients self-service access with your branding.",
      details:
        "Clients can submit requests, track progress, approve work, and access resources through a fully branded portal.",
      benefits: [
        "Reduced support load",
        "Client satisfaction",
        "Professional image",
      ],
      color: "bg-yellow-500",
    },
    {
      icon: LinkIcon,
      title: "Powerful Integrations",
      description: "Connect with your existing tools seamlessly.",
      details:
        "Native integrations with email, calendar, storage, CRM, and productivity tools. Plus webhooks and API access.",
      benefits: ["Workflow continuity", "Data sync", "Tool consolidation"],
      color: "bg-yellow-500",
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security",
      description: "Bank-level security with granular access controls.",
      details:
        "Role-based permissions, audit trails, SSO support, and compliance with SOC 2, GDPR, and industry standards.",
      benefits: ["Data protection", "Compliance ready", "Access control"],
      color: "bg-yellow-500",
    },
  ];

  const useCases = [
    {
      icon: BuildingOfficeIcon,
      title: "Agencies",
      description: "Manage client requests and approvals.",
      benefits: [
        "Project tracking",
        "Client collaboration",
        "Approval workflows",
      ],
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Field Services",
      description: "Job tickets and mobile updates.",
      benefits: ["Mobile access", "Real-time updates", "Scheduling tools"],
    },
    {
      icon: ServerStackIcon,
      title: "B2B SaaS",
      description: "Priority SLAs and reporting.",
      benefits: ["SLA management", "Priority queues", "Analytics dashboard"],
    },
  ];

  const faqs = [
    {
      question: "How quickly can we get started with ReplySystem?",
      answer:
        "Most teams are up and running within 3-5 business days. Our setup includes data migration assistance, team training, and custom configuration to match your workflow. Enterprise clients with complex requirements may take 1-2 weeks for full deployment.",
      category: "Getting Started",
    },
    {
      question: "Can you migrate our existing support data?",
      answer:
        "Yes, we provide comprehensive data migration services. We can import your tickets, customer data, and conversation history from most popular platforms including Zendesk, Freshdesk, Intercom, and custom systems. Our team handles the technical details to ensure a smooth transition.",
      category: "Migration",
    },
    {
      question: "Is the client portal mandatory for all customers?",
      answer:
        "No, the client portal is completely optional. You can enable it for some clients and not others, or add it later as your needs evolve. Many businesses start with email-based support and gradually introduce the portal as they scale.",
      category: "Features",
    },
    {
      question: "What integrations are available?",
      answer:
        "ReplySystem integrates with popular tools including Slack, Microsoft Teams, Zapier, Google Workspace, Microsoft 365, and major CRM platforms. We also offer webhooks and a REST API for custom integrations. New integrations are added regularly based on customer requests.",
      category: "Integrations",
    },
    {
      question: "How does pricing work for multiple team members?",
      answer:
        "Our pricing is per active agent, not per total user. You can have unlimited read-only users (like managers or executives) at no extra cost. We offer volume discounts for teams of 10+ agents and custom enterprise pricing for larger organizations.",
      category: "Pricing",
    },
    {
      question: "What kind of reporting and analytics do you provide?",
      answer:
        "Our reporting includes response time metrics, resolution rates, customer satisfaction scores, agent performance, and ticket volume trends. You can create custom dashboards, schedule automated reports, and export data for external analysis. All reports are real-time and fully customizable.",
      category: "Analytics",
    },
    {
      question: "Is my data secure and compliant?",
      answer:
        "Yes, we maintain SOC 2 Type II compliance, GDPR compliance, and use enterprise-grade security including 256-bit SSL encryption, regular security audits, and data backup redundancy. Your data is hosted in secure, certified data centers with 99.9% uptime guarantee.",
      category: "Security",
    },
    {
      question: "Can I customize the look and feel for my clients?",
      answer:
        "Absolutely! You can fully brand the client portal with your logo, colors, and custom domain. The interface adapts to your brand guidelines, and you can customize email templates, notification messages, and even add custom fields specific to your business.",
      category: "Customization",
    },
    {
      question: "What happens if I need to cancel my subscription?",
      answer:
        "You can cancel anytime with 30 days notice. We provide full data export in standard formats (CSV, JSON) so you can migrate to another platform if needed. There are no cancellation fees, and you retain access to your data during the notice period.",
      category: "Account Management",
    },
    {
      question: "Do you offer training and onboarding support?",
      answer:
        "Yes, all plans include comprehensive onboarding with dedicated setup assistance, team training sessions, and ongoing support. We provide video tutorials, documentation, and live training sessions. Premium and Enterprise plans include dedicated customer success managers.",
      category: "Support",
    },
  ];

  // Filter FAQs based on search term
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-6 sm:py-8 lg:py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Solutions that fit your workflow
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you manage a few requests or hundreds, ReplySystem.com
              adapts to your process. Each business can customize how it
              supports its own clients.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Core Features Section */}
      <div className="py-24 sm:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-yellow-600">
              Core Features
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need in one platform
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Streamline your support operations with powerful features designed
              for modern businesses. Each feature is built to scale with your
              team and adapt to your unique workflow.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {coreFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg hover:border-yellow-300 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                      {feature.details}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <span
                          key={benefitIndex}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 group-hover:bg-yellow-100 group-hover:text-yellow-800 transition-colors"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Accent */}
                  <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-x-2 text-sm text-gray-600">
              <span>Want to see these features in action?</span>
              <Link
                href="/demo"
                className="font-semibold text-yellow-600 hover:text-yellow-500 transition-colors"
              >
                Book a demo →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-yellow-600">
              Use Cases
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built for your industry
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See how ReplySystem adapts to different business models and
              requirements.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <useCase.icon
                      className="h-5 w-5 flex-none text-yellow-600"
                      aria-hidden="true"
                    />
                    {useCase.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{useCase.description}</p>
                    <ul className="mt-4 space-y-2">
                      {useCase.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-x-2">
                          <ArrowRightIcon className="h-4 w-4 text-yellow-600" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Enhanced FAQ Section */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-yellow-600">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to know
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Get answers to common questions about ReplySystem. Can&apos;t find
              what you&apos;re looking for? Contact our support team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mt-12 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
            </div>
            {searchTerm && (
              <p className="mt-2 text-sm text-gray-600">
                Found {filteredFAQs.length} result
                {filteredFAQs.length !== 1 ? "s" : ""} for &ldquo;{searchTerm}
                &rdquo;
              </p>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="mx-auto mt-16 max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No FAQs found matching your search.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-yellow-600 hover:text-yellow-500 font-medium"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredFAQs.map((faq, index) => (
                  <div key={faq.question} className="py-6">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-start justify-between text-left"
                    >
                      <div className="flex-1">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full mb-2">
                          {faq.category}
                        </span>
                        <h3 className="text-lg font-semibold leading-7 text-gray-900 hover:text-yellow-600 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="ml-6 flex h-7 items-center">
                        {openFAQ === index ? (
                          <ChevronUpIcon className="h-6 w-6 text-yellow-600" />
                        ) : (
                          <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </button>
                    {openFAQ === index && (
                      <div className="mt-4 pr-12">
                        <p className="text-base leading-7 text-gray-600">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you get the most out of
                ReplySystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-500">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              See a tailored demo
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-yellow-900">
              Ready to see how these features work for your specific use case?
              Book a personalized demo today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/demo">
                <Button variant="secondary" size="lg">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
