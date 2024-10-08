"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React from "react";
import Navigation from "./_components/Navigation";
import Spinner from "@/components/Spinner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated , isLoading} = useConvexAuth();
  if(isLoading) {
    return (
        <div className='h-screen flex items-center justify-center  dark:bg-[#191919]'>
            <Spinner />
        </div>
    )
  }
  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="h-screen flex dark:bg-[#191919]">
      <Navigation />
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
