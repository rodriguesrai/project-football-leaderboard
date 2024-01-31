import { Router } from 'express';
import TeamController from '../controller/TeamController';

const teamController = new TeamController();

const routerTeam = Router();

routerTeam.get('/', (req, res) => teamController.getAllTeams(req, res));

export default routerTeam;
