import { Router } from 'express';
import routerTeam from './team.route';
import routerLogin from './login.route';

const router = Router();

router.use('/teams', routerTeam);
router.use('/login', routerLogin);

export default router;
