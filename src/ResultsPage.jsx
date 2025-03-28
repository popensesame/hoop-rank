import React from "react";

export default function ResultsPage({ teams }) {

  console.log(`Teams: ${teams.length}`);

  return <>
    <div>Results</div>
    <div>
      {teams.map(team => (
        <div key={team.name}>
          <div>{team.name}</div>
          <div>{team.score}</div>
        </div>
      ))}
    </div> 
  </>
}