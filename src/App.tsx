import "@babel/polyfill";
import React from "react";
import { TextEditor } from "./components/TextEditor";
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App">
      <TextEditor />
    </div>
  );
}

export default App;
