import { Button } from "@/components/ui/button";
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="p-6 w-full flex items-center  justify-center sm:justify-between">
      <div className="hidden sm:block">
        <Logo />
      </div>
      <div className="flex items-center gap-x-2  text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
