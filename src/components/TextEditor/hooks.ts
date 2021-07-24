import {
  RichUtils,
  DraftInlineStyleType,
  Editor,
  DraftBlockType,
} from "draft-js";
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

export function useToggleBlockType(
  blockType: DraftBlockType
): (event: MouseEvent) => void {
  const [editorState, setEditorState] = useContext(TextEditorContext);

  return useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const newState = RichUtils.toggleBlockType(editorState, blockType);
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
