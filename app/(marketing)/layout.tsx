import React from "react";
import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MarketingLayout;
