import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import MatchesModel from '../models/MatchesModel';
import { 
matchesData,
} from './mocks/matches.mock';


chai.use(chaiHttp);
const { expect } = chai;

const app = new App().app;

describe('Rota /matches', () => {
  beforeEach(sinon.restore);
  describe('testa retorno da rota com todas as partidas', () => { 
    it('testa retorno da rota com todas as partidas', async () => { 
      sinon.stub(MatchesModel.prototype, 'findAll').resolves(matchesData);
      
      const response = await chai.request(app).get('/matches');
      
      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.deep.eq(matchesData);
  })})
});
