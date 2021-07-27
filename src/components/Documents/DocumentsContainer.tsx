import React from "react";
import { Documents } from "./Documents";
import { TextEditor } from "../TextEditor";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { routes } from "./routes";
import "./Documents.css";

export function DocumentsContainer(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path={routes.document}>
          <TextEditor />
        </Route>
        <Route path={routes.documentsList}>
          <div className="DocumentsContainer">
            <Documents />
          </div>
        </Route>
        <Route path="/">
          <Redirect to={routes.documentsList} />
        </Route>
      </Switch>
    </Router>
  );
}
