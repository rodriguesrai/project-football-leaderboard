/* eslint-disable max-len */
import { IMatchesWithName } from '../Interfaces/Matches/IMatchesWithName';
import { ILeaderboardHome } from '../Interfaces/Leaderboard/ILeaderboardHome';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ITeam } from '../Interfaces/Teams/ITeam';

export type Location = 'away' | 'home';

export default class LeaderboardUtils {
  private static calcGames(teamId: number, matches: IMatches[], awayOrHome: Location) {
    const filteredMatches = matches.filter(
      (match) => (awayOrHome === 'home'
        ? match.homeTeamId === teamId : match.awayTeamId === teamId),
    );

    const results = filteredMatches.reduce((acc, match) => {
      const isHome = match.homeTeamId === teamId;

      acc.totalVictories += (isHome && match.homeTeamGoals > match.awayTeamGoals)
      || (!isHome && match.awayTeamGoals > match.homeTeamGoals) ? 1 : 0;
      acc.totalDraws += (match.homeTeamGoals === match.awayTeamGoals) ? 1 : 0;
      acc.totalLosses += (isHome && match.homeTeamGoals < match.awayTeamGoals)
      || (!isHome && match.awayTeamGoals < match.homeTeamGoals) ? 1 : 0;
      return acc;
    }, { totalVictories: 0, totalDraws: 0, totalLosses: 0 });

    const totalGames = results.totalVictories + results.totalDraws + results.totalLosses;

    return {
      totalGames,
      ...results,
    };
  }

  private static calcTotalPoints(totalVictories: number, totalDraws: number):
  { totalPoints: number } {
    const totalPoints = totalVictories * 3 + totalDraws * 1;

    return {
      totalPoints,
    };
  }

  private static calcGoalsFavor(teamId: number, matches: IMatches[], location: Location): number {
    return matches.reduce((sum, match) => {
      if (location === 'home' && match.homeTeamId === teamId) {
        return sum + match.homeTeamGoals;
      }
      if (location === 'away' && match.awayTeamId === teamId) {
        return sum + match.awayTeamGoals;
      }
      return sum;
    }, 0);
  }

  private static calcGoalsOwn(teamId: number, matches: IMatches[], location: Location): number {
    return matches.reduce((sum, match) => {
      if (location === 'home' && match.homeTeamId === teamId) {
        return sum + match.awayTeamGoals;
      }
      if (location === 'away' && match.awayTeamId === teamId) {
        return sum + match.homeTeamGoals;
      }
      return sum;
    }, 0);
  }

  private static calcGoalsBalance(goalsFavor: number, goalsOwn: number): number {
    return goalsFavor - goalsOwn;
  }

  private static calcEfficiency(totalPoints: number, totalGames: number): string {
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return efficiency;
  }

  // eslint-disable-next-line max-lines-per-function
  public static calculateTeamSummary(teamName: string, id: number, matches: IMatchesWithName[], location: Location): ILeaderboardHome {
    const games = LeaderboardUtils.calcGames(id, matches, location);

    const { totalGames, totalVictories, totalDraws, totalLosses } = games;
    const { totalPoints } = LeaderboardUtils.calcTotalPoints(totalVictories, totalDraws);
    const goalsFavor = LeaderboardUtils.calcGoalsFavor(id, matches, location);
    const goalsOwn = LeaderboardUtils.calcGoalsOwn(id, matches, location);
    const goalsBalance = LeaderboardUtils.calcGoalsBalance(goalsFavor, goalsOwn);
    const efficiency = LeaderboardUtils.calcEfficiency(totalPoints, totalGames);

    return {
      name: teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  }

  public static sortedLeaderBoard(leaderboardData: ILeaderboardHome[]): ILeaderboardHome[] {
    const orderedLeaderboard = leaderboardData.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return a.name.localeCompare(b.name);
    });

    return orderedLeaderboard;
  }

  public static calcTeamBoard(
    matches: IMatchesWithName[],
    teams: ITeam[],
    location: Location,
  ): ILeaderboardHome[] {
    const searchTeamMatch = teams.map((team) => {
      const { teamName, id } = team;
      const teamMatches = matches.filter((match) => match.homeTeamId === id
      || match.awayTeamId === id);

      return LeaderboardUtils.calculateTeamSummary(teamName, id, teamMatches, location);
    });
    const orderedLeaderboard = LeaderboardUtils.sortedLeaderBoard(searchTeamMatch);
    return orderedLeaderboard;
  }
}
