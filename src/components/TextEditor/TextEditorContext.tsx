import React, { createContext, useState } from "react";
import { EditorState } from "draft-js";
import { decorator } from "./decorator";

type SetEditorState = React.Dispatch<React.SetStateAction<EditorState>>;

type TextEditorContextProps = [EditorState, SetEditorState];

interface Props {
  children: React.ReactNode;
}

export const TextEditorContext = createContext<TextEditorContextProps>(
  [] as unknown as TextEditorContextProps
);

export function TextEditorContextProvider({ children }: Props): JSX.Element {
  const state = useState(() => EditorState.createEmpty(decorator));

  return (
    <TextEditorContext.Provider value={state}>
      {children}
    </TextEditorContext.Provider>
  );
}
