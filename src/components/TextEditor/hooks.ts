import {
  Editor,
  RichUtils,
  EditorState,
  DraftBlockType,
  DraftInlineStyleType,
} from "draft-js";
import { useCallback, useContext, MouseEvent, useRef, RefObject } from "react";
import { TextEditorContext } from "./TextEditorContext";

export function useFocusEditor(): [RefObject<Editor>, () => void] {
  const editorRef = useRef<Editor>(null);
  const focusEditor = useCallback(
    () => editorRef.current?.focus(),
    [editorRef]
  );

  return [editorRef, focusEditor];
}

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

export function useToggleLink(): (url: string) => void {
  const [editorState, setEditorState] = useContext(TextEditorContext);

  return useCallback(
    (url: string) => {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        "LINK",
        "MUTABLE",
        { url }
      );

      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });

      const newState = RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      );

      setEditorState(newState);
    },
    [editorState]
  );
}
