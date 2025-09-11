'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { CheckIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  workEmail: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  companyCode: z.string().min(3, 'Company code must be at least 3 characters').optional().or(z.literal('')),
  inviteLink: z.string().url('Please enter a valid invite link').optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => data.companyCode || data.inviteLink, {
  message: "Please provide either a company code or invite link",
  path: ["companyCode"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinMethod, setJoinMethod] = useState<'code' | 'invite'>('code');

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // const watchCompanyCode = watch('companyCode');
  // const watchInviteLink = watch('inviteLink');

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Signup data:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleJoinMethodChange = (method: 'code' | 'invite') => {
    setJoinMethod(method);
    if (method === 'code') {
      setValue('inviteLink', '');
    } else {
      setValue('companyCode', '');
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-6 py-6 sm:py-8 lg:px-8">
          <div className="text-center">
            <CheckIcon className="mx-auto h-12 w-12 text-green-600" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Account Created!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your user account has been successfully created. Please check your email to verify your account before logging in.
            </p>
            <div className="mt-10">
              <Button onClick={() => window.location.href = '/login'}>
                Go to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <UserPlusIcon className="h-12 w-12 text-yellow-600" />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Join Your Team
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your account to join an existing ReplySystem workspace
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>

            <Input
              label="Work Email"
              type="email"
              {...register('workEmail')}
              error={errors.workEmail?.message}
            />

            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />

            <Input
              label="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            {/* Join Method Toggle */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900">
                  How would you like to join?
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="join-code"
                      name="join-method"
                      type="radio"
                      checked={joinMethod === 'code'}
                      onChange={() => handleJoinMethodChange('code')}
                      className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                    />
                    <label htmlFor="join-code" className="ml-2 block text-sm text-gray-900">
                      Company Code
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="join-invite"
                      name="join-method"
                      type="radio"
                      checked={joinMethod === 'invite'}
                      onChange={() => handleJoinMethodChange('invite')}
                      className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300"
                    />
                    <label htmlFor="join-invite" className="ml-2 block text-sm text-gray-900">
                      Invite Link
                    </label>
                  </div>
                </div>
              </div>

              {joinMethod === 'code' && (
                <Input
                  label="Company Code"
                  placeholder="Enter your company code"
                  {...register('companyCode')}
                  error={errors.companyCode?.message}
                />
              )}

              {joinMethod === 'invite' && (
                <Input
                  label="Invite Link"
                  placeholder="Paste your invite link here"
                  {...register('inviteLink')}
                  error={errors.inviteLink?.message}
                />
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Need to create a company workspace?{' '}
                <Link
                  href="/register"
                  className="font-semibold text-yellow-600 hover:text-yellow-700"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-yellow-900 mb-2">
              Need help joining?
            </h4>
            <ul className="text-xs text-yellow-800 space-y-1">
              <li>• Ask your admin for the company code</li>
              <li>• Check your email for an invite link</li>
              <li>• Contact support if you&apos;re having trouble</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


