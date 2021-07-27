import { EditorState } from "draft-js";

type SetEditorState = React.Dispatch<React.SetStateAction<EditorState>>;
type IsLoading = boolean;

export type TextEditorContextProps = [
  EditorState,
  SetEditorState,
  IsLoading,
  Error | undefined
];
