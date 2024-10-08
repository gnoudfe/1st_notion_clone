"use client";

import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Spinner from "@/components/Spinner";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#191919] fixed top-0 flex items-center w-full p-6 justify-between max-h-[60px]",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button size="sm">
                Get Dotion Free
                <ArrowRight className="h-4 w-5 ml-2" />
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && <UserButton afterSignOutUrl="/" />}
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
