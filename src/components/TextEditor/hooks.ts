import { RichUtils, DraftInlineStyleType, Editor } from "draft-js";
import { useCallback, useContext, MouseEvent, useRef, RefObject } from "react";
import { TextEditorContext } from "./TextEditorContext";

export function useToggleInlineStyle(
  inlineStyle: DraftInlineStyleType
): (event: MouseEvent) => void {
  const [editorState, setEditorState] = useContext(TextEditorContext);

  return useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
      setEditorState(newState);
    },
    [editorState]
  );
}

export function useFocusEditor(): [RefObject<Editor>, () => void] {
  const editorRef = useRef<Editor>(null);
  const focusEditor = useCallback(
    () => editorRef.current?.focus(),
    [editorRef]
  );

  return [editorRef, focusEditor];
}
