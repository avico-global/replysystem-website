"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApi } from "@/lib/useApi";
import axios from "axios";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface VerifyResponse {
  domain?: string;
  supportMail?: string;
  message?: string;
  [key: string]: unknown;
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useParams();
  const { userId, token } = params as { userId: string; token: string };

  // Typed useApi so the response has a reasonable shape instead of `any`.
  const { callApi, loading } = useApi<VerifyResponse>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<VerifyResponse | null>(null);

  useEffect(() => {
    if (!userId || !token) return;

    const verifyEmail = async () => {
      try {
        const res = await callApi(
          `/auth/merchantVerification/${userId}/${token}`,
          undefined,
          "GET"
        );

        setSuccess(res as VerifyResponse);
      } catch (err: unknown) {
        // Normalize error extraction without using `any` by leveraging axios' type guard
        console.error("Email verification failed:", err);
        let msg = "Something went wrong";

        if (axios.isAxiosError(err)) {
          const data = err.response?.data as
            | { error?: string; message?: string }
            | undefined;
          msg = data?.error ?? data?.message ?? msg;
        } else if (
          typeof err === "object" &&
          err !== null &&
          "message" in err &&
          typeof (err as { message?: unknown }).message === "string"
        ) {
          msg = (err as { message?: unknown }).message as string;
        }

        setError(msg);
      }
    };

    verifyEmail();
  // include callApi in deps to satisfy the hooks rule; it is stable enough here
  }, [userId, token, router, callApi]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-md max-w-lg w-full p-8 text-center">
        {loading && <p className="text-gray-500">Verifying your email...</p>}

        {error && (
          <div className="flex flex-col items-center">
            <XCircleIcon className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Verification Failed</h2>
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && success && (
          <div className="flex flex-col items-center">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <CheckCircleIcon className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
            <p className="text-gray-500 mb-4">
              Your email has been successfully verified.
            </p>

            <div className="bg-gray-50 p-4 rounded-md text-left mb-4 w-full">
              <p className="mb-2">
                <strong>You may now proceed to login:</strong>
                <br />
                <span className="text-gray-400">
                  Your account is ready to use
                </span>
              </p>
              <p>
                <strong>Login credentials sent to your email:</strong>
                <br />
                <span className="text-gray-400">
                  Username and password included
                </span>
              </p>
            </div>

            <button
              onClick={() => success?.domain && router.push(success.domain)}
              className="bg-[#f0b100] text-black px-6 py-2 rounded-md hover:bg-yellow-600"
            >
              Proceed to Login
            </button>

            <p className="text-gray-400 text-sm mt-4">
              Check your email inbox for your login credentials if you haven&apos;t
              received them yet.{" "}
              {success?.supportMail && (
                <a
                  href={`mailto:${success.supportMail}`}
                  className="text-blue-500 underline hover:text-blue-700 transition"
                >
                  Contact Support
                </a>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
