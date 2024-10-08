"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Content = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl  space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, Documents, & Plans, Projects. Welcome to{" "}
        <span className="underline">Dontion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Dotion is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      <div>
        {isLoading && (
          <Button>
            <Spinner />
          </Button>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button size="sm">
              Get Dotion Free <ArrowRight className="h-4 w-5 ml-2" />
            </Button>
          </SignInButton>
        )}

        {isAuthenticated && !isLoading && (
          <Link href="/documents">
            <Button>
              Enter Dotion
              <ArrowRight className="h-4 w-5 ml-2" />
            </Button>
          </Link>
        )}
      </div>

      {/* <Button>
        {isLoading ? (
          <Spinner />
        ) : !isAuthenticated ? (
          <SignInButton mode="modal">
            <Button>Get Dotion Free</Button>
          </SignInButton>
        ) : (
          "Enter Dotion"
        )}
        {!isLoading && <ArrowRight className="h-4 w-5 ml-2" />}
      </Button> */}
    </div>
  );
};

export default Content;
