import { Router } from 'express';
import routerTeam from './team.route';

const router = Router();

router.use('/teams', routerTeam);

export default router;
