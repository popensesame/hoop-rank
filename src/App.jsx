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

  useEffect(() => {
    const analyzeTeams = async () => {
      if (Array.isArray(teamNames)) {
        setPageName('evaluate');
        const teams = [];
        for (const teamName of teamNames) {
          const team = new Team(teamName);
          const score = computeScore(team);
          team.score = score;
          teams.push(team);
        }
        setTeams(teams);
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
      <LeftPositionedTimeline setPageName={setPageName} />
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
  )
}

export default App
