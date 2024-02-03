import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';

import { 
  leaderboardAllMockData,
  teamsMockData,
  matchesMockData,
  leaderboardHomeData
} from './mocks/leaderboard.mock';
import verifyGenerateToken from '../utils/verifyGenerateToken';
import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';

chai.use(chaiHttp);
const { expect } = chai;

const app = new App().app;

describe('Rota /login', () => {
  beforeEach(sinon.restore);

  describe('Método GET', () => { 
    it('testa se retorno de /leaderboard contem os dados corretos', async () => { 

      sinon.stub(TeamsModel.prototype, 'findAll' ).resolves(teamsMockData)
      sinon.stub(MatchesModel.prototype, 'getAllMatchesInProgressOrNot' ).resolves(matchesMockData)

      const response = await chai.request(app).get('/leaderboard')

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(leaderboardAllMockData);
    });
    it('testa se retorno de /leaderboard/home contem os dados corretos', async () => { 
      sinon.stub(TeamsModel.prototype, 'findAll' ).resolves(teamsMockData)
      sinon.stub(MatchesModel.prototype, 'getAllMatchesInProgressOrNot' ).resolves(matchesMockData)

      const response = await chai.request(app).get('/leaderboard/home')

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(leaderboardHomeData);
     })
  });
});
