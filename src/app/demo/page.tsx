'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { CheckIcon } from '@heroicons/react/24/outline';

const demoFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  workEmail: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required'),
  teamSize: z.string().min(1, 'Please select team size'),
  useCase: z.string().min(10, 'Please describe your use case'),
  preferredTime: z.string().min(1, 'Please select preferred time'),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

const teamSizeOptions = [
  '1-5 people',
  '6-20 people',
  '21-50 people',
  '51-100 people',
  '100+ people',
];

const timeOptions = [
  'Morning (9 AM - 12 PM)',
  'Afternoon (12 PM - 5 PM)',
  'Evening (5 PM - 8 PM)',
  'Flexible',
];

const demoFeatures = [
  'Intake channels',
  'Routing',
  'Automations',
  'Portal',
  'Reporting',
];

export default function Demo() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
  });

  const onSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Demo booking data:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-6 py-32 sm:py-48 lg:px-8">
          <div className="text-center">
            <CheckIcon className="mx-auto h-12 w-12 text-green-600" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Demo Booked Successfully!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Thank you for your interest in ReplySystem. We&apos;ll be in touch within 24 hours to schedule your personalized demo.
            </p>
            <p className="mt-4 text-base leading-7 text-gray-500">
              Check your email for confirmation details and next steps.
            </p>
            <div className="mt-10">
              <Button onClick={() => setIsSubmitted(false)}>
                Book Another Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-6 sm:py-8 lg:py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              See how it works
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Share your process&mdash;we&apos;ll show you how ReplySystem.com can save time from day one.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          {/* Demo Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Book Your Demo
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Fill out the form below and we&apos;ll schedule a personalized demonstration.
                </p>
              </div>

              <Input
                label="Name"
                placeholder="Your full name"
                {...register('name')}
                error={errors.name?.message}
              />

              <Input
                label="Work Email"
                type="email"
                placeholder="your.email@company.com"
                {...register('workEmail')}
                error={errors.workEmail?.message}
              />

              <Input
                label="Company"
                placeholder="Your company name"
                {...register('company')}
                error={errors.company?.message}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Team Size
                </label>
                <select
                  {...register('teamSize')}
                  className="block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-0 sm:text-sm transition-colors duration-200"
                >
                  <option value="" className="text-gray-500">How many people are on your team?</option>
                  {teamSizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.teamSize && (
                  <p className="text-sm text-red-600">{errors.teamSize.message}</p>
                )}
              </div>

              <Textarea
                label="Use Case"
                placeholder="Describe your current support process, challenges, and what you hope to achieve with ReplySystem..."
                rows={4}
                {...register('useCase')}
                error={errors.useCase?.message}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Time
                </label>
                <select
                  {...register('preferredTime')}
                  className="block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-0 sm:text-sm transition-colors duration-200"
                >
                  <option value="" className="text-gray-500">When works best for your demo?</option>
                  {timeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && (
                  <p className="text-sm text-red-600">{errors.preferredTime.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Booking Demo...' : 'Book Demo'}
              </Button>
            </form>
          </div>

          {/* Video and Demo Info */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Demo Process */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  How our demo works
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-black text-sm font-semibold">
                        1
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Schedule a call</h4>
                        <p className="text-sm text-gray-600">Pick a time that works for you</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-black text-sm font-semibold">
                        2
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Share your needs</h4>
                        <p className="text-sm text-gray-600">Tell us about your current process</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-black text-sm font-semibold">
                        3
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">See it in action</h4>
                        <p className="text-sm text-gray-600">Live walkthrough tailored to you</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What the Demo Covers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Demo Covers
                </h3>
                <ul className="space-y-3">
                  {demoFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-x-3">
                      <CheckIcon className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Info */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="text-base font-semibold text-yellow-900 mb-2">
                  What to expect
                </h4>
                <ul className="text-sm text-yellow-800 space-y-2">
                  <li>• 30-minute personalized demo</li>
                  <li>• See your use case in action</li>
                  <li>• Q&A with our team</li>
                  <li>• Custom pricing discussion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="pb-24"></div>
    </div>
  );
}


