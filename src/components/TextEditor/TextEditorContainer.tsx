import React from "react";
import { TextEditorContextProvider } from "./TextEditorContext";
import { TextEditorToolBar } from "./TextEditorToolBar";
import { TextEditor } from "./TextEditor";

export function TextEditorContainer(): JSX.Element {
  return (
    <div className="TextEditorContainer">
      <TextEditorContextProvider>
        <TextEditorToolBar />
        <TextEditor />
      </TextEditorContextProvider>
    </div>
  );
}
