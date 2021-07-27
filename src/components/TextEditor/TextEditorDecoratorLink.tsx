import React, { ReactNode, useCallback } from "react";
import { ContentState, DraftDecorator } from "draft-js";

interface Props {
  contentState: ContentState;
  children: ReactNode;
  entityKey: string;
}

export function enforceHttps(string: string): string {
  return `https://${string.replace(/^https?:?\/?\/?/i, "")}`;
}

export function TextEditorDecoratorLink(props: Props): JSX.Element {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  const secureUrl = enforceHttps(url);
  const openLink = useCallback(
    (event) => {
      event.preventDefault();
      window.open(secureUrl, "_blank");
    },
    [url]
  );

  return (
    <a
      href={secureUrl}
      title={secureUrl}
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
