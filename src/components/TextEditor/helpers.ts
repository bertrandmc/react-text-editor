import { EditorState, convertToRaw } from "draft-js";
import firebase from "firebase/app";
import { decorator } from "./decorator";
import { documentsCollection } from "../../services/firestore";

export function createNewEditorState(): EditorState {
  return EditorState.createEmpty(decorator);
}

export async function createNewDocument(): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> {
  const editorState = createNewEditorState();
  const rawState = convertToRaw(editorState.getCurrentContent());
  return await documentsCollection.add({ editorState: rawState });
}
