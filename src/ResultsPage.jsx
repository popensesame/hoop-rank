import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function TeamRow({ team, num }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "300px",
        border: "1px solid gray",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Black with 50% opacity
        fontWeight: "bold",
        borderRadius: "25px / 50%", // Creates half-circle borders on the left and right
        minHeight: '55px',
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "50%", // Makes it a perfect circle
          margin: "5px",
        }}
      >
        {num}
      </div>

      <Typography variant="body1" sx={{ padding: '0 3px 0 3px', fontWeight: 'bold', fontSize: '20px', flexGrow: 1, textAlign: "center", color: "white" }}>
        {team.name.toUpperCase()}
      </Typography>
      <div
        style={{
          width: "55px",
          height: "55px",
          backgroundImage: `url(${team.logo})`,
          backgroundSize: "75%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "0 50% 50% 0", // Customize the border radius as needed
          backgroundColor: "white", // Optional: Add a background color
        }}
      ></div>

    </Box>
  );
}

export default function ResultsPage({ teams }) {
  const handleDownloadCSV = () => {
    // Generate CSV content
    const headers = ["Rank", "Team", "Win Rate in 2024/2025 Season"];
    const rows = teams.map((team, index) => [
      index + 1,
      team.name,
      team.score || "N/A",
    ]);
    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "teams.csv";
    link.click();
  };

  return (
    <div className="results-page">
      <div style={{ fontSize: '25px', paddingBottom: '20px', paddingTop: '20px' }}>The Ultimate Lineup</div>
      <div>
        {teams.map((team, index) => (
          <TeamRow key={index} num={index + 1} team={team} />
        ))}
      </div>
      {/* download button */}
      <button
        onClick={handleDownloadCSV}
        style={{
          padding: "10px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Download
      </button>
    </div>
  );
}