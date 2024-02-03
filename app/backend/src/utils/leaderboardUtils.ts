import { IMatchesWithName } from '../Interfaces/Matches/IMatchesWithName';
import { ILeaderboardHome } from '../Interfaces/Leaderboard/ILeaderboardHome';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ITeam } from '../Interfaces/Teams/ITeam';

export type Location = 'away' | 'home' | undefined;

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

  private static calcTotalPoints(teamId: number, matches: IMatches[], location: Location):
  number {
    const totalVictories = LeaderboardUtils.calcTotalVictories(teamId, matches, location);
    const totalDraws = LeaderboardUtils.calcTotalDraws(teamId, matches, location);
    const totalPoints = (totalVictories * 3) + totalDraws;
    return totalPoints;
  }

  private static calcGoalsFavor(teamId: number, matches: IMatches[], location: Location): number {
    return matches.reduce((s, match) => {
      switch (location) {
        case 'home':
          if (match.homeTeamId === teamId) {
            return s + match.homeTeamGoals;
          }
          break;
        case 'away':
          if (match.awayTeamId === teamId) {
            return s + match.awayTeamGoals;
          }
          break;
        default:
          return match.homeTeamId === teamId ? s + match.homeTeamGoals : s + match.awayTeamGoals;
      }
      return s;
    }, 0);
  }

  private static calcGoalsOwn(teamId: number, matches: IMatches[], location: Location): number {
    return matches.reduce((s, match) => {
      switch (location) {
        case 'home':
          if (match.homeTeamId === teamId) {
            return s + match.awayTeamGoals;
          }
          break;
        case 'away':
          if (match.awayTeamId === teamId) {
            return s + match.homeTeamGoals;
          }
          break;
        default:
          return match.homeTeamId === teamId ? s + match.awayTeamGoals : s + match.homeTeamGoals;
      }
      return s;
    }, 0);
  }

  private static calcGoalsBalance(goalsFavor: number, goalsOwn: number): number {
    return goalsFavor - goalsOwn;
  }

  private static calcEfficiency(teamId: number, matches: IMatches[], location: Location): string {
    const totalGames = LeaderboardUtils.calcTotalMatches(teamId, matches, location);
    const totalPoints = LeaderboardUtils.calcTotalPoints(teamId, matches, location);

    const efficiency = ((totalPoints / (totalGames.length * 3)) * 100).toFixed(2);
    return efficiency;
  }

  public static calcTeamSummary(tN: string, tId: number, m: IMatchesWithName[], location: Location):
  ILeaderboardHome {
    const totalPoints = LeaderboardUtils.calcTotalPoints(tId, m, location);
    const goalsFavor = LeaderboardUtils.calcGoalsFavor(tId, m, location);
    const goalsOwn = LeaderboardUtils.calcGoalsOwn(tId, m, location);
    // console.log('goalsFavor', goalsFavor);
    // console.log('goalsOwn', goalsOwn);
    const totalGames = LeaderboardUtils.calcTotalMatches(tId, m, location);

    return {
      name: tN,
      totalPoints,
      totalGames: totalGames.length,
      totalVictories: LeaderboardUtils.calcTotalVictories(tId, m, location),
      totalDraws: LeaderboardUtils.calcTotalDraws(tId, m, location),
      totalLosses: LeaderboardUtils.calcTotalLosses(tId, m, location),
      goalsFavor,
      goalsOwn,
      goalsBalance: LeaderboardUtils.calcGoalsBalance(goalsFavor, goalsOwn),
      efficiency: LeaderboardUtils.calcEfficiency(tId, m, location),
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

      return LeaderboardUtils.calcTeamSummary(teamName, id, teamMatches, location);
    });
    const orderedLeaderboard = LeaderboardUtils.sortedLeaderBoard(searchTeamMatch);
    return orderedLeaderboard;
  }
}
