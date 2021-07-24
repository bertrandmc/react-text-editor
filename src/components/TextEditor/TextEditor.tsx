import React, { useState, useRef, useCallback, useEffect } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "./TextEditor.css";

export function TextEditor(): JSX.Element {
  const editorEl = useRef<Editor>(null);
  const focusEditor = useCallback(() => editorEl.current?.focus(), []);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => focusEditor());

  return (
    <div className="TextEditor" onClick={focusEditor}>
      <Editor
        ref={editorEl}
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
  );
}
