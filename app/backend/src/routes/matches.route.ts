import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();

const routerMatches = Router();

routerMatches.get('/', (req, res) => matchesController.getAllMatches(req, res));

export default routerMatches;
