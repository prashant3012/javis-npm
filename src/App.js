import React from "react";
import { UploadFile, TemplateDownload, XLSXExport } from "./lib";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TemplateDownload />
      <UploadFile />
      {/* <XLSXExport /> */}
    </div>
  );
}

export default App;
