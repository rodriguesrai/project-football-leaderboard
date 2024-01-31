import { ITeam } from '../Interfaces/Teams/ITeam';
import TeamsModel from '../models/TeamsModel';
import ITeamModel from '../Interfaces/Teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamsModel(),
  ) { }

  public async findall(): Promise<ServiceResponse<ITeam[]>> {
    const modelResponse = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: modelResponse };
  }

  public async findById(id: ITeam['id']): Promise<ServiceResponse<ITeam | null>> {
    const modelResponse = await this.teamModel.findById(id);
    return { status: 'SUCCESSFUL', data: modelResponse };
  }
}
