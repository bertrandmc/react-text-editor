import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { TextEditorToolBarAction as Action } from "./TextEditorToolBarAction";
import "./TextEditorToolBar.css";

export function TextEditorToolBar(): JSX.Element {
  return (
    <div className="TextEditorToolBar">
      <Action inlineStyle="BOLD">
        <FontAwesomeIcon icon={faBold} />
      </Action>
      <Action inlineStyle="ITALIC">
        <FontAwesomeIcon icon={faItalic} />
      </Action>
      <Action inlineStyle="STRIKETHROUGH">
        <FontAwesomeIcon icon={faStrikethrough} />
      </Action>
      <Action inlineStyle="UNDERLINE">
        <FontAwesomeIcon icon={faUnderline} />
      </Action>
      <Action inlineStyle="CODE">
        <FontAwesomeIcon icon={faCode} />
      </Action>
    </div>
  );
}
