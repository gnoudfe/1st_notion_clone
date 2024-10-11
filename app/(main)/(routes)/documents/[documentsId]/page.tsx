"use client";

import Cover from "@/components/Cover";
import Toolbar from "@/components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Edtior"), { ssr: false });
interface DocumentIdPageProps {
  params: {
    documentsId: Id<"documents">;
  };
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  const document = useQuery(api.document.getById, {
    documentId: params.documentsId,
  });

  const update = useMutation(api.document.update);

  const onChange = (content: string) => {
    update({
      id: params.documentsId,
      content: content,
    });
  };

  if (document === undefined || null) {
    return null;
  }
  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />

      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initalData={document} />
        <div>
          <Editor onChange={onChange} initialContent={document.content} />
        </div>
      </div>
    </div>
  );
}
