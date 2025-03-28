#!/usr/bin/env node

import ApiClient from './api.js';
import fs from 'fs';

// Example usage
const apiClient = new ApiClient();

/*
apiClient.get("leagues", { country: "USA" })
  .then(data => console.log(data))
  .catch(error => console.error(error));
*/

/*
apiClient.getTeamStatsByName("Duke", "2021-2022")
  .then(data => {
    console.log(JSON.stringify(data, null, 2))
  })
  .catch(error => console.error(error))

fetch("https://v1.basketball.api-sports.io/leagues", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v1.basketball.api-sports.io",
		"x-rapidapi-key": "482ffa2596fa599bf70a212fc2144b3e"
	}
})
.then(response => {
    // convert response.body ReadableStream to a string
    const body = response.text();
    return body;
	// console.log(response); //JSON.stringify(response, null, 2));
}).then(body => {
    // console.log(JSON.stringify(JSON.parse(body), null, 2));
    // dump this to a file
    const json = JSON.parse(body);
    //console.log(json);
    const usaLeagues = json.response.filter(league => league.country.name === 'USA');
    fs.writeFileSync('leagues.json', JSON.stringify(usaLeagues, null, 2));
})
.catch(err => {
	console.log(err);
});
*/

/*
fetch("https://v1.basketball.api-sports.io/leagues", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v1.basketball.api-sports.io",
		"x-rapidapi-key": "482ffa2596fa599bf70a212fc2144b3e"
	}
})
.then(response => {
  const body = response.text();
  return body;
})
.then(body => {
  const json = JSON.parse(body);
  const usaLeagues = json.response.filter(league => league.country.name === 'USA');
  fs.writeFileSync('leagues.json', JSON.stringify(usaLeagues, null, 2));
})
.catch(err => {
	console.log(err);
});
*/

const teamNames = await apiClient.getTeamNamesInNCAA();

const allStats = [];
const errorTeams = [];

// get team stats for each team
for (const teamName of teamNames) {
  try {
    const stats = await apiClient.getTeamStatsByName(teamName, "2024-2025");
    allStats.push(stats);
  } catch (err) {
    errorTeams.push(teamName);
  }
}

fs.writeFileSync('teamStats.json', JSON.stringify(allStats, null, 2));
fs.writeFileSync('errorTeams.json', JSON.stringify(errorTeams, null, 2));
console.log(`Error fetching data for the following teams: ${errorTeams.join(', ')}`);