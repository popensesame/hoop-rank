import React from 'react';
import { useState, useEffect } from 'react'
import LeftPositionedTimeline from './Timeline';
import './App.css'
import { Team } from './models/team';

import Uploader from './Uploader';
import UploadPage from './UploadPage';
import EvaluatePage from './EvaluatePage';
import ResultsPage from './ResultsPage';

const computeScore = (team) => {
  const games = team.games;
  try {
    //const winsAtHome = Number(games.wins.home.percentage);
    //const winsAway = Number(games.wins.away.percentage);
    const winPercent = Number(games.wins.all.percentage);
    return winPercent;
  } catch (err) {
    console.error(`Error computing score for team ${team.name}`);
  }
}

function App() {

  const [pageName, setPageName] = useState('upload');
  const [teamNames, setTeamNames] = useState(null);
  const [teams, setTeams] = useState(null);

  // get top four teams from local storage
  const topFourTeams = localStorage.getItem('topFourTeams');
  if (topFourTeams && !teams) {
    const topFour = JSON.parse(topFourTeams);
    const teams = topFour.map((team) => new Team(team.name, team.score));
    setTeams(teams);
  }

  useEffect(() => {
    const analyzeTeams = async () => {
      if (Array.isArray(teamNames)) {
        setPageName('evaluate');
        const teams = [];
        for (const teamName of teamNames) {
          const team = new Team(teamName);
          await team.getStats();
          const score = computeScore(team);
          team.score = score;
          teams.push(team);
        }
        const topFour = teams.sort((a, b) => b.score - a.score).slice(0, 4);
        setTeams(topFour);
        localStorage.setItem('topFourTeams', JSON.stringify(topFour)); // Store topFour in local storage
      }
    };
    analyzeTeams();
  }, [teamNames]);

  useEffect(() => {
    if (teams && teams.length) {
      setPageName('results');
    }
  }, [teams]);

  useEffect(() => {
    console.log(`Page name: ${pageName}`);
  }, [pageName])

  return (
    <div id="base">
      <LeftPositionedTimeline pageName={ pageName } />
      <div className="pane">
        {
          pageName === "upload" && <UploadPage setPageName={setPageName} />
        }
        {
          pageName === "evaluate" && <EvaluatePage setPageName={setPageName} />
        }
        {
          pageName === "results" && <ResultsPage teams={teams} />
        }
      </div>
      <Uploader setTeamNames={setTeamNames} />
    </div>
  );
}

export default App
