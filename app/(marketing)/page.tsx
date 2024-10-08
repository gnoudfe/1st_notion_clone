import React from "react";
import Heroes from "./_components/Heroes";
import Footer from "./_components/Footer";
import Content from "./_components/Content";

const MarketingPage = () => {
  return (
    <div className="flex flex-col h-screen  dark:bg-[#191919] ">
      <div className="flex flex-col item-center justify-center md:justify-start md:items-center text-center gap-y-8 flex-1 px-6 pb-10  mt-0 sm:mt-[60px] pt-0 sm:pt-6">
        <Content />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
