import { Router } from 'express';

import LeaderboardController from '../controller/LeaderboardController';

const leaderboardController = new LeaderboardController();

const routerLeaderboard = Router();

routerLeaderboard.get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));
routerLeaderboard.get('/away', (req, res) => leaderboardController.getAwayLeaderboard(req, res));
// routerLeaderboard.get('/', (req, res) => leaderboardController.getLeaderboard(req, res));

export default routerLeaderboard;
