import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../service/MatchesService';

export default class MatchesController {
  private matchesService = new MatchesService();

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const serviceResponse = await
      this.matchesService.getAllMatchesInProgressOrNot(inProgress as string);

      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    const serviceResponse = await this.matchesService.getAllMatches();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
