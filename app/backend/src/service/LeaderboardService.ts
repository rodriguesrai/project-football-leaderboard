import LeaderboardUtils, { Location } from '../utils/leaderboardUtils';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';
import { ILeaderboardHome } from '../Interfaces/Leaderboard/ILeaderboardHome';
import { IMatchesWithName } from '../Interfaces/Matches/IMatchesWithName';

export default class LeaderboardService {
  private teamsModel = new TeamsModel();
  private matchesModel = new MatchesModel();

  public async getLeaderboard(location: Location): Promise<ServiceResponse<ILeaderboardHome[]>> {
    const finishedMatches = await this.matchesModel
      .getAllMatchesInProgressOrNot('false') as IMatchesWithName[];
    const teamsData = await this.teamsModel.findAll();

    const leaderBoardHomeData = LeaderboardUtils
      .calcTeamBoard(finishedMatches, teamsData, location);
    return { status: 'SUCCESSFUL', data: leaderBoardHomeData };
  }
}
