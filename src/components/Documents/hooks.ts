import { useCollection } from "react-firebase-hooks/firestore";
import { documentsCollection } from "../../services/firestore";
import firebase from "firebase/app";

export function useExistingDocumentsIds(): [
  string[] | undefined,
  boolean,
  firebase.FirebaseError | undefined
] {
  const [values, loading, error] = useCollection(documentsCollection);
  const ids = values?.docs.map((doc) => doc.id);
  return [ids, loading, error];
}
