import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useConverImage } from "@/hooks/useCoverImage";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}
const Cover = ({ url, preview }: CoverImageProps) => {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const coverImage = useConverImage();
  const removeCoverImage = useMutation(api.document.removeCoverImage);

  const onRemoveCoverImage = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    const promise = removeCoverImage({
      id: params.documentsId as Id<"documents">,
    });

    toast.promise(promise, {
      loading: "Deleting cover image...",
      success: "Deleted cover image!",
      error: "Failed to delete cover image",
    });
  };

  return (
    <div
      className={cn(
        "relative w-full group mt-[52px]",
        !url && "h-[10vh]",
        url && "bg-muted h-[35vh]"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2 transition">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemoveCoverImage}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="w-4 h-4 mr-2" />
            Remove cover
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
