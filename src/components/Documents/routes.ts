export const routes = {
  document: "/documents/:documentId",
  documentsList: "/documents",
};

export function documentRoute(documentId: string): string {
  return routes.document.replace(":documentId", documentId);
}
