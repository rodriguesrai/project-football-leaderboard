import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  private leaderboardService = new LeaderboardService();

  public async getHomeLeaderboard(req:Request, res:Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardHome();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getAwayLeaderboard(req:Request, res:Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardAway();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getLeaderboard(req:Request, res:Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboard();
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
