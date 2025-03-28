const NCAA_LEAGUE_ID = 116;
const API_KEY = import.meta.env.VITE_API_KEY; // Get API key from environment
const BASE_URL = "/api"; // Ensure this matches the proxy path

export default class ApiClient {
  constructor() {
      this.baseUrl = BASE_URL;
      this.apiKey = API_KEY;
  }

  /**
   * Makes a GET request to the specified path with query parameters.
   * @param path The API endpoint path (e.g., "leagues").
   * @param queryParams An object containing query parameters.
   * @returns A Promise resolving to the API response.
   */
  async get(path, queryParams) {
      let url = `${this.baseUrl}/${path}`;

      // Append query parameters to the URL
      if (queryParams) {
        const queryString = new URLSearchParams(queryParams).toString();
        url += `?${queryString}`;
      }

      console.log('Request URL:', url); // Debugging log

      try {
          const response = await fetch(url, {
              method: "GET",
              headers: {
                  "x-rapidapi-host": "v1.basketball.api-sports.io",
                  "x-rapidapi-key": this.apiKey,
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
      return this.get("teams", { name });
  }

  async getTeamIdByName(name) {
    const team = await this.getTeamsByName(name);
    const id = team.response[0].id;
    return id;
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
    return this.get("teams", { league: NCAA_LEAGUE_ID });
  }
}

const apiClient = new ApiClient();

// Example: Fetch teams with a specific name
apiClient.get("teams", { name: "Lakers" })
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Example: Fetch teams with multiple query arguments
apiClient.get("teams", { name: "Lakers", country: "USA" })
  .then(data => console.log(data))
  .catch(error => console.error(error));
