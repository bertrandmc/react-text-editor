import React, { useContext, useEffect } from "react";
import { Editor } from "draft-js";
import { useFocusEditor } from "./hooks";
import { TextEditorContext } from "./TextEditorContext";
import "draft-js/dist/Draft.css";
import "./TextEditor.css";

export function TextEditor(): JSX.Element {
  const [editorState, setEditorState, loading] = useContext(TextEditorContext);
  const [editorRef, focusEditor] = useFocusEditor();

  useEffect(() => focusEditor(), []);

  return (
    <div className="TextEditor" onClick={focusEditor}>
      {loading && <div className="TextEditor_loading">Loading...</div>}
      {!loading && (
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
        />
      )}
    </div>
  );
}
