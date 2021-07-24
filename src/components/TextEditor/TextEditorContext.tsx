import React, { createContext, useState } from "react";
import { EditorState } from "draft-js";

interface Props {
  children: React.ReactNode;
}

type SetEditorState = React.Dispatch<React.SetStateAction<EditorState>>;

type TextEditorContextProps = [EditorState, SetEditorState];

export const TextEditorContext = createContext<TextEditorContextProps>(
  [] as unknown as TextEditorContextProps
);

export function TextEditorContextProvider({ children }: Props): JSX.Element {
  const state = useState(() => EditorState.createEmpty());

  return (
    <TextEditorContext.Provider value={state}>
      {children}
    </TextEditorContext.Provider>
  );
}
