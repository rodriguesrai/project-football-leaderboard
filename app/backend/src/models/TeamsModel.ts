import { ITeam } from '../Interfaces/Teams/ITeam';
import ITeamModel from '../Interfaces/Teams/ITeamModel';
import TeamsModelSequelize from '../database/models/TeamsModelSequelize';

export default class TeamsModel implements ITeamModel {
  private model = TeamsModelSequelize;

  async findAll(): Promise<ITeam[]> {
    const dbResponse = await this.model.findAll();
    return dbResponse;
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbResponse = await this.model.findByPk(id);
    return dbResponse;
  }

  public async checkTeamExists(id: number): Promise<boolean> {
    const dbResponse = await this.model.findByPk(id);
    return !!dbResponse;
  }
}
