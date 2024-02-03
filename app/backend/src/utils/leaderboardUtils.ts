/* eslint-disable max-len */
import { IMatchesWithName } from '../Interfaces/Matches/IMatchesWithName';
import { ILeaderboardHome } from '../Interfaces/Leaderboard/ILeaderboardHome';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ITeam } from '../Interfaces/Teams/ITeam';

export type Location = 'away' | 'home';

export default class LeaderboardUtils {
  private static calcTotalMatches(teamId: number, matches: IMatches[], location: Location) {
    const totalMatches = matches.filter((match) => {
      switch (location) {
        case 'home':
          return match.homeTeamId === teamId;
        case 'away':
          return match.awayTeamId === teamId;
        default:
          return match.homeTeamId === teamId || match.awayTeamId === teamId;
      }
    });

    return totalMatches;
  }

  private static calcGamesResults(teamId: number, matches: IMatches[], awayOrHome: Location) {
    const filteredMatches = LeaderboardUtils.calcTotalMatches(teamId, matches, awayOrHome);

    const results = filteredMatches.reduce((acc, match) => {
      const isHome = awayOrHome === 'home';

      acc.totalVictories += (isHome && match.homeTeamGoals > match.awayTeamGoals)
            || (!isHome && match.awayTeamGoals > match.homeTeamGoals) ? 1 : 0;
      acc.totalDraws += (match.homeTeamGoals === match.awayTeamGoals) ? 1 : 0;
      acc.totalLosses += (isHome && match.homeTeamGoals < match.awayTeamGoals)
            || (!isHome && match.awayTeamGoals < match.homeTeamGoals) ? 1 : 0;
      return acc;
    }, { totalVictories: 0, totalDraws: 0, totalLosses: 0 });

    return {
      ...results,
    };
  }

  private static calcTotalDraws(teamId: number, matches: IMatches[], location: Location) {
    const filteredMatches = LeaderboardUtils.calcTotalMatches(teamId, matches, location);

    return filteredMatches.reduce(
      (totalDraws, match) =>
        ((match.homeTeamGoals === match.awayTeamGoals) ? totalDraws + 1 : totalDraws),
      0,
    );
  }

  private static calcTotalVictories(teamId: number, matches: IMatches[], location: Location) {
    const filteredMatches = LeaderboardUtils.calcTotalMatches(teamId, matches, location);

    return filteredMatches.reduce(
      (totalVictories, match) =>
        (((match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
         || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals))
          ? totalVictories + 1
          : totalVictories),
      0,
    );
  }

  private static calcTotalLosses(teamId: number, matches: IMatches[], location: Location) {
    const filteredMatches = LeaderboardUtils.calcTotalMatches(teamId, matches, location);

    return filteredMatches.reduce(
      (totalLosses, match) =>
        (((match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals)
         || (match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals))
          ? totalLosses + 1
          : totalLosses),
      0,
    );
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
      switch (location) {
        case 'home':
          if (match.homeTeamId === teamId) {
            return sum + match.homeTeamGoals;
          }
          break;
        case 'away':
          if (match.awayTeamId === teamId) {
            return sum + match.awayTeamGoals;
          }
          break;
        default:
          return sum + match.homeTeamGoals + match.awayTeamGoals;
      }
      return sum;
    }, 0);
  }

  private static calcGoalsOwn(teamId: number, matches: IMatches[], location: Location): number {
    return matches.reduce((sum, match) => {
      switch (location) {
        case 'home':
          if (match.homeTeamId === teamId) {
            return sum + match.awayTeamGoals;
          }
          break;
        case 'away':
          if (match.awayTeamId === teamId) {
            return sum + match.homeTeamGoals;
          }
          break;
        default:
          return sum + match.awayTeamGoals + match.homeTeamGoals;
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

  public static calculateTeamSummary(teamName: string, id: number, matches: IMatchesWithName[], location: Location): ILeaderboardHome {
    const { totalVictories, totalDraws, totalLosses } = LeaderboardUtils.calcGamesResults(id, matches, location);
    const { totalPoints } = LeaderboardUtils.calcTotalPoints(totalVictories, totalDraws);

    const goalsFavor = LeaderboardUtils.calcGoalsFavor(id, matches, location);
    const goalsOwn = LeaderboardUtils.calcGoalsOwn(id, matches, location);
    const totalGames = LeaderboardUtils.calcTotalMatches(id, matches, location);

    return {
      name: teamName,
      totalPoints,
      totalGames: totalGames.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: LeaderboardUtils.calcGoalsBalance(goalsFavor, goalsOwn),
      efficiency: LeaderboardUtils.calcEfficiency(totalPoints, totalGames.length),
    };
  }

  public static sortedLeaderBoard = (team: ILeaderboardHome[]): ILeaderboardHome[] => {
    team.sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
    return team;
  };

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
