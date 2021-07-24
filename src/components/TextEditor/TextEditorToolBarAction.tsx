import React from "react";
import { DraftBlockType, DraftInlineStyleType } from "draft-js";
import { useToggleBlockType, useToggleInlineStyle } from "./hooks";

interface Props {
  children: React.ReactNode;
  inlineStyle?: DraftInlineStyleType;
  blockType?: DraftBlockType;
}

export function TextEditorToolBarAction({
  children,
  inlineStyle,
  blockType,
}: Props): JSX.Element {
  let toggler;

  if (inlineStyle !== undefined) {
    toggler = useToggleInlineStyle(inlineStyle);
  } else if (blockType !== undefined) {
    toggler = useToggleBlockType(blockType);
  }

  return (
    <div className="TextEditorToolBarAction" onClick={toggler}>
      {children}
    </div>
  );
}
