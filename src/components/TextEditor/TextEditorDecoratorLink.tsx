import React, { ReactNode, useCallback } from "react";
import { ContentState, DraftDecorator } from "draft-js";
import "./TextEditorDecoratorLink.css";

interface Props {
  contentState: ContentState;
  children: ReactNode;
  entityKey: string;
}

export function TextEditorDecoratorLink(props: Props): JSX.Element {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  const openLink = useCallback(
    (event) => {
      event.preventDefault();
      window.open(url, "_blank");
    },
    [url]
  );

  return (
    <a
      href={url}
      title={url}
      onClick={openLink}
      target="_blank"
      rel="noreferrer"
      className="TextEditorDecoratorLink"
    >
      {props.children}
    </a>
  );
}

export const findLinkEntities: DraftDecorator["strategy"] = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};
