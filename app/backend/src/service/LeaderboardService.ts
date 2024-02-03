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

  public async getLeaderboard():
  Promise<ServiceResponse<ILeaderboardHome[]>> {
    const finishedMatches = await this.matchesModel
      .getAllMatchesInProgressOrNot('false') as IMatchesWithName[];
    const teamsData = await this.teamsModel.findAll();

    const leaderBoardAllData = LeaderboardUtils
      .calcTeamBoard(finishedMatches, teamsData, undefined);
    return { status: 'SUCCESSFUL', data: leaderBoardAllData };
  }
}
