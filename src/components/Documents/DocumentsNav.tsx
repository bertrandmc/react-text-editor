import React, { useCallback, MouseEvent } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createNewDocument } from "../TextEditor/helpers";
import { useExistingDocumentsIds } from "./hooks";
import { documentRoute } from "./routes";

export function DocumentsNavContainer({
  history,
}: RouteComponentProps): JSX.Element {
  const [existingDocumentsIds, loading] = useExistingDocumentsIds();
  const createDocument = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault();
      const document = await createNewDocument();
      history.push(documentRoute(document.id));
    },
    [history]
  );

  return (
    <nav className="DocumentsNav">
      <ul>
        <li className="DocumentsNav_preview DocumentsNav_preview__new">
          <a onClick={createDocument}>
            <FontAwesomeIcon icon={faPlus} size="2x" />
            New Document
          </a>
        </li>
        {loading && (
          <li className="DocumentsNav_preview loading">Loading...</li>
        )}
        {existingDocumentsIds?.map((docId) => (
          <li className="DocumentsNav_preview" key={docId}>
            <Link to={`/documents/${docId}`}>Document {docId}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const DocumentsNav = withRouter(DocumentsNavContainer);
