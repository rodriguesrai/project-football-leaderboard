import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/Matches/IMatches';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  private model = new MatchesModel();

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const modelResponse = await this.model.findAll();
    return { status: 'SUCCESSFUL', data: modelResponse };
  }
}
