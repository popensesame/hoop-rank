import React, { useState } from "react";

export default function Uploader({ setTeamNames }) {
  const [fileContent, setFileContent] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
        const teamNames = e.target.result.split('\n');
        setTeamNames(teamNames);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div className="pane">
        <h2>Upload CSV File</h2>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        {fileContent && (
          <div>
            <h3>File Content:</h3>
            <pre>{fileContent}</pre>
          </div>
        )}
      </div>
    </>
  );
}