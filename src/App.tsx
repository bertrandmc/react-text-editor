import "@babel/polyfill";
import React from "react";
import { Documents } from "./components/Documents";
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App">
      <Documents />
    </div>
  );
}

export default App;
