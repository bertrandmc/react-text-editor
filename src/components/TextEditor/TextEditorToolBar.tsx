import React from "react";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextEditorToolBarAction as Action } from "./TextEditorToolBarAction";
import { TextEditorToolBarActionLink as ActionLink } from "./TextEditorToolBarActionLink";

export function TextEditorToolBar(): JSX.Element {
  return (
    <div className="TextEditorToolBar">
      <Action inlineStyle="BOLD">
        <FontAwesomeIcon icon={fa.faBold} />
      </Action>
      <Action inlineStyle="ITALIC">
        <FontAwesomeIcon icon={fa.faItalic} />
      </Action>
      <Action inlineStyle="STRIKETHROUGH">
        <FontAwesomeIcon icon={fa.faStrikethrough} />
      </Action>
      <Action inlineStyle="UNDERLINE">
        <FontAwesomeIcon icon={fa.faUnderline} />
      </Action>
      <Action inlineStyle="CODE">
        <FontAwesomeIcon icon={fa.faCode} />
      </Action>
      <Action blockType="unordered-list-item">
        <FontAwesomeIcon icon={fa.faListUl} />
      </Action>
      <Action blockType="ordered-list-item">
        <FontAwesomeIcon icon={fa.faListOl} />
      </Action>
      <ActionLink />
    </div>
  );
}
