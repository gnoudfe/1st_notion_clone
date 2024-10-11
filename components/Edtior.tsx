"use client"; // This registers <Editor> as a Client Component

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCallback } from "react";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (content: string) => void; // Remove undefined from type
  initialContent?: string;
  editable?: boolean;
}

export default function Editor({
  onChange,
  initialContent,
  editable = true, // Default to true if not provided
}: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });

    return response.url;
  };
  const editor: BlockNoteEditor | null = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  // Handle content changes
  const handleChange = useCallback(() => {
    console.log("runing");
    if (editor) {
      onChange(JSON.stringify(editor.document));
    }
  }, [editor, onChange]);

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={handleChange} // Pass the handleChange function
      editable={editable} // Pass the editable prop
    />
  );
}
