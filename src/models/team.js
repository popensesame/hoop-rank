import teamStats from '../teamStats.json';

export class Team {

  constructor(name) {
    this.getTeam(name);
  }

  async getTeam(name) {
    this.name = name;
    try {
      const item = teamStats.find(stats => stats.response.team.name === this.name);
      const res = item.response;
      const team = res.team;
      this.id = team.id;
      this.logo = team.logo;
      this.id = team.id;
      this.games = res.games;
    } catch (err) {
      console.log(`Team ${name} not found in teamStats.json`);
    }
  }

  printTeam() {
    console.log(this.name);
    console.log(this.id);
    console.log(this.logo);
    console.log(this.games);
  }

}
