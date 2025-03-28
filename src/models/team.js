//import teamStats from '../teamStats.json';
const NCAA_LEAGUE_ID = 116;
const API_KEY = import.meta.env.VITE_API_KEY;

export class Team {

  constructor(name) {
    this.name = name;
  }

  /**
   * Makes a GET request to the specified path with query parameters.
   * @param path The API endpoint path (e.g., "leagues").
   * @param queryParams An object containing query parameters.
   * @returns A Promise resolving to the API response.
   */
  async get(path, queryParams) {
      let url = `/api/${path}`;

      // Append query parameters to the URL
      if (queryParams) {
        const queryString = new URLSearchParams(queryParams).toString();
        url += `?${queryString}`;
      }

      try {
          const response = await fetch(url, {
              method: "GET",
              headers: {
                  "x-rapidapi-host": "v1.basketball.api-sports.io",
                  "x-rapidapi-key": API_KEY,
              },
          });

          if (!response.ok) {
              throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }

          return await response.json();
      } catch (error) {
          console.error("Failed to fetch data:", error);
          throw error;
      }
  }

    /**
   * Fetches teams by name from the "/teams" endpoint.
   * @param name The name of the team to search for.
   * @returns A Promise resolving to the API response.
   */
    async getTeamsByName(name) {
      // alpha-neumeric characters only
      name = name.replace(/[^a-zA-Z0-9 ]/g, "");
      return this.get("teams", { name });
  }

  async getTeamIdByName(name) {
    const team = await this.getTeamsByName(name);
    try {
      const id = team.response[0].id;
      return id;
    } catch (err) {
      console.error(`Team ${name} failed with bad id retrieval`);
      console.error(team);
    }
  }

  async getTeamStatsById(id, season) {
    return this.get("statistics", { team: id, season: season, league: NCAA_LEAGUE_ID });
  }

  async getTeamStatsByName(name, season) {
    const id = await this.getTeamIdByName(name);
    const team = this.getTeamStatsById(id, season);
    return team;
  }

  async getTeamNamesInNCAA() {
    const result = await this.get("teams", { league: NCAA_LEAGUE_ID, season: '2024-2025' });
    const response = result.response;
    const teamNames = response.map(team => team.name);
    return teamNames;
  }

  async getStats() {
    const result = await this.getTeamStatsByName(this.name, "2024-2025");
    try {
      // const item = teamStats.find(stats => stats.response.team.name === this.name);
      const res = result.response;
      const team = res.team;
      this.id = team.id;
      this.logo = team.logo;
      this.id = team.id;
      this.games = res.games;
    } catch (err) {
      console.log(`Team ${this.name} could not be processed`);
    }
  }

  printTeam() {
    console.log(this.name);
    console.log(this.id);
    console.log(this.logo);
    console.log(this.games);
  }

}
