import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/Matches/IMatches';
import MatchesModel from '../models/MatchesModel';
import { UpdateMatchParams } from '../types/UpdateMatchParams';
import TeamsModel from '../models/TeamsModel';

export default class MatchesService {
  private model = new MatchesModel();
  private teamModel = new TeamsModel();

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const modelResponse = await this.model.findAll();
    return { status: 'SUCCESSFUL', data: modelResponse };
  }

  public async getAllMatchesInProgressOrNot(inProgress: string):
  Promise<ServiceResponse<IMatches[]>> {
    const modelResponse = await this.model.getAllMatchesInProgressOrNot(inProgress);

    return { status: 'SUCCESSFUL', data: modelResponse };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.model.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch({ id, awayTeamGoals, homeTeamGoals }: UpdateMatchParams):
  Promise<ServiceResponse<ServiceMessage>> {
    await this.model.updateMatch({ id, awayTeamGoals, homeTeamGoals });
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch({
    homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals,
  }: IMatches): Promise<ServiceResponse<IMatches>> {
    const homeTeamExists = await this.teamModel.checkTeamExists(homeTeamId);
    const awayTeamExists = await this.teamModel.checkTeamExists(awayTeamId);

    if (!homeTeamExists || !awayTeamExists) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' },
      };
    }

    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE_CONTENT',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const serviceResponse = await this.model.createMatch({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return { status: 'CREATED', data: serviceResponse };
  }
}
