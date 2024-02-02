import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/Matches/IMatches';
import MatchesModel from '../models/MatchesModel';

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
}
