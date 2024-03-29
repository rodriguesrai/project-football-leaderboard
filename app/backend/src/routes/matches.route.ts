import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import { authMiddleware } from '../middlewares/authMiddleware';

const matchesController = new MatchesController();

const routerMatches = Router();

routerMatches.get('/', (req, res) => matchesController.getAllMatches(req, res));

routerMatches.patch(
  '/:id/finish',
  authMiddleware,
  (req, res) => matchesController.finishMatch(req, res),
);

routerMatches.patch(
  '/:id',
  authMiddleware,
  (req, res) => matchesController.updateMatch(req, res),
);

routerMatches.post(
  '/',
  authMiddleware,
  (req, res) => matchesController.createMatch(req, res),
);

export default routerMatches;
