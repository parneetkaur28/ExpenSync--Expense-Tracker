"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

function Hero() {
  const { isSignedIn } = useUser();

  return (
    <section className="bg-white flex items-center flex-col">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Manage Your Expenses
            <strong className="text-purple-500"> Control </strong>
            Your Budget
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
           <strong className="text-2xl"> ExpenSync </strong>~ A tool where your Wallet finds an account and balance!
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="inline-block rounded border border-purple-500 bg-purple-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-purple-600"
              >
                Take Me To Dashboard
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="inline-block rounded border border-purple-500 bg-purple-500 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-purple-600"
              >
                Get Started
              </Link>
            )}

            <a
              href="#"
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <Image
        src={"/dashboardnext.png"}
        alt="dashboard"
        width={1000}
        height={700}
        className="-mt-9 mx-auto rounded-xl border-2"
      />
    </section>
  );
}

export default Hero;
