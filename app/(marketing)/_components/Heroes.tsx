import Image from "next/image";
import React from "react";
const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] block dark:hidden h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px]">
          <Image
            priority
            src="/documents.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain w-full h-full"
            alt="hero image"
          />
        </div>
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] hidden dark:block">
          <Image
            priority
            src="/documents-dark.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain w-full h-full"
            alt="hero image"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
