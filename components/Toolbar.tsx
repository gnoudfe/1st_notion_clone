import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef, useRef, useState } from "react";
import { Button } from "./ui/button";
import TextareaAutoSize from "react-textarea-autosize";
import { ImageIcon, Smile, X } from "lucide-react";
import { IconPicker } from "./IconPicker";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useConverImage } from "@/hooks/useCoverImage";

interface ToolbarProps {
  initalData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initalData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditting, setIsEditting] = useState(false);
  const [value, setValue] = useState(initalData.title);
  const update = useMutation(api.document.update);
  const removeIcon = useMutation(api.document.removeIcon);

  const coverImage = useConverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditting(true);
    setTimeout(() => {
      setValue(initalData.title);
      inputRef.current?.focus();
    }, 0);
  };
  const disableInput = () => setIsEditting(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initalData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initalData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initalData._id,
    });
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initalData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initalData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initalData && preview && (
        <p className="text-6xl pt-6">{initalData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initalData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initalData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size="sm"
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="h-4-w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditting && !preview ? (
        <TextareaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <h4
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none  text-[#3f3f3f] dark:text-[#cfcfcf]"
        >
          {initalData.title}
        </h4>
      )}
    </div>
  );
};

export default Toolbar;
