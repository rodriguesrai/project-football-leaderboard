import TeamsModelSequelize from '../database/models/TeamsModelSequelize';
import { IMatches } from '../Interfaces/Matches/IMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import MatchesModelSequelize from '../database/models/MatchesModelSequelize';

export default class MatchesModel implements IMatchesModel {
  private model = MatchesModelSequelize;

  public async findAll(): Promise<IMatches[]> {
    const dbResponse = await this.model.findAll({
      include: [
        { model: TeamsModelSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModelSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbResponse;
  }

  public async getAllMatchesInProgressOrNot(inProgress: string): Promise<IMatches[]> {
    const dbResponse = await this.model.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        { model: TeamsModelSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModelSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbResponse;
  }

  public async finishMatch(id: number): Promise<number> {
    const [dbResponse] = await this.model.update({ inProgress: false }, { where: { id } });

    return dbResponse;
  }
}
