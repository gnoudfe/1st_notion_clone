"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useRef, useState } from "react";

interface TitleProps {
  initalData: Doc<"documents">;
}

const Title = ({ initalData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.document.update);
  const [isEditting, setIsEditting] = useState(false);
  const [title, setTitle] = useState(initalData.title || "New note");

  const enableInput = () => {
    setTitle(initalData.title);
    setIsEditting(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current?.value.length);
    }, 0);
  };

  const disabledInput = () => {
    setIsEditting(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initalData._id,
      title: event.target.value || "Untitlted",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disabledInput();
    }
  };
  return (
    <div className="flex items-center gap-x-1">
      {!!initalData.icon && <p>{initalData.icon}</p>}

      {isEditting ? (
        <Input
          ref={inputRef}
          className="h-7 px-2 focus:visited:ring-transparent"
          onClick={enableInput}
          onBlur={disabledInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
        />
      ) : (
        <Button
          onClick={enableInput}
          variant={"ghost"}
          size={"sm"}
          className="font-normal h-auto p-1"
        >
          <span className="truncate"> {initalData.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;
