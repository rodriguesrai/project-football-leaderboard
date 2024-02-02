import { Router } from 'express';
import routerTeam from './team.route';
import routerLogin from './login.route';
import routerMatches from './matches.route';

const router = Router();

router.use('/teams', routerTeam);
router.use('/login', routerLogin);
router.use('/matches', routerMatches);

export default router;
