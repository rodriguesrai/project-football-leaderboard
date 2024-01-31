import { Request, Response } from 'express';
import TeamService from '../service/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  private teamService = new TeamService();

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.findall();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
