import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/Matches/IMatches';
import MatchesModel from '../models/MatchesModel';
import { UpdateMatchParams } from '../types/UpdateMatchParams';

export default class MatchesService {
  private model = new MatchesModel();

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
    const serviceResponse = await this.model.createMatch({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return { status: 'CREATED', data: serviceResponse };
  }
}
