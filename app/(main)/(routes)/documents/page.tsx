"use client";

import Image from "next/image";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.document.create);

  const onCreate = () => {
    const promise = create({ title: "New note" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty-dark.png"
        alt="Empty"
        width="400"
        height="400"
        className="dark:block hidden"
      />
      <Image
        src="/empty.png"
        alt="Empty"
        width="400"
        height="400"
        className="dark:hidden block"
      />

      <h2 className="text-lg font-medium">Have a good day, {user?.fullName}</h2>
      <Button onClick={onCreate}>
        <PlusCircleIcon className="w-4 h-4 block mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
