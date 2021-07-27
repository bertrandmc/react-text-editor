import React, { createContext } from "react";
import { TextEditorContextProps } from "./types";
import { usePersistentEditorState } from "./hooks";
import { useParams } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const TextEditorContext = createContext<TextEditorContextProps>(
  [] as unknown as TextEditorContextProps
);

export function TextEditorContextProvider({ children }: Props): JSX.Element {
  const { documentId } = useParams<{ documentId: string }>();
  const state = usePersistentEditorState(documentId);

  return (
    <TextEditorContext.Provider value={state}>
      {children}
    </TextEditorContext.Provider>
  );
}
