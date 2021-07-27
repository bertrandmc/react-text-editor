import React, { createContext } from "react";
import { TextEditorContextProps } from "./types";
import { usePersistentEditorState } from "./hooks";

interface Props {
  children: React.ReactNode;
}

export const TextEditorContext = createContext<TextEditorContextProps>(
  [] as unknown as TextEditorContextProps
);

export function TextEditorContextProvider({ children }: Props): JSX.Element {
  const state = usePersistentEditorState("123abc");

  return (
    <TextEditorContext.Provider value={state}>
      {children}
    </TextEditorContext.Provider>
  );
}
