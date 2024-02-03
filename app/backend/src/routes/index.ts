import { Router } from 'express';
import routerTeam from './team.route';
import routerLogin from './login.route';
import routerMatches from './matches.route';
import routerLeaderboard from './leaderboard.route';

const router = Router();

router.use('/teams', routerTeam);
router.use('/login', routerLogin);
router.use('/matches', routerMatches);
router.use('/leaderboard', routerLeaderboard);

export default router;
