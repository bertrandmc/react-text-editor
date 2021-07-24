import React from "react";
import { DraftInlineStyleType } from "draft-js";
import { useToggleInlineStyle } from "./hooks";
import "./TextEditorToolBarAction.css";

interface Props {
  children: React.ReactNode;
  inlineStyle: DraftInlineStyleType;
}

export function TextEditorToolBarAction({
  children,
  inlineStyle,
}: Props): JSX.Element {
  const toggleStyle = useToggleInlineStyle(inlineStyle);

  return (
    <div className="TextEditorToolBarAction" onClick={toggleStyle}>
      {children}
    </div>
  );
}
