import {
  Editor,
  RichUtils,
  EditorState,
  convertToRaw,
  convertFromRaw,
  DraftBlockType,
  DraftInlineStyleType,
} from "draft-js";
import {
  useRef,
  useState,
  useEffect,
  RefObject,
  useContext,
  MouseEvent,
  useCallback,
} from "react";
import { documentsCollection } from "../../services/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { TextEditorContext } from "./TextEditorContext";
import { TextEditorContextProps } from "./types";
import { createNewEditorState } from "./helpers";

import * as jsondiffpatch from "jsondiffpatch";

const j = jsondiffpatch.create({});

export function useFocusEditor(): [RefObject<Editor>, () => void] {
  const editorRef = useRef<Editor>(null);
  const focusEditor = useCallback(() => {
    editorRef.current?.focus();
  }, [editorRef]);

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

export function usePersistentEditorState(
  documentId: string
): TextEditorContextProps {
  const [editorState, setEditorState] = useState(createNewEditorState);
  const [document, loading, error] = useDocument(
    documentsCollection.doc(`${documentId}`)
  );

  const setState = useCallback(
    (editorState) => {
      const rawLocalState = convertToRaw(editorState.getCurrentContent());
      const rawServerState = document?.data()?.editorState;
      const delta = j.diff(rawServerState, rawLocalState);

      if (delta) {
        const nextContentState = convertFromRaw(j.patch(rawLocalState, delta));
        const newState = EditorState.push(
          editorState,
          nextContentState,
          "apply-entity"
        );
        const rawNewState = convertToRaw(newState.getCurrentContent());

        documentsCollection
          .doc(documentId)
          .set({ editorState: rawNewState }, { merge: true });
      }

      setEditorState(editorState);
    },
    [document]
  );

  useEffect(() => {
    // apply remote changes
    const rawServerState = document?.data()?.editorState;

    if (document?.exists && !loading && rawServerState !== undefined) {
      const rawLocalState = convertToRaw(editorState.getCurrentContent());
      const delta = j.diff(rawLocalState, rawServerState);

      if (delta !== undefined) {
        const selectionState = editorState.getSelection();
        const nextContentState = convertFromRaw(j.patch(rawLocalState, delta));
        const newState = EditorState.push(
          editorState,
          nextContentState,
          "apply-entity"
        );

        setEditorState(EditorState.forceSelection(newState, selectionState));
      }
    }
  }, [document]);

  const isLoading = !document?.exists || loading;

  return [editorState, setState, isLoading, error];
}
