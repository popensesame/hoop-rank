import React from "react";
import './Uploader.css';

export default function Uploader({ setTeamNames }) {

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const teamNames = e.target.result.split('\n');
        setTeamNames(teamNames);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="uploader-container">
      <div className="uploader-content">
        <h1>pick</h1>
        <h1>rank</h1>
        <h1>DOMINATE</h1>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
    </div>
  );
}