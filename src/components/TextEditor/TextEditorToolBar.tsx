import React from "react";
import { TextEditorToolBarAction as Action } from "./TextEditorToolBarAction";
import "./TextEditorToolBar.css";

export function TextEditorToolBar(): JSX.Element {
  return (
    <div className="TextEditorToolBar">
      <Action inlineStyle="BOLD">B</Action>
      <Action inlineStyle="ITALIC">
        <i>I</i>
      </Action>
      <Action inlineStyle="STRIKETHROUGH">ST</Action>
      <Action inlineStyle="UNDERLINE">
        <u>U</u>
      </Action>
      <Action inlineStyle="CODE">Code</Action>
    </div>
  );
}
