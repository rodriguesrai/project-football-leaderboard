import LeaderboardUtils from '../utils/leaderboardUtils';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';
import { ILeaderboardHome } from '../Interfaces/Leaderboard/ILeaderboardHome';
import { IMatchesWithName } from '../Interfaces/Matches/IMatchesWithName';

export default class LeaderboardService {
  private teamsModel = new TeamsModel();
  private matchesModel = new MatchesModel();

  public async getLeaderboardHome():
  Promise<ServiceResponse<ILeaderboardHome[]>> {
    const finishedMatches = await this.matchesModel
      .getAllMatchesInProgressOrNot('false') as IMatchesWithName[];
    const teamsData = await this.teamsModel.findAll();

    const leaderBoardHomeData = LeaderboardUtils
      .calcTeamBoard(finishedMatches, teamsData, 'home');
    return { status: 'SUCCESSFUL', data: leaderBoardHomeData };
  }

  public async getLeaderboardAway():
  Promise<ServiceResponse<ILeaderboardHome[]>> {
    const finishedMatches = await this.matchesModel
      .getAllMatchesInProgressOrNot('false') as IMatchesWithName[];
    const teamsData = await this.teamsModel.findAll();

    const leaderBoardAwayData = LeaderboardUtils
      .calcTeamBoard(finishedMatches, teamsData, 'away');
    return { status: 'SUCCESSFUL', data: leaderBoardAwayData };
  }

  // public async getLeaderboard() {
  //   const homeLeaderboard = await this.getLeaderboardHome();
  //   const awayLeaderboard = await this.getLeaderboardAway();

  //   const combinedLeaderboard = LeaderboardUtils
  //     .combineLeaderboards(homeLeaderboard, awayLeaderboard);

  //   return { status: 'SUCCESSFUL', data: combinedLeaderboard };
  // }
}
