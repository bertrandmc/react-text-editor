import React, { useCallback, useState, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useToggleLink } from "./hooks";

export function TextEditorToolBarActionLink(): JSX.Element {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const toggleLink = useToggleLink();
  const toggleShowLinkInput = useCallback(() => {
    setShowLinkInput(!showLinkInput);
  }, [showLinkInput]);

  const handleInputKeydown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        toggleLink(event.currentTarget.value);
        toggleShowLinkInput();
      } else if (event.key === "Escape") {
        toggleShowLinkInput();
      }
    },
    [toggleLink, toggleShowLinkInput]
  );

  return (
    <div className="TextEditorToolBarActionLink">
      <button className="TextEditorToolBarAction" onClick={toggleShowLinkInput}>
        <FontAwesomeIcon icon={faLink} />
      </button>
      {showLinkInput && (
        <div className="TextEditorToolBarActionLink_input-wrapper">
          <input
            autoFocus
            type="text"
            placeholder="https://..."
            onKeyDown={handleInputKeydown}
            className="TextEditorToolBarActionLink_input"
          />
        </div>
      )}
    </div>
  );
}
