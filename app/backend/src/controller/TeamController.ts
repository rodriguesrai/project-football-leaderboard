import { Request, Response } from 'express';
import TeamService from '../service/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  private teamService = new TeamService();

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.findall();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.findById(Number(id));
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
